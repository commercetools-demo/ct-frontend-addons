import { Request, ActionContext } from '@frontastic/extension-types';
import { Cart } from '../types.js';

declare class CartFetcher {
    static fetchCart(cartApi: any, request: Request, actionContext: ActionContext): Promise<Cart>;
    static fetchCartFromSession(cartApi: any, request: Request, actionContext: ActionContext): Promise<Cart | undefined>;
}

export { CartFetcher };
