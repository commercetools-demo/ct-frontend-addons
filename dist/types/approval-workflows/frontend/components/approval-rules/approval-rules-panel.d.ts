import React from 'react';
export type RuleComponents = {
    SearchInput: any;
    Dropdown: any;
    DatePicker: any;
    RefinementDropdown: any;
    Drawer: any;
    Button: any;
    Accordion: any;
    Radio: any;
    Checkbox: any;
    Table: any;
    Link: any;
    Tag: any;
};
declare const ApprovalFlowsClientWrapper: ({ businessUnitKey, storeKey, sdk, components, permissions, translate, }: {
    businessUnitKey?: string | undefined;
    storeKey?: string | undefined;
    sdk: any;
    translate: (key: string) => string;
    permissions?: Record<string, boolean> | undefined;
    components: RuleComponents;
}) => React.JSX.Element | null;
export default ApprovalFlowsClientWrapper;
//# sourceMappingURL=approval-rules-panel.d.ts.map