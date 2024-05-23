import { AssociateRoleAssignment, ApprovalRule as CommercetoolsApprovalRule } from "@commercetools/platform-sdk";
export interface ApproverDisjunction {
    or: Omit<AssociateRoleAssignment, 'inheritance'>[];
}
export interface ApproverConjunction {
    and: ApproverDisjunction[];
}
export interface ApproverHierarchy {
    tiers: ApproverConjunction[];
}
export interface ApprovalRuleUpdateActionSetStatus {
    action: 'setStatus';
    status: 'Active' | 'Inactive';
}
export interface ApprovalRuleUpdateActionSetPredicate {
    action: 'setPredicate';
    predicate: string;
}
export interface ApprovalRuleUpdateActionSetRequester {
    action: 'setRequesters';
    requesters: Omit<AssociateRoleAssignment, 'inheritance'>[];
}
export interface ApprovalRuleDraft {
    name: string;
    predicate: string;
    description?: string;
    status: 'Active' | 'Inactive';
    approvers: ApproverHierarchy;
    requesters: Omit<AssociateRoleAssignment, 'inheritance'>[];
}
export interface ApprovalRuleUpdate {
    version: number;
    actions: (ApprovalRuleUpdateActionSetStatus | ApprovalRuleUpdateActionSetPredicate | ApprovalRuleUpdateActionSetRequester)[];
}
export type ApprovalRule = CommercetoolsApprovalRule;
//# sourceMappingURL=Rule.d.ts.map