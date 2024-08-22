import { PaginatedResult } from '../../../../utils/types';
import { ApprovalFlow } from '../../../types/approval/Flow';
import { UseApprovals } from '../types';

export interface Options {
  cursor?: string;
  limit?: number;
  ids?: string[];
  states?: string[];
  createdFrom?: string;
  createdTo?: string;
  predicate?: string;
}

export const useApprovals = (sdk: any, businessUnitKey?: string, storeKey?: string): UseApprovals => {
  const getApprovalFlowByOrderId = async (orderId: string): Promise<any> => {
    const res = await sdk.callAction({
      actionName: `approval/getApprovalFlowByOrderId`,
      query: {
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
        orderId,
      },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const getApprovalFlowById = async (approvalFlowId: string): Promise<ApprovalFlow> => {
    const res = await sdk.callAction({
      actionName: `approval/getApprovalFlow`,
      query: {
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
        approvalFlowId,
      },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const getApprovalFlows = async ({ limit, cursor, ids, states, createdFrom, createdTo }: Options = {}): Promise<
    PaginatedResult<ApprovalFlow>
  > => {
    const res = await sdk.callAction({
      actionName: `approval/getApprovalFlows`,
      query: {
        ...(limit ? { limit } : {}),
        ...(cursor ? { cursor } : {}),
        ...(ids ? { flowIds: ids } : {}),
        ...(states ? { flowStates: states } : {}),
        ...(createdFrom ? { createdFrom } : {}),
        ...(createdTo ? { createdTo } : {}),
        ...(businessUnitKey ? { businessUnitKey } : {}),
        ...(storeKey ? { storeKey } : {}),
      },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const approveFlow = async (approvalFlowId: string): Promise<ApprovalFlow> => {
    const res = await sdk.callAction({
      actionName: `approval/approveFlow`,
      query: {
        approvalFlowId,
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
      },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const rejectFlow = async (approvalFlowId: string, reason?: string): Promise<ApprovalFlow> => {
    const res = await sdk.callAction({
      actionName: `approval/rejectFlow`,
      query: {
        approvalFlowId,
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
      },
      payload: { reason },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const getApprovalRules = async ({
    limit,
    cursor,
    ids,
    states,
    createdFrom,
    createdTo,
    predicate,
  }: Options): Promise<any> => {
    const res = await sdk.callAction({
      actionName: `approval/getApprovalRules`,
      query: {
        ...(limit ? { limit } : {}),
        ...(cursor ? { cursor } : {}),
        ...(ids ? { ruleIds: ids } : {}),
        ...(states ? { ruleStates: states } : {}),
        ...(predicate ? { predicate } : {}),
        ...(createdFrom ? { createdFrom } : {}),
        ...(createdTo ? { createdTo } : {}),
        ...(businessUnitKey ? { businessUnitKey } : {}),
        ...(storeKey ? { storeKey } : {}),
      },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const activateRule = async (approvalRuleId: string): Promise<any> => {
    const res = await sdk.callAction({
      actionName: `approval/activateApprovalRule`,
      query: {
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
        approvalRuleId,
      },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const deactivateRule = async (approvalRuleId: string): Promise<any> => {
    const res = await sdk.callAction({
      actionName: `approval/deactivateApprovalRule`,
      query: {
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
        approvalRuleId,
      },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const createRule = async (payload: any): Promise<any> => {
    const res = await sdk.callAction({
      actionName: `approval/createApprovalRule`,
      query: {
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
      },
      payload,
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const duplicateRule = async (approvalRuleId: string, businessUnitKeys: string[]): Promise<any> => {
    const res = await sdk.callAction({
      actionName: `approval/duplicateApprovalRule`,
      query: {
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
        approvalRuleId,
      },
      payload: { businessUnitKeys },
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };

  const updateRule = async (approvalRuleId: string, payload: Partial<any>): Promise<any> => {
    const res = await sdk.callAction({
      actionName: `approval/updateApprovalRule`,
      query: {
        businessUnitKey: businessUnitKey as string,
        storeKey: storeKey as string,
        approvalRuleId,
      },
      payload,
    });
    if (!res.isError) {
      return res.data;
    }
    throw res.error;
  };
  return {
    getApprovalFlows,
    approveFlow,
    rejectFlow,
    getApprovalFlowByOrderId,
    getApprovalFlowById,
    getApprovalRules,
    activateRule,
    deactivateRule,
    createRule,
    duplicateRule,
    updateRule,
  };
};
