import { ActionHandler, Context, Request, Response } from '@frontastic/extension-types';
import { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getLocale } from '../../../utils/request';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';
import { ApprovalFlowsQueryFactory } from '../utils/ApprovalFlowsQueryFactory';
import { ApprovalRulesQueryFactory } from '../utils/ApprovalRulesQueryFactory';
import parseRequestBody from '../../../utils/parseRequestBody';
import { ApprovalRuleDraft } from '@commercetools/platform-sdk';
import { ApprovalRule, ApprovalRuleUpdateActionSetStatus } from '../../types/approval/Rule';

const getApprovalApi = (request: Request, actionContext: Context, ApprovalFlowApi: any) => {
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);

  if (!account?.accountId) {
    throw new Error('Not logged in');
  }

  return new ApprovalFlowApi(
    actionContext,
    getLocale(request),
    getCurrency(request),
    account.accountId,
    businessUnitKey,
  );
};

export const getApprovalRules = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalRuleApi);
    try {
      const approvalRulesQuery = ApprovalRulesQueryFactory.queryFromParams(request);

      const res = await approvalRuleApi.query(approvalRulesQuery);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData,
      };
    } catch (error) {
      const response: Response = {
        statusCode: 401,
        // @ts-ignore
        body: JSON.stringify(error.message || error.body?.message || error),
      };
      return response;
    }
  };
};

export const getApprovalRule = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const approvalRuleId = request.query?.['approvalRuleId'];
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalRuleApi);

    try {
      const res = await approvalRuleApi.get(approvalRuleId);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData,
      };
    } catch (error: any) {
      const response: Response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error),
      };
      return response;
    }
  };
};

export const createApprovalRule = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalRuleApi);
    const body = parseRequestBody<ApprovalRuleDraft>(request.body);
    try {
      const res = await approvalRuleApi.create(body);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData,
      };
    } catch (error: any) {
      const response: Response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error),
      };
      return response;
    }
  };
};

export const duplicateApprovalRule = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalRuleApi);
    const approvalRuleId = request.query?.['approvalRuleId'];
    const body = parseRequestBody<{ businessUnitKeys: string[] }>(request.body);
    const approvalRule = await approvalRuleApi.get(approvalRuleId);
    const approvalRuleDraft: ApprovalRuleDraft = {
      approvers: approvalRule.approvers,
      name: approvalRule.name,
      predicate: approvalRule.predicate,
      requesters: approvalRule.requesters,
      status: approvalRule.status,
      description: approvalRule.description,
    };

    const promises =
      body?.businessUnitKeys.map((businessUnitKey) => approvalRuleApi.duplicate(businessUnitKey, approvalRuleDraft) as Promise<ApprovalRule>) ||
      [];

    try {
      const res = await Promise.allSettled(promises).then((values) => values);
      const rejections = res.filter((item) => item.status === 'rejected').map((item: any) => item.reason);
      if (rejections.length) {
        throw rejections.join('. ');
      }
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData,
      };
    } catch (error: any) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error.message || error.body?.message || error),
      };
      return response;
    }
  };
};
export const activateApprovalRule = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalRuleApi);
    const approvalRuleId = request.query?.['approvalRuleId'];

    try {
      const updateAction: ApprovalRuleUpdateActionSetStatus = {
        action: 'setStatus',
        status: 'Active',
      };
      const res = await approvalRuleApi.update(approvalRuleId, [updateAction]);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData,
      };
    } catch (error: any) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error.message || error.body?.message || error),
      };
      return response;
    }
  };
};
export const deactivateApprovalRule = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalRuleApi);
    const approvalRuleId = request.query?.['approvalRuleId'];

    try {
      const updateAction: ApprovalRuleUpdateActionSetStatus = {
        action: 'setStatus',
        status: 'Inactive',
      };
      const res = await approvalRuleApi.update(approvalRuleId, [updateAction]);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData,
      };
    } catch (error: any) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error.message || error.body?.message || error),
      };
      return response;
    }
  };
};
export const updateApprovalRule = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalRuleApi);
    const approvalRuleId = request.query?.['approvalRuleId'];

    try {
      const body = parseRequestBody<{
        requesterKeys?: string[];
        predicate?: string;
        name?: string;
        description?: string;
      }>(request.body);

      const updateActions = [];

      const approvalRule = await approvalRuleApi.get(approvalRuleId);

      if (!body) {
        const response: Response = {
          statusCode: 401,
          body: JSON.stringify('Body is empty'),
        };
        return response;
      }
      if (body?.name && body.name !== approvalRule.name) {
        updateActions.push({
          action: 'setName',
          name: body.name,
        });
      }

      if (body.description && body.description !== approvalRule.description) {
        updateActions.push({
          action: 'setDescription',
          description: body.description,
        });
      }

      if (body.requesterKeys) {
        updateActions.push({
          action: 'setRequesters',
          requesters: body.requesterKeys.map((key) => ({
            associateRole: {
              typeId: 'associate-role',
              key,
            },
          })),
        });
      }

      if (body.predicate && body.predicate !== approvalRule.predicate) {
        updateActions.push({
          action: 'setPredicate',
          predicate: body.predicate,
        });
      }

      const res = await approvalRuleApi.update(approvalRuleId, updateActions);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData,
      };
    } catch (error) {
      const response: Response = {
        statusCode: 401,
        // @ts-ignore
        body: JSON.stringify(error.message || error.body?.message || error),
      };
      return response;
    }
  };
};
