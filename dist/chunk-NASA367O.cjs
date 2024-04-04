"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/minimum-quantity/extensions/apis/CartApi.ts
var injectCartApi = (BaseCartApi) => {
  return class CartApi extends BaseCartApi {
    constructor() {
      super(...arguments);
      this.addMinimumQuantityToCart = async (cart, changes) => {
        const locale = await this.getCommercetoolsLocal();
        const cartUpdate = {
          version: +cart.cartVersion,
          actions: changes.map((change) => ({
            action: "changeLineItemQuantity",
            lineItemId: change.lineItemId,
            quantity: change.quantity
          }))
        };
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
        return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
      };
    }
  };
};



exports.injectCartApi = injectCartApi;
