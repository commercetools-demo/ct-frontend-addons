// @ts-ignore
import dynamic from 'next/dynamic';
// @ts-ignore
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { ApprovalRule, ApproverConjunction } from '../../../types/approval/Rule';
import Approvers from './approvers';
import useCartPredicateBuilder from './hooks/useCartPredicateBuilder';
import PredicateBuilder from './predicate-builder';
import { useApprovals } from '../../hooks/useApprovals';
// necessary for react-organizational-chart in ssr
const ApproversPreview = dynamic(() => import('./approvers-preview'), { ssr: false });

export type RuleComponents = {
  Select: any;
  Button: any;
  InfoBanner: any;
  PreviousPageLink: any;
  Input: any;
  Tag: any;
  RefinementDropdown: any;
  Label: any;
  Checkbox: any;
};

const ApprovalRuleDetails = ({
  components,
  sdk,
  rule,
  translate,
  roleOptions,
  activeBusinessUnit,
  permissions,
  storeKey,
  isEditing,
}: {
  isEditing?: boolean;
  sdk: any;
  activeBusinessUnit?: any;
  storeKey?: string;
  translate: (translationKey: string) => string;
  rule: ApprovalRule;
  roleOptions?: { value: string; name: string }[];
  components: RuleComponents;
  permissions?: Record<string, boolean>;
}) => {
  const { back, refresh } = useRouter();
  const [error, setError] = useState('');
  const [isApproversPreviewShown, setIsApproversPreviewShown] = useState(false);
  const [isPredicatePreviewShown, setIsPredicatePreviewShown] = useState(false);
  const [loading, setLoading] = useState({ duplicate: false, stateChange: false, save: false });
  const [predicateJsonFormat, setPredicateJsonFormat] = useState();
  const { fields, isReady } = useCartPredicateBuilder(sdk, translate);
  const initialData = useMemo(() => {
    return rule
      ? {
          name: rule.name,
          description: rule.description,
          predicate: rule.predicate,
          status: rule.status,
          approvers: rule.approvers,
          requesters: rule.requesters,
        }
      : {
          name: '',
          description: '',
          predicate: '',
          status: 'Inactive',
          approvers: {
            tiers: [],
          },
          requesters: [],
        };
  }, [rule]);
  const [data, setData] = useState(initialData);
  const viewOnly = useMemo(() => !permissions?.UpdateApprovalRules, [permissions]);

  const { activateRule, deactivateRule, createRule, updateRule } = useApprovals(
    sdk,
    activeBusinessUnit.key,
    storeKey,
  );

  const handleStateChange = async () => {
    setLoading({ ...loading, stateChange: true });
    if (rule.status === 'Active') {
      try {
        await deactivateRule(rule.id);
        setData({
          ...data,
          status: 'Inactive',
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await activateRule(rule.id);
        setData({
          ...data,
          status: 'Active',
        });
      } catch (error) {
        console.error(error);
      }
    }
    setLoading({ ...loading, stateChange: false });
    refresh();
    back();
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data],
  );

  const handleRoleChange = useCallback(
    (role: string) => {
      let updatedRequesters = [...(data.requesters ?? [])];

      if (updatedRequesters.some((r) => r.associateRole.key === role))
        updatedRequesters = updatedRequesters.filter((r) => r.associateRole.key !== role);
      else updatedRequesters = [...updatedRequesters, { associateRole: { key: role, typeId: 'associate-role' } }];

      setData({ ...data, requesters: updatedRequesters });
    },
    [data],
  );

  const updateActive = (checked: boolean) => {
    setData({
      ...data,
      status: checked ? 'Active' : 'Inactive',
    });
  };

  const updateApprovers = (tiers: ApproverConjunction[]) => {
    setData({
      ...data,
      approvers: {
        tiers,
      },
    });
  };

  const updatePredicate = (predicate: string) => {
    setData({
      ...data,
      predicate,
    });
  };

  const handleSave = async () => {
    setLoading({ ...loading, save: true });
    if (isEditing) {
      try {
        await updateRule(rule.id, data);
        refresh();
        setError('');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading({ ...loading, save: false });
      }
    } else {
      try {
        await createRule(data);
        back();
        setError('');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading({ ...loading, save: false });
      }
    }
  };

  const handlePredicateError = () => {
    setError('Predicate cannot be displayed in the query builder');
    setIsPredicatePreviewShown(true);
  };

  return (
    <div className="">
      {viewOnly && (
        <components.InfoBanner className="mt-3">
          <b>{translate('common.view.only')}</b> {translate('dashboard.rule.details.view.only.desc')}
        </components.InfoBanner>
      )}
      <div className="flex items-center justify-between">
        <h1 className="py-6 text-18 font-extrabold text-gray-800 md:py-7 md:text-20 lg:py-9 lg:text-24">
          {translate('dashboard.rule.details')}
        </h1>
        <div className="flex items-center justify-normal gap-x-3">
          <components.PreviousPageLink />

          {isEditing && (
            <>
              {/* <components.Button
                size="s"
                variant="secondary"
                disabled={viewOnly}
                onClick={() => {}}
                loading={loading.duplicate}
              >
                {translate('dashboard.rule.details.duplicate')}
              </components.Button> */}
              <components.Button
                size="s"
                variant="warning"
                disabled={viewOnly}
                onClick={handleStateChange}
                loading={loading.stateChange}
              >
                {rule.status === 'Active'
                  ? translate('dashboard.rule.details.deactivate')
                  : translate('dashboard.rule.details.activate')}
              </components.Button>
            </>
          )}

          <components.Button size="s" variant="primary" disabled={viewOnly} onClick={handleSave} loading={loading.save}>
            {translate('dashboard.rule.details.save')}
          </components.Button>
        </div>
      </div>
      {!!error && (
        <components.InfoBanner className="mt-3">
          <b>{error}</b>
        </components.InfoBanner>
      )}
      <form className="grid grid-cols-6 gap-x-2 gap-y-4 py-8">
        <div className="col-span-3">
          <components.Input
            name="name"
            label={translate('dashboard.rule.new.name')}
            disabled={viewOnly}
            required
            value={data.name ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-3">
          <components.Input
            name="description"
            label={translate('dashboard.rule.new.description')}
            disabled={viewOnly}
            required
            value={data.description ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-3">
          <components.Label required>{translate('dashboard.roles')}</components.Label>
          <components.RefinementDropdown
            disabled={viewOnly}
            options={roleOptions?.map((role) => ({
              ...role,
              selected: (data.requesters ?? []).some((requester) => requester?.associateRole?.key === role.value),
            }))}
            onChange={handleRoleChange}
          >
            {(data.requesters ?? []).map((requester) => requester?.associateRole?.key).join(', ')}
          </components.RefinementDropdown>
        </div>
        <div className="col-span-3 flex items-end">
          <components.Checkbox
            label={`${translate('dashboard.rule.details.status')} = ${translate(
              `dashboard.rules.status.${data.status.toLowerCase()}`,
            )}`}
            disabled={viewOnly}
            checked={data.status === 'Active'}
            onChecked={updateActive}
          />
        </div>

        <h2 className="col-span-6 py-6 text-16 font-extrabold text-gray-800 md:py-7 md:text-18 lg:py-9 lg:text-20">
          {translate('dashboard.rule.details.predicate')}
        </h2>
        {!isPredicatePreviewShown && isReady && !viewOnly && (
          <div className="col-span-6">
            <PredicateBuilder
              fields={fields}
              components={components}
              translate={translate}
              onError={handlePredicateError}
              predicate={data.predicate}
              predicateJsonFormat={predicateJsonFormat}
              onUpdate={updatePredicate}
              onUpdateJson={setPredicateJsonFormat}
              onPreview={() => setIsPredicatePreviewShown(true)}
            />
          </div>
        )}
        {(isPredicatePreviewShown || viewOnly) && (
          <>
            <div className="col-span-5">
              <components.Input
                type="text"
                name="predicate"
                disabled={viewOnly || !isEditing}
                label={translate('dashboard.rule.new.predicate')}
                value={data?.predicate}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex items-end">
              <components.Button
                variant="secondary"
                type="button"
                size="m"
                disabled={viewOnly}
                onClick={() => setIsPredicatePreviewShown(false)}
              >
                {translate('dashboard.rule.details.edit.predicate')}
              </components.Button>
            </div>
          </>
        )}

        <h2 className="col-span-6 py-6 text-16 font-extrabold text-gray-800 md:py-7 md:text-18 lg:py-9 lg:text-20">
          {translate('dashboard.rule.details.approvers')}
        </h2>
        <div className="col-span-6">
          {!isApproversPreviewShown && !isEditing && (
            <Approvers
              onUpdate={updateApprovers}
              onPreview={() => setIsApproversPreviewShown(true)}
              tiers={data.approvers.tiers}
              associateRoles={roleOptions}
              translate={translate}
              components={components}
            />
          )}
          {(isApproversPreviewShown || isEditing) && (
            <ApproversPreview
              isPreview={isEditing}
              tiers={data.approvers.tiers}
              onEdit={() => setIsApproversPreviewShown(false)}
              components={components}
              translate={translate}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ApprovalRuleDetails;
