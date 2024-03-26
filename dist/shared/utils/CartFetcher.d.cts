import { Request, ActionContext } from '@frontastic/extension-types';
import { Cart } from '../types.cjs';
import '@commercetools/frontend-domain-types/product';
import '@commercetools/frontend-domain-types/product/Product';
import '@commercetools/frontend-domain-types/cart/Cart';
import '@commercetools/frontend-domain-types/cart/LineItem';
import '@commercetools/frontend-domain-types/account/Address';

declare class CartFetcher {
    static fetchCart(cartApi: any, request: Request, actionContext: ActionContext): Promise<Cart>;
    static fetchCartFromSession(cartApi: any, request: Request, actionContext: ActionContext): Promise<Cart | undefined>;
}

export { CartFetcher };
