import { ActionContext, Request } from '@frontastic/extension-types';
import { Cart } from '../types';
export declare class CartFetcher {
    static fetchCart(cartApi: any, request: Request, actionContext: ActionContext): Promise<Cart>;
    static fetchCartFromSession(cartApi: any, request: Request, actionContext: ActionContext): Promise<Cart | undefined>;
}
//# sourceMappingURL=CartFetcher.d.ts.map