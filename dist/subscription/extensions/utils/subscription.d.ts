import { LineItem, Cart } from '../../../shared/types.js';
import { LineItemVariant } from '../types.js';
import '@commercetools/frontend-domain-types/product';
import '@commercetools/frontend-domain-types/product/Product';
import '@commercetools/frontend-domain-types/cart/Cart';
import '@commercetools/frontend-domain-types/cart/LineItem';
import '@commercetools/frontend-domain-types/account/Address';

declare const calculateNextDeliveryDate: (variant: LineItem['variant'], interval: number) => string;
declare const getSubscriptionGroups: (cart: Cart, parentLineItemCustomFieldKey: string, lineItemIsSubscriptionCustomFieldKey: string) => Record<string, {
    lineItems: LineItem[];
    variant: LineItem['variant'];
}> | undefined;
declare const handleSubscriptionsOnAddToCart: (cart: Cart, body: {
    variant?: LineItemVariant;
    subscriptions?: Partial<LineItemVariant>[];
}, cartApi: any, customTypeKey: string, parentLineItemCustomFieldKey: string, isSubscriptionCustomFieldKey: string) => Promise<Cart>;

export { calculateNextDeliveryDate, getSubscriptionGroups, handleSubscriptionsOnAddToCart };
