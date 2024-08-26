import { ActionContext, Request } from '@frontastic/extension-types';
import { Cart } from '../types';

export class CartFetcher {
  static async fetchCart(
    cartApi: any,
    request: Request,
    actionContext: ActionContext,
    params?: Record<string, any>,
  ): Promise<Cart> {
    return (
      (await this.fetchCartFromSession(cartApi, request, actionContext, params)) ??
      (await (params ? cartApi.getAnonymous(params) : cartApi.getAnonymous()))
    );
  }

  static async fetchCartFromSession(
    cartApi: any,
    request: Request,
    actionContext: ActionContext,
    params?: Record<string, any>,
  ): Promise<Cart | undefined> {
    // If the user just logged in and the anonymous cart was merged into the account cart, we want to return
    // the account cart as it might be different from the anonymous cart id that was stored in the session.
    if (request.sessionData?.account !== undefined) {
      return await (params
        ? cartApi.getForUser(request.sessionData.account, params)
        : cartApi.getForUser(request.sessionData.account));
    }

    if (request.sessionData?.cartId !== undefined) {
      try {
        return await (params
          ? cartApi.getActiveCartById(request.sessionData.cartId, params)
          : cartApi.getActiveCartById(request.sessionData.cartId));
      } catch (error) {
        console.info(`Error fetching the cart ${request.sessionData.cartId}. ${error}`);
      }
    }

    return undefined;
  }
}
