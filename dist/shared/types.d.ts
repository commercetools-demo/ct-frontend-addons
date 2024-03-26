import { Category, Variant } from '@commercetools/frontend-domain-types/product';
import { Product as Product$1 } from '@commercetools/frontend-domain-types/product/Product';
import { Cart as Cart$1 } from '@commercetools/frontend-domain-types/cart/Cart';
import { LineItem as LineItem$1 } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Address } from '@commercetools/frontend-domain-types/account/Address';

type AccountLoginBody = {
    email?: string;
    password?: string;
    impersonatedCustomerEmail?: string;
};
type Account = {
    accountId?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
};
interface LineItem extends LineItem$1 {
    lineItemId: string;
    custom?: Record<string, any>;
    variant: {
        sku: string;
        attributes: Record<string, any>;
    };
    count: number;
}
interface Subscription {
    order?: Order;
    product?: Product;
    sku?: string;
    nextDeliveryDate?: string;
    isActive?: boolean;
}
declare enum CartState {
    Active = "Active",
    Frozen = "Frozen",
    Merged = "Merged",
    Ordered = "Ordered"
}
interface Cart extends Cart$1 {
    lineItems: LineItem[];
    customerId?: string;
    directDiscounts?: number | undefined;
    itemShippingAddresses?: Address[];
    origin?: string;
    subscription?: Subscription;
    discountedAmount?: Money;
    cartState?: CartState;
    businessUnitKey?: string;
    storeKey?: string;
}
interface Order extends Cart {
    cartId: string;
    orderVersion: string;
    orderState?: string;
    createdAt?: Date;
}
interface Money {
    fractionDigits?: number;
    centAmount?: number;
    currencyCode?: string;
}
interface Product extends Product$1 {
    categories?: Category[];
    variants: Variant[];
}
type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};

export { type Account, type AccountLoginBody, type Cart, CartState, type LineItem, type Money, type Order, type Product, type Subscription, type Writeable };
