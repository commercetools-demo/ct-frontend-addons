import { ApprovalFlow as CommercewtoolsApprovalFlow } from '@commercetools/platform-sdk';
import { Order } from '@commercetools/frontend-domain-types/cart';
export type ApprovalFlow = CommercewtoolsApprovalFlow & {
    order: Order & {
        orderNumber?: string;
    };
};
//# sourceMappingURL=Flow.d.ts.map