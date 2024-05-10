import ApprovalFlowsPanel from './components/approval-flows/approval-flow-panel';
import ApprovalRulesPanel from './components/approval-rules/approval-rules-panel';
import ApprovalFlowsDetails from './components/approval-flow-details';
import ApprovalRulesDetails from './components/approval-rule-details';
import { useApprovals } from './hooks/useApprovals';
export var COMPONENTS = { ApprovalFlowsPanel: ApprovalFlowsPanel, ApprovalRulesPanel: ApprovalRulesPanel, ApprovalFlowsDetails: ApprovalFlowsDetails, ApprovalRulesDetails: ApprovalRulesDetails };
export var HOOKS = { useApprovals: useApprovals };
