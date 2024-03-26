// src/subscription/extensions/apis/CartApi.ts
var injectCartApi = (BaseCartApi) => {
  return class CartApi extends BaseCartApi {
    constructor() {
      super(...arguments);
      this.addLinkedLineitemsToCart = async (cart, lineItems) => {
        try {
          const locale = await this.getCommercetoolsLocal();
          const cartUpdate = {
            version: +cart.cartVersion,
            actions: lineItems.map((subscription) => {
              const action = {
                action: "addLineItem",
                sku: subscription.variant.sku,
                quantity: +subscription.count,
                custom: subscription.custom
              };
              if (this.distributionChannelId) {
                action.distributionChannel = {
                  id: this.distributionChannelId,
                  typeId: "channel"
                };
              }
              if (this.supplyChannelId) {
                action.supplyChannel = {
                  id: this.supplyChannelId,
                  typeId: "channel"
                };
              }
              return action;
            })
          };
          const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
          return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
        } catch (error) {
          throw new Error(`addToCart failed. ${error}`);
        }
      };
      this.freezeCart = async (cart) => {
        try {
          const locale = await this.getCommercetoolsLocal();
          const cartUpdate = {
            version: +cart.cartVersion,
            actions: [
              {
                action: "freezeCart"
              }
            ]
          };
          const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
          return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
        } catch (error) {
          throw new Error(`freeze error failed. ${error}`);
        }
      };
      this.unfreezeCart = async (cart) => {
        try {
          const locale = await this.getCommercetoolsLocal();
          const cartUpdate = {
            version: +cart.cartVersion,
            actions: [
              {
                action: "unfreezeCart"
              }
            ]
          };
          const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
          return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
        } catch (error) {
          throw new Error(`freeze error failed. ${error}`);
        }
      };
      this.setCartExpirationDays = async (cart, deleteDaysAfterLastModification) => {
        try {
          const locale = await this.getCommercetoolsLocal();
          const cartUpdate = {
            version: +cart.cartVersion,
            actions: [
              {
                action: "setDeleteDaysAfterLastModification",
                deleteDaysAfterLastModification
              }
            ]
          };
          const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
          return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
        } catch (error) {
          throw new Error(`freeze error failed. ${error}`);
        }
      };
      this.setCustomType = async (cart, type, fields) => {
        try {
          const locale = await this.getCommercetoolsLocal();
          const cartUpdate = {
            version: +cart.cartVersion,
            actions: [
              {
                action: "setCustomType",
                type: {
                  typeId: "type",
                  key: type
                },
                fields
              }
            ]
          };
          const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
          return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
        } catch (error) {
          throw new Error(`freeze error failed. ${error}`);
        }
      };
      this.removeAllLineItems = async (cart) => {
        try {
          const locale = await this.getCommercetoolsLocal();
          const cartUpdate = {
            version: +cart.cartVersion,
            actions: cart.lineItems.map((lineItem) => ({
              action: "removeLineItem",
              lineItemId: lineItem.lineItemId
            }))
          };
          const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
          return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
        } catch (error) {
          throw new Error(`removeLineItem failed. ${error}`);
        }
      };
    }
    async getById(cartId) {
      const locale = await this.getCommercetoolsLocal();
      return await this.requestBuilder().carts().withId({
        ID: cartId
      }).get({
        queryArgs: {
          limit: 1,
          expand: [
            "lineItems[*].discountedPrice.includedDiscounts[*].discount",
            "discountCodes[*].discountCode",
            "paymentInfo.payments[*]"
          ]
        }
      }).execute().then((response) => {
        return this.buildCartWithAvailableShippingMethods(response.body, locale);
      }).catch((error) => {
        throw new Error(error.message);
      });
    }
  };
};

export {
  injectCartApi
};
