import { ActionHandler, Request, Response } from '@frontastic/extension-types';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';
import { ApprovalFlowsQueryFactory } from '../utils/ApprovalFlowsQueryFactory';
import parseRequestBody from '../../../utils/parseRequestBody';
import { getApprovalApi } from '../utils/getApprovalApi';



export const getApprovalFlows = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const ApprovalFlowApi = extractDependency('ApprovalFlowApi', config);
    const approvalFlowApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalFlowApi);
    try {
      const approvalFlowQuery = ApprovalFlowsQueryFactory.queryFromParams(request);

      const res = await approvalFlowApi.query(approvalFlowQuery);
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
export const getApprovalFlow = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const approvalFlowId = request.query?.['approvalFlowId'];
    const ApprovalFlowApi = extractDependency('ApprovalFlowApi', config);
    const approvalFlowApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalFlowApi);
    try {
      const res = await approvalFlowApi.get(approvalFlowId);
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
export const getApprovalFlowByOrderId = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const orderId = request.query?.['orderId'];
    const ApprovalFlowApi = extractDependency('ApprovalFlowApi', config);
    const approvalFlowApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalFlowApi);
    try {
      const res = await approvalFlowApi.getFlowByOrderId(orderId);
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
export const approveFlow = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const approvalFlowId = request.query?.['approvalFlowId'];
    const ApprovalFlowApi = extractDependency('ApprovalFlowApi', config);
    const approvalFlowApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalFlowApi);
    try {
      const updateAction = {
        action: 'approve',
      };
      const res = await approvalFlowApi.update(approvalFlowId, [updateAction]);
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
export const rejectFlow = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext) => {
    const approvalFlowId = request.query?.['approvalFlowId'];
    const ApprovalFlowApi = extractDependency('ApprovalFlowApi', config);
    const approvalFlowApi = getApprovalApi(request, actionContext.frontasticContext!, ApprovalFlowApi);
    const body = parseRequestBody<{ reason: string }>(request.body);

    try {
      const updateAction = {
        action: 'reject',
        reason: body?.reason,
      };
      const res = await approvalFlowApi.update(approvalFlowId, [updateAction]);
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
