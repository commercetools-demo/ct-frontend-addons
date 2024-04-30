'use client';
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApprovalFlow } from '../../../types/approval/Flow';
import { useApprovals } from '../../hooks/useApprovals';
import { Associate } from '../../../../shared/businessUnit';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
import { Cart } from '@commercetools/frontend-domain-types/cart';
import { Transaction } from '../../../../shared/types';
import { Currency } from '@commercetools/frontend-sdk/lib/types/Currency';
import { useParams } from 'next/navigation';
import FlowStatusTag from '../flow-status-tag';
// necessary for react-organizational-chart in ssr
const ApproversPreview = dynamic(() => import('./approvers-preview'), { ssr: false });

const formatLocalDate = (date: Date | string) => {
  const dateToFormat = date instanceof Date ? date : new Date(date);

  const [day, month, year] = [
    dateToFormat.getDate().toString().padStart(2, '0'),
    (dateToFormat.getMonth() + 1).toString().padStart(2, '0'),
    dateToFormat.getFullYear().toString(),
  ];

  return `${day}-${month}-${year}`;
};
const FlowDetailsModal = ({
  sdk,
  activeBusinessUnit,
  storeKey,
  flow,
  translate,
  calculateTransaction,
  components,
  accountId,
  permissions,
}: {
  sdk: any;
  activeBusinessUnit?: any;
  storeKey?: string;
  translate: (translationKey: string) => string;
  calculateTransaction: (cart: Partial<Cart>) => Transaction;
  flow: ApprovalFlow;
  components: {
    Button: any;
    InfoBanner: any;
    PreviousPageLink: any;
    Input: any;
    Tag: any;
  };
  accountId?: string;
  permissions?: Record<string, boolean>;
}) => {
  const { approveFlow, rejectFlow } = useApprovals(sdk, activeBusinessUnit.key, storeKey);
  const [isShowingReason, setIsShowingReason] = useState(false);
  const [reason, setReason] = useState('');
  const [approvedRoles, setApprovedRoles] = useState<string[]>([]);
  const [rejectedRoles, setRejectedRoles] = useState<string[]>([]);
  const [accountRoles, setAccountRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState({ approve: false, reject: false });

  const { locale } = useParams();

  const viewOnly = useMemo(() => !permissions?.UpdateApprovalFlows, [permissions]);

  const handleApproveFlow = async () => {
    setLoading({ ...loading, approve: true });
    await approveFlow(flow.id);
    setLoading({ ...loading, approve: false });
  };

  const handleRejectFlow = async () => {
    setLoading({ ...loading, reject: true });
    await rejectFlow(flow.id, reason);
    setReason('');
    setLoading({ ...loading, reject: false });
  };

  const hasAccountApprovedAlready = useMemo<boolean>(() => {
    return approvedRoles.some((approvedRole) => accountRoles.includes(approvedRole));
  }, [approvedRoles, accountRoles]);

  const transaction = useMemo(() => {
    const { total, shipping, subtotal, tax, discount } = calculateTransaction(flow.order);

    const currencyCode = (flow.order?.sum?.currencyCode ?? 'USD') as Currency;

    return {
      currency: currencyCode,
      subtotal: subtotal.centAmount * 100,
      ...(subtotal.centAmount > 0 ? { taxCosts: tax.centAmount * 100 } : {}),
      ...(shipping.centAmount > 0 ? { shippingCosts: shipping.centAmount * 100 } : {}),
      ...(discount.centAmount > 0 ? { discount: discount.centAmount * 100 } : {}),
      total: total.centAmount * 100,
    };
  }, [flow.order]);

  useEffect(() => {
    if (activeBusinessUnit && accountId) {
      const accountAssociate = (activeBusinessUnit.associates as Associate[]).find(
        (associate) => associate.accountId === accountId,
      );
      if (accountAssociate) {
        setAccountRoles(accountAssociate.roles?.map((role) => role.key || '') || []);
      }
    }
  }, [activeBusinessUnit, accountId]);

  useEffect(() => {
    if (flow) {
      setApprovedRoles(
        !flow.approvals?.length
          ? []
          : flow.approvals.reduce(
              (prev: string[], curr) =>
                prev.concat(curr.approver.associateRoleAssignments.map((associate) => associate.associateRole.key)),
              [],
            ),
      );
      setRejectedRoles(
        !flow.rejection
          ? []
          : flow.rejection.rejecter.associateRoleAssignments.map((associate) => associate.associateRole.key),
      );
    }
  }, [flow]);

  if (!flow) {
    return null;
  }
  return (
    <div className="">
      {viewOnly && (
        <components.InfoBanner className="mt-3">
          <b>{translate('common.view.only')}</b> {translate('dashboard.flow.details.view.only.desc')}
        </components.InfoBanner>
      )}
      <div className="flex items-center justify-between">
        <h1 className="py-6 text-18 font-extrabold text-gray-800 md:py-7 md:text-20 lg:py-9 lg:text-24">
          {translate('dashboard.flow.details')}
        </h1>
        <div className="flex items-center justify-normal gap-x-3">
          <components.PreviousPageLink />

          {!isShowingReason && (
            <>
              <components.Button
                size="s"
                variant="secondary"
                disabled={hasAccountApprovedAlready || flow.status !== 'Pending'}
                onClick={() => setIsShowingReason(true)}
                loading={loading.reject}
              >
                {translate('dashboard.flow.details.reject')}
              </components.Button>
              <components.Button
                size="s"
                variant="primary"
                disabled={hasAccountApprovedAlready || flow.status !== 'Pending'}
                onClick={handleApproveFlow}
                loading={loading.approve}
              >
                {translate('dashboard.flow.details.approve')}
              </components.Button>
            </>
          )}
          {isShowingReason && (
            <div className="flex w-full flex-col gap-2 md:w-[280px]">
              <components.Input
                name="reason"
                className="md:w-[180px]"
                label={translate('flow.reject.reason')}
                required
                value={reason}
                onChange={(e: any) => setReason(e.target.value)}
              />
              <components.Button
                size="s"
                variant="warning"
                disabled={hasAccountApprovedAlready || flow.status !== 'Pending'}
                onClick={handleRejectFlow}
                loading={loading.reject}
              >
                {translate('dashboard.flow.details.reject')}
              </components.Button>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-14 text-gray-600">
        {translate('dashboard.flow.details.id')}: {flow.id}
      </h3>

      {flow.createdAt && (
        <h3 className="mt-4 text-14 text-gray-600">
          {translate('dashboard.flow.details.date')}: {formatLocalDate(flow.createdAt)}
        </h3>
      )}

      <h3 className="mt-4 text-14 text-gray-600">
        {translate('dashboard.flow.details.business_unit')}: {flow.businessUnit.key}
      </h3>

      {/* Status */}

      <h2 className="pt-6 text-16 font-extrabold text-gray-800 md:pt-7 md:text-18 lg:pt-9 lg:text-20">
        {translate('dashboard.flow.details.status.title')}
      </h2>

      {hasAccountApprovedAlready && (
        <h3 className="flex items-center gap-2 text-14 text-gray-600">
          {translate('dashboard.flow.details.account.already.approved')}
        </h3>
      )}

      <h3 className="mt-4 flex items-center gap-2 text-14 text-gray-600">
        {translate('dashboard.flow.details.status')}:{' '}
        <FlowStatusTag status={flow.status} components={components} translate={translate} />
      </h3>

      {!!flow.rejection && (
        <>
          <h3 className="mt-4 text-14 text-gray-600">
            {translate('dashboard.flow.details.rejection.date')}: {formatLocalDate(flow.rejection.rejectedAt)}
          </h3>
          {!!flow.rejection.reason && (
            <h3 className="mt-4 text-14 text-gray-600">
              {translate('dashboard.flow.details.rejection.reason')}: {flow.rejection.reason}
            </h3>
          )}
        </>
      )}

      {!!flow.approvals?.length &&
        flow.approvals.map((approval, i) => (
          <h3 className="mt-4 text-14 text-gray-600" key={`approval-${i}`}>
            {translate('dashboard.flow.details.approval.date')}: {formatLocalDate(approval.approvedAt)}{' '}
            {translate('dashboard.flow.details.approval.by.role')}:{' '}
            {approval.approver.associateRoleAssignments.map((item) => item.associateRole.key).join(', ')}
          </h3>
        ))}

      {!!flow.rules.length &&
        flow.rules.map((rule, i) => (
          <>
            <h2
              key={`rule-${i}`}
              className="pt-6 text-16 font-extrabold text-gray-800 md:pt-7 md:text-18 lg:pt-9 lg:text-20"
            >
              {translate('dashboard.flow.details.rule.title')}: {rule.name}
            </h2>
            <h3 className="mt-4 text-14 text-gray-600" key={`rule-desc-${i}`}>
              {translate('dashboard.flow.details.rule.description')}: {rule.description}
            </h3>
            <h3 className="my-4 text-14 text-gray-600" key={`rule-predicate-${i}`}>
              {translate('dashboard.flow.details.rule.predicate')}: {rule.predicate}
            </h3>
            <ApproversPreview
              key={`rule-preview-${i}`}
              components={components}
              translate={translate}
              isPreview
              tiers={rule.approvers.tiers}
              previewApprovedRoles={approvedRoles}
              previewRejecteddRoles={rejectedRoles}
            />
          </>
        ))}

      {!!flow.order?.lineItems?.length && (
        <>
          <h2 className="pt-6 text-16 font-extrabold text-gray-800 md:pt-7 md:text-18 lg:pt-9 lg:text-20">
            {translate('dashboard.flow.details.order.details')}
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-400 p-4 text-12 font-semibold uppercase text-gray-500">
                <th className="p-4 text-left">{translate('common.product')}</th>
                <th className="hidden p-4 text-left md:table-cell">{translate('common.sku')}</th>
                <th className="hidden p-4 text-right md:table-cell">{translate('common.qty')}</th>
                <th className="hidden p-4 text-right lg:table-cell">{translate('common.price')}</th>
              </tr>
            </thead>
            <tbody>
              {flow.order.lineItems.map(({ lineItemId, variant, name, count, price }) => (
                <tr key={lineItemId} className="border-b border-neutral-400 p-4 text-14 text-gray-600">
                  <td className="p-4 text-left">
                    <div className="flex items-center gap-3">
                      <span className="relative block h-[40px] w-[40px]">
                        <img src={variant?.images?.[0]} alt={name ?? ''} />
                      </span>
                      <span>{name}</span>
                    </div>
                  </td>
                  <td className="hidden p-4 text-left md:table-cell">{variant?.sku}</td>
                  <td className="hidden p-4 text-right md:table-cell">{count}</td>
                  <td className="hidden p-4 text-right lg:table-cell">
                    {CurrencyHelpers.formatForCurrency(price ?? 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end border-neutral-400 pb-7 pt-6">
            <div className="flex w-full flex-col gap-2 md:px-4 lg:w-[420px] lg:pl-0">
              <div className="flex items-center justify-between text-14 text-gray-600">
                <span>{translate('common.subtotal')}</span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.subtotal, locale, transaction.currency)}</span>
              </div>

              {transaction.shippingCosts && transaction.shippingCosts > 0 && (
                <div className="flex items-center justify-between text-14 text-gray-600">
                  <span>{translate('common.shipping')}</span>
                  <span>
                    {CurrencyHelpers.formatForCurrency(transaction.shippingCosts, locale, transaction.currency)}
                  </span>
                </div>
              )}

              {transaction.taxCosts && transaction.taxCosts > 0 && (
                <div className="flex items-center justify-between text-14 text-gray-600">
                  <span>{translate('common.tax')}</span>
                  <span>{CurrencyHelpers.formatForCurrency(transaction.taxCosts, locale, transaction.currency)}</span>
                </div>
              )}

              {transaction.discount && transaction.discount > 0 && (
                <div className="flex items-center justify-between text-14 text-gray-600">
                  <span>{translate('common.discount')}</span>
                  <span>-{CurrencyHelpers.formatForCurrency(transaction.discount, locale, transaction.currency)}</span>
                </div>
              )}

              <div className="flex items-center justify-between font-medium text-gray-700">
                <span>{translate('common.total')}:</span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.total, locale, transaction.currency)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FlowDetailsModal;
