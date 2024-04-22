import React from 'react';
export interface FlowComponents {
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
}
declare const ApprovalFlowsClientWrapper: ({ businessUnitKey, storeKey, sdk, components, translate, }: {
    businessUnitKey?: string | undefined;
    storeKey?: string | undefined;
    sdk: any;
    translate: (key: string) => string;
    components: FlowComponents;
}) => React.JSX.Element | null;
export default ApprovalFlowsClientWrapper;
//# sourceMappingURL=approval-flow-panel.d.ts.map