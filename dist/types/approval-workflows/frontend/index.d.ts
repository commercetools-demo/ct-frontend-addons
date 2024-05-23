/// <reference types="react" />
import type { ApprovalFlow } from '../types/approval/Flow';
import type { ApprovalRule } from '../types/approval/Rule';
export declare const COMPONENTS: {
    ApprovalFlowsPanel: ({ businessUnitKey, storeKey, sdk, components, translate, }: {
        businessUnitKey?: string | undefined;
        storeKey?: string | undefined;
        sdk: any;
        translate: (key: string) => string;
        components: import("./components/approval-flows/approval-flow-panel").FlowComponents;
    }) => import("react").JSX.Element | null;
    ApprovalRulesPanel: ({ businessUnitKey, storeKey, sdk, components, permissions, translate, }: {
        businessUnitKey?: string | undefined;
        storeKey?: string | undefined;
        sdk: any;
        translate: (key: string) => string;
        permissions?: Record<string, boolean> | undefined;
        components: import("./components/approval-rules/approval-rules-panel").RuleComponents;
    }) => import("react").JSX.Element | null;
    ApprovalFlowsDetails: ({ sdk, activeBusinessUnit, storeKey, flow, translate, calculateTransaction, components, accountId, permissions, }: {
        sdk: any;
        activeBusinessUnit?: any;
        storeKey?: string | undefined;
        translate: (translationKey: string) => string;
        calculateTransaction: (cart: Partial<import("@commercetools/frontend-domain-types/cart").Cart>) => import("../../shared/types").Transaction;
        flow: ApprovalFlow;
        components: {
            Button: any;
            InfoBanner: any;
            PreviousPageLink: any;
            Input: any;
            Tag: any;
        };
        accountId?: string | undefined;
        permissions?: Record<string, boolean> | undefined;
    }) => import("react").JSX.Element | null;
    ApprovalRulesDetails: ({ components, sdk, rule, translate, roleOptions, activeBusinessUnit, permissions, storeKey, isEditing, }: {
        isEditing?: boolean | undefined;
        sdk: any;
        activeBusinessUnit?: any;
        storeKey?: string | undefined;
        translate: (translationKey: string) => string;
        rule: import("@commercetools/platform-sdk").ApprovalRule;
        roleOptions?: {
            value: string;
            name: string;
        }[] | undefined;
        components: import("./components/approval-rule-details").RuleComponents;
        permissions?: Record<string, boolean> | undefined;
    }) => import("react").JSX.Element;
};
export declare const HOOKS: {
    useApprovals: (sdk: any, businessUnitKey?: string | undefined, storeKey?: string | undefined) => import("./hooks/types").UseApprovals;
};
export type { ApprovalFlow, ApprovalRule };
//# sourceMappingURL=index.d.ts.map