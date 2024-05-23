import ApprovalFlowsPanel from './components/approval-flows/approval-flow-panel';
import ApprovalRulesPanel from './components/approval-rules/approval-rules-panel';
import ApprovalFlowsDetails from './components/approval-flow-details';
import ApprovalRulesDetails from './components/approval-rule-details';
import { useApprovals } from './hooks/useApprovals';
import type { ApprovalFlow } from '../types/approval/Flow';
import type { ApprovalRule } from '../types/approval/Rule';
export { ApprovalFlowsPanel, ApprovalRulesPanel, ApprovalFlowsDetails, ApprovalRulesDetails };

export { useApprovals };

export type { ApprovalFlow, ApprovalRule };
