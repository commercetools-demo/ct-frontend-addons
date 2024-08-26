import { ApprovalFlow } from '../../types/approval/Flow';
import { ApprovalFlowMapper } from '../mappers/ApprovalFlowMapper';
import { ByProjectKeyAsAssociateByAssociateIdInBusinessUnitKeyByBusinessUnitKeyRequestBuilder } from '@commercetools/platform-sdk';
import { PaginatedResult } from '../../../utils/types';
import { Context } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { FlowQuery } from '../../types/approval/Query';
import { extractDependency } from '../utils';
import { getOffsetFromCursor } from '../../../shared/utils/Pagination';

type A = ByProjectKeyAsAssociateByAssociateIdInBusinessUnitKeyByBusinessUnitKeyRequestBuilder;
export const injectApprovalFlowApi = (BaseApi: any, config: Configuration): typeof BaseApi => {
  const CartMapper = extractDependency('CartMapper', config);
  return class ApprovalFlowApi extends BaseApi {
    constructor(
      context: Context,
      locale: string | null,
      currency: string | null,
      accountId?: string,
      businessUnitKey?: string,
    ) {
      super(context, locale, currency);
      this.accountId = accountId;
      this.businessUnitKey = businessUnitKey;
    }
    query: (flowQuery: FlowQuery) => Promise<PaginatedResult<ApprovalFlow>> = async (
      flowQuery: FlowQuery,
    ): Promise<PaginatedResult<ApprovalFlow>> => {
      const locale = await this.getCommercetoolsLocal();
      const limit = +flowQuery.limit! || undefined;
      const sortAttributes: string[] = [];

      if (flowQuery.sortAttributes) {
        Object.keys(flowQuery.sortAttributes).map((field, directionIndex) => {
          sortAttributes.push(`${field} ${Object.values(flowQuery.sortAttributes!)[directionIndex]}`);
        });
      } else {
        // default sort
        sortAttributes.push(`createdAt desc`);
      }

      const whereClause: string[] = [];

      if (flowQuery.flowIds !== undefined && flowQuery.flowIds.length !== 0) {
        whereClause.push(`id in ("${flowQuery.flowIds.join('","')}")`);
      }

      if (flowQuery.flowStates !== undefined && flowQuery.flowStates.length > 0) {
        whereClause.push(`status in ("${flowQuery.flowStates.join('","')}")`);
      }

      if (flowQuery.created?.from !== undefined) {
        whereClause.push(`createdAt > "${flowQuery.created.from.toISOString()}"`);
      }

      if (flowQuery.created?.to !== undefined) {
        whereClause.push(`createdAt < "${flowQuery.created.to.toISOString()}"`);
      }

      return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
        .approvalFlows()
        .get({
          queryArgs: {
            where: whereClause,
            expand: 'order',
            limit: limit,
            offset: getOffsetFromCursor(flowQuery.cursor!),
            sort: sortAttributes,
          },
        })
        .execute()
        .then((response) => {
          const count = response.body.results.length;

          return {
            items: response.body.results.map((flow) =>
              ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(flow, CartMapper, locale),
            ),
            count: count,
            total: response.body.total,
            previousCursor: ApprovalFlowMapper.calculatePreviousCursor(response.body.offset, count),
            nextCursor: ApprovalFlowMapper.calculateNextCursor(response.body.offset, count, response.body.total ?? 0),
          };
        });
    };

    get: (id: string) => Promise<ApprovalFlow> = async (id: string): Promise<ApprovalFlow> => {
      const locale = await this.getCommercetoolsLocal();
      return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
        .approvalFlows()
        .withId({ ID: id })
        .get({
          queryArgs: {
            expand: 'order',
          },
        })
        .execute()
        .then((response) => {
          return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body, CartMapper, locale);
        });
    };

    getFlowByOrderId: (orderId: string) => Promise<ApprovalFlow> = async (orderId: string): Promise<ApprovalFlow> => {
      const locale = await this.getCommercetoolsLocal();

      const where = `order(id="${orderId}")`;

      return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
        .approvalFlows()
        .get({
          queryArgs: {
            where,
          },
        })
        .execute()
        .then((response) => {
          if (response.body.total !== 1) {
            throw 'Order not found';
          }
          return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body.results[0], CartMapper, locale);
        });
    };

    update: (id: string, updateActions: any[]) => Promise<ApprovalFlow> = async (
      id: string,
      updateActions: any[],
    ): Promise<ApprovalFlow> => {
      const locale = await this.getCommercetoolsLocal();

      return this.get(id).then(async (approvalFlow) => {
        return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
          .approvalFlows()
          .withId({ ID: id })
          .post({
            body: {
              version: approvalFlow.version,
              actions: updateActions,
            },
          })
          .execute()
          .then((response) => {
            return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body, CartMapper, locale);
          });
      });
    };
  };
};
