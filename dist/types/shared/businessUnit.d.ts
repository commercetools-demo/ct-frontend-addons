import { Account } from "@commercetools/frontend-domain-types/account";
export type Permission = 'AcceptMyQuotes' | 'AcceptOthersQuotes' | 'AddChildUnits' | 'CreateApprovalRules' | 'CreateMyCarts' | 'CreateMyOrdersFromMyCarts' | 'CreateMyOrdersFromMyQuotes' | 'CreateMyQuoteRequestsFromMyCarts' | 'CreateOrdersFromOthersCarts' | 'CreateOrdersFromOthersQuotes' | 'CreateOthersCarts' | 'CreateQuoteRequestsFromOthersCarts' | 'DeclineMyQuotes' | 'DeclineOthersQuotes' | 'DeleteMyCarts' | 'DeleteOthersCarts' | 'ReassignMyQuotes' | 'ReassignOthersQuotes' | 'RenegotiateMyQuotes' | 'RenegotiateOthersQuotes' | 'UpdateApprovalFlows' | 'UpdateApprovalRules' | 'UpdateAssociates' | 'UpdateBusinessUnitDetails' | 'UpdateMyCarts' | 'UpdateMyOrders' | 'UpdateMyQuoteRequests' | 'UpdateOthersCarts' | 'UpdateOthersOrders' | 'UpdateOthersQuoteRequests' | 'UpdateParentUnit' | 'ViewMyCarts' | 'ViewMyOrders' | 'ViewMyQuoteRequests' | 'ViewMyQuotes' | 'ViewOthersCarts' | 'ViewOthersOrders' | 'ViewOthersQuoteRequests' | 'ViewOthersQuotes';
export interface AssociateRole {
    key?: string;
    name?: string;
    permissions?: Permission[];
}
export interface Associate extends Account {
    roles?: AssociateRole[];
}
export interface BusinessUnit {
    businessUnitId?: string;
    key?: string;
    name?: string;
    contactEmail?: string;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
    associates?: Associate[];
    parentUnit?: BusinessUnit;
    topLevelUnit?: BusinessUnit;
    version?: number;
}
//# sourceMappingURL=businessUnit.d.ts.map