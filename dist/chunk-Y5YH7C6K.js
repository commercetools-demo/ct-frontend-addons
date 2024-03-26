// src/shared/utils/CartFetcher.ts
var CartFetcher = class {
  static async fetchCart(cartApi, request, actionContext) {
    return await this.fetchCartFromSession(cartApi, request, actionContext) ?? await cartApi.getAnonymous();
  }
  static async fetchCartFromSession(cartApi, request, actionContext) {
    if (request.sessionData?.account !== void 0) {
      return await cartApi.getForUser(request.sessionData.account);
    }
    if (request.sessionData?.cartId !== void 0) {
      try {
        return await cartApi.getActiveCartById(request.sessionData.cartId);
      } catch (error) {
        console.info(`Error fetching the cart ${request.sessionData.cartId}. ${error}`);
      }
    }
    return void 0;
  }
};

export {
  CartFetcher
};
