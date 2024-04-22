import { getApprovalRules, getApprovalRule, activateApprovalRule, createApprovalRule, deactivateApprovalRule, duplicateApprovalRule, updateApprovalRule, } from './controllers/ApprovalRuleController';
import { getApprovalFlows, approveFlow, getApprovalFlow, getApprovalFlowByOrderId, rejectFlow, } from './controllers/ApprovalFlowController';
import dataSources from './dataSources';
import { injectFlowPageHandler, injectRulePageHandler } from './dynamicPageHandlers';
var approvalWorkflowsExt = {
    dataSources: dataSources,
    dynamicPageHandlers: {
        'frontastic/approval-flow-page': {
            hook: injectFlowPageHandler,
            create: true,
        },
        'frontastic/approval-rule-page': {
            hook: injectRulePageHandler,
            create: true,
        }
    },
    actions: [
        {
            action: 'getApprovalFlows',
            actionNamespace: 'approval',
            hook: getApprovalFlows,
            create: true,
        },
        {
            action: 'approveFlow',
            actionNamespace: 'approval',
            hook: approveFlow,
            create: true,
        },
        {
            action: 'rejectFlow',
            actionNamespace: 'approval',
            hook: rejectFlow,
            create: true,
        },
        {
            action: 'getApprovalFlow',
            actionNamespace: 'approval',
            hook: getApprovalFlow,
            create: true,
        },
        {
            action: 'getApprovalFlowByOrderId',
            actionNamespace: 'approval',
            hook: getApprovalFlowByOrderId,
            create: true,
        },
        {
            action: 'getApprovalRules',
            actionNamespace: 'approval',
            hook: getApprovalRules,
            create: true,
        },
        { action: 'getApprovalRule', actionNamespace: 'approval', hook: getApprovalRule, create: true },
        { action: 'activateApprovalRule', actionNamespace: 'approval', hook: activateApprovalRule, create: true },
        { action: 'createApprovalRule', actionNamespace: 'approval', hook: createApprovalRule, create: true },
        { action: 'deactivateApprovalRule', actionNamespace: 'approval', hook: deactivateApprovalRule, create: true },
        { action: 'duplicateApprovalRule', actionNamespace: 'approval', hook: duplicateApprovalRule, create: true },
        { action: 'updateApprovalRule', actionNamespace: 'approval', hook: updateApprovalRule, create: true },
    ],
};
export default approvalWorkflowsExt;
