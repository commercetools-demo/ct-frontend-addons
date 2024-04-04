import { LineItem as LineItem$1 } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Money } from '@commercetools/frontend-domain-types/product';

type LineItem = LineItem$1 & {
    parentId?: string;
    price?: Money;
    discountedPrice?: Money;
    sku: string;
};

export type { LineItem };
