import { ApprovalRuleDraft } from "@commercetools/platform-sdk";
import { PaginatedResult } from "../../../utils/types";
import { ApprovalFlow } from "../../types/approval/Flow";
import { ApprovalRule } from "../../types/approval/Rule";
import { Options } from "./useApprovals";

export interface UseApprovals {
    getApprovalRules: (options: Options) => Promise<PaginatedResult<ApprovalRule>>;
    activateRule: ( id: string) => Promise<ApprovalRule>;
    deactivateRule: (id: string) => Promise<ApprovalRule>;
    createRule: (payload: ApprovalRuleDraft) => Promise<ApprovalRule>;
    duplicateRule: (approvalRuleId: string, businessUnitKeys: string[]) => Promise<any>;
    updateRule: (approvalRuleId: string, payload: Partial<ApprovalRuleDraft>) => Promise<ApprovalRule>;
    getApprovalFlowByOrderId: (orderId: string) => Promise<ApprovalFlow>;
    getApprovalFlowById: (approvalFlowId: string) => Promise<ApprovalFlow>;
    getApprovalFlows: (options: Options) => Promise<PaginatedResult<ApprovalFlow>>;
    approveFlow: (approvalFlowId: string) => Promise<ApprovalFlow>;
    rejectFlow: (approvalFlowId: string, reason?: string) => Promise<ApprovalFlow>;
  }
