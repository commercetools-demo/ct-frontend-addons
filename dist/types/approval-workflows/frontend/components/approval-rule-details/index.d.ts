import React from 'react';
import { ApprovalRule } from '../../../types/approval/Rule';
export type RuleComponents = {
    Select: any;
    Button: any;
    InfoBanner: any;
    PreviousPageLink: any;
    Input: any;
    Tag: any;
    RefinementDropdown: any;
    Label: any;
    Checkbox: any;
};
declare const ApprovalRuleDetails: ({ components, sdk, rule, translate, roleOptions, activeBusinessUnit, permissions, storeKey, isEditing, }: {
    isEditing?: boolean | undefined;
    sdk: any;
    activeBusinessUnit?: any;
    storeKey?: string | undefined;
    translate: (translationKey: string) => string;
    rule: ApprovalRule;
    roleOptions?: {
        value: string;
        name: string;
    }[] | undefined;
    components: RuleComponents;
    permissions?: Record<string, boolean> | undefined;
}) => React.JSX.Element;
export default ApprovalRuleDetails;
//# sourceMappingURL=index.d.ts.map