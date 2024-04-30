import {
  ApprovalRuleDraft,
  ByProjectKeyAsAssociateByAssociateIdInBusinessUnitKeyByBusinessUnitKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import { Configuration } from '../../types';
import { Context } from '@frontastic/extension-types';
import { RuleQuery } from '../../types/approval/Query';
import { PaginatedResult } from '../../../utils/types';
import { ApprovalRuleMapper } from '../mappers/ApprovalRuleMapper';
import { ApprovalRule } from '../../types/approval/Rule';
import { getOffsetFromCursor } from '../../../shared/utils/Pagination';

type A = ByProjectKeyAsAssociateByAssociateIdInBusinessUnitKeyByBusinessUnitKeyRequestBuilder;
export const injectApprovalRuleApi = (BaseApi: any, config: Configuration): typeof BaseApi => {
  return class ApprovalRuleApi extends BaseApi {
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
    query: (ruleQuery: RuleQuery) => Promise<PaginatedResult<ApprovalRule>> = async (
      ruleQuery: RuleQuery,
    ): Promise<PaginatedResult<ApprovalRule>> => {
      const locale = await this.getCommercetoolsLocal();
      const limit = +ruleQuery.limit! || undefined;
      const sortAttributes: string[] = [];

      if (ruleQuery.sortAttributes) {
        Object.keys(ruleQuery.sortAttributes).map((field, directionIndex) => {
          sortAttributes.push(`${field} ${Object.values(ruleQuery.sortAttributes!)[directionIndex]}`);
        });
      } else {
        // default sort
        sortAttributes.push(`createdAt desc`);
      }

      const whereClause: string[] = [];

      if (ruleQuery.predicate !== undefined) {
        whereClause.push(`predicate="${ruleQuery.predicate}"`);
      }

      if (ruleQuery.ruleIds !== undefined && ruleQuery.ruleIds.length > 0) {
        whereClause.push(`id in ("${ruleQuery.ruleIds.join('","')}")`);
      }

      if (ruleQuery.ruleStates !== undefined && ruleQuery.ruleStates.length > 0) {
        whereClause.push(`status in ("${ruleQuery.ruleStates.join('","')}")`);
      }

      if (ruleQuery.created?.from !== undefined) {
        whereClause.push(`createdAt > "${ruleQuery.created.from.toISOString()}"`);
      }

      if (ruleQuery.created?.to !== undefined) {
        whereClause.push(`createdAt < "${ruleQuery.created.to.toISOString()}"`);
      }

      return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
        .approvalRules()
        .get({
          queryArgs: {
            where: whereClause,
            expand: 'order',
            limit: limit,
            offset: getOffsetFromCursor(ruleQuery.cursor!),
            sort: sortAttributes,
          },
        })
        .execute()
        .then((response) => {
          const count = response.body.results.length;

          return {
            items: response.body.results.map((flow) =>
              ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(flow, locale),
            ),
            count: count,
            total: response.body.total,
            previousCursor: ApprovalRuleMapper.calculatePreviousCursor(response.body.offset, count),
            nextCursor: ApprovalRuleMapper.calculateNextCursor(response.body.offset, count, response.body.total ?? 0),
          };
        });
    };

    get: (id: string) => Promise<ApprovalRule> = async (id: string): Promise<ApprovalRule> => {
      const locale = await this.getCommercetoolsLocal();

      return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
        .approvalRules()
        .withId({ ID: id })
        .get({
          queryArgs: {
            expand: 'order',
          },
        })
        .execute()
        .then((response) => {
          return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
        });
    };

    create: (data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
      data: ApprovalRuleDraft,
    ): Promise<ApprovalRule> => {
      const locale = await this.getCommercetoolsLocal();
      return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
        .approvalRules()
        .post({
          body: {
            ...data,
          },
        })
        .execute()
        .then((response) => {
          return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
        });
    };

    update: (id: string, updateActions: any[]) => Promise<ApprovalRule> = async (
      id: string,
      updateActions: any[],
    ): Promise<ApprovalRule> => {
      const locale = await this.getCommercetoolsLocal();
      return this.get(id).then((approvalRule) => {
        return (this.associateEndpoints(this.accountId, this.businessUnitKey) as A)
          .approvalRules()
          .withId({ ID: id })
          .post({
            body: {
              version: approvalRule.version,
              actions: updateActions,
            },
          })
          .execute()
          .then((response) => {
            return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
          });
      });
    };

    duplicate: (businessUnitKey: string, data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
      businessUnitKey: string,
      data: ApprovalRuleDraft,
    ): Promise<ApprovalRule> => {
      const locale = await this.getCommercetoolsLocal();

      return (this.associateEndpoints(this.accountId, businessUnitKey) as A)
        .approvalRules()
        .post({
          body: {
            ...data,
          },
        })
        .execute()
        .then((response) => {
          return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
        });
    };

    //   duplicate: (businessUnitKey: string, data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
    //     businessUnitKey: string,
    //     data: ApprovalRuleDraft,
    //   ): Promise<ApprovalRule> => {
    //     const accessToken = await this.getAccessToken();
    //     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

    //     const response = await axios
    //       .post(
    //         `${clientSettings.hostUrl}/${clientSettings.projectKey}/as-associate/${this.account.accountId}/in-business-unit/key=${businessUnitKey}/approval-rules`,
    //         data,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         },
    //       )
    //       .catch(this.throwError);
    //     return response.data;
    //   };

    //   update: (id: string, updateActions: any[]) => Promise<ApprovalRule> = async (
    //     id: string,
    //     updateActions: any[],
    //   ): Promise<ApprovalRule> => {
    //     const accessToken = await this.getAccessToken();
    //     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

    //     const response = await this.get(id).then(async (approvalRule) => {
    //       const res = await axios
    //         .post(
    //           `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules/${id}`,
    //           {
    //             version: approvalRule.version,
    //             actions: updateActions,
    //           },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${accessToken}`,
    //             },
    //           },
    //         )
    //         .catch(this.throwError);
    //       return res.data;
    //     });
    //     return response.data;
    //   };

    //   create: (data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
    //     data: ApprovalRuleDraft,
    //   ): Promise<ApprovalRule> => {
    //     const accessToken = await this.getAccessToken();
    //     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

    //     const response = await axios
    //       .post(`${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules`, data, {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       })
    //       .catch(this.throwError);
    //     return response.data;
    //   };

    // getFlowByOrderId: (orderId: string) => Promise<ApprovalFlow> = async (orderId: string): Promise<ApprovalFlow> => {
    //   const accessToken = await this.getAccessToken();
    //   const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

    //   const query = encodeURIComponent(`order(id="${orderId}")`);

    //   const response = await axios
    //     .get(
    //       `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-flows?where=${query}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       },
    //     )
    //     .catch(this.throwError);
    //   if (response.data.total !== 1) {
    //     throw 'Order not found';
    //   }
    //   return response.data.results[0];
    // };

    // update: (id: string, updateActions: any[]) => Promise<ApprovalFlow> = async (
    //   id: string,
    //   updateActions: any[],
    // ): Promise<ApprovalFlow> => {
    //   const accessToken = await this.getAccessToken();
    //   const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

    //   const response = await this.get(id).then(async (approvalFlow) => {
    //     const res = await axios
    //       .post(
    //         `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-flows/${id}`,
    //         {
    //           version: approvalFlow.version,
    //           actions: updateActions,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         },
    //       )
    //       .catch(this.throwError);
    //     return res.data;
    //   });
    //   return response.data;
    // };
  };
};
// export class ApprovalRuleApi extends BaseApi {
//   protected organization?: Organization;
//   protected account?: Account;
//   protected associateEndpoints?;

//   constructor(
//     frontasticContext: Context,
//     locale: string,
//     currency: string,
//     organization?: Organization,
//     account?: Account,
//   ) {
//     super(frontasticContext, locale, currency);
//     this.account = account;
//     this.organization = organization;

//     this.associateEndpoints =
//       account && organization
//         ? `/as-associate/${account.accountId}/in-business-unit/key=${organization.businessUnit.key}`
//         : '/';
//   }

//   protected throwError: (e: any) => never = (e: any) => {
//     throw (
//       e.response?.data?.message + e.response?.data?.errors?.map((error: any) => error.detailedErrorMessage)?.join(', ')
//     );
//   };

//   getAccessToken: () => Promise<string> = async (): Promise<string> => {
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

//     const response = await axios
//       .post(
//         `${clientSettings.authUrl}/oauth/token?grant_type=client_credentials&scope=manage_project:${clientSettings.projectKey}`,
//         null,
//         {
//           headers: {
//             Authorization: `Basic ${Buffer.from(clientSettings.clientId + ':' + clientSettings.clientSecret).toString(
//               'base64',
//             )}`,
//           },
//         },
//       )
//       .catch(this.throwError);
//     return response.data.access_token;
//   };

//   query: () => Promise<ApprovalRule[]> = async (): Promise<ApprovalRule[]> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

//     const response = await axios
//       .get(
//         `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules?sort=createdAt desc`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       )
//       .catch(this.throwError);
//     return response.data?.results;
//   };

//   get: (id: string) => Promise<ApprovalRule> = async (id: string): Promise<ApprovalRule> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

//     const response = await axios
//       .get(`${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .catch(this.throwError);
//     return response.data;
//   };

//   duplicate: (businessUnitKey: string, data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
//     businessUnitKey: string,
//     data: ApprovalRuleDraft,
//   ): Promise<ApprovalRule> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

//     const response = await axios
//       .post(
//         `${clientSettings.hostUrl}/${clientSettings.projectKey}/as-associate/${this.account.accountId}/in-business-unit/key=${businessUnitKey}/approval-rules`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       )
//       .catch(this.throwError);
//     return response.data;
//   };

//   update: (id: string, updateActions: any[]) => Promise<ApprovalRule> = async (
//     id: string,
//     updateActions: any[],
//   ): Promise<ApprovalRule> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);

//     const response = await this.get(id).then(async (approvalRule) => {
//       const res = await axios
//         .post(
//           `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules/${id}`,
//           {
//             version: approvalRule.version,
//             actions: updateActions,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           },
//         )
//         .catch(this.throwError);
//       return res.data;
//     });
//     return response.data;
//   };
// }
