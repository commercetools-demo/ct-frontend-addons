import { LineItem as DomainLineItem } from "@commercetools/frontend-domain-types/cart/LineItem";
import { Money } from "@commercetools/frontend-domain-types/product";
export type LineItem = DomainLineItem & {
    parentId?: string;
    price?: Money;
    discountedPrice?: Money;
    sku: string;
};
//# sourceMappingURL=types.d.ts.map