// src/configurable-products/extensions/apis/CartApi.ts
var injectCartApi = (BaseCartApi, config) => {
  return class CartApi extends BaseCartApi {
    async getCommercetoolsCartById(cartId) {
      return await this.associateEndpoints(this.accountId, this.businessUnitKey).carts().withId({
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
        return response.body;
      });
    }
    async addLinkedLineitemsToCart(cartId, cartVersion, lineItemId, configurableComponents) {
      const locale = await this.getCommercetoolsLocal();
      const cartUpdate = {
        version: cartVersion,
        actions: []
      };
      configurableComponents?.forEach((field) => {
        const addLineItemActions = {
          action: "addLineItem",
          sku: field.variant.sku,
          quantity: +field.count || 1,
          ...this.distributionChannelId && {
            distributionChannel: { typeId: "channel", id: this.distributionChannelId }
          },
          ...this.supplyChannelId && {
            supplyChannel: { typeId: "channel", id: this.supplyChannelId }
          },
          custom: {
            type: {
              key: config?.props.lineItem.customTypeKey,
              typeId: "type"
            },
            fields: {
              [config.props.lineItem.parentIdCustomFieldKey]: lineItemId
            }
          }
        };
        cartUpdate.actions.push(addLineItemActions);
      });
      const commercetoolsCart = await this.updateCart(cartId, cartUpdate);
      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
    async removeLinkedLineitemsFromCart(cart, lineItemId) {
      const locale = await this.getCommercetoolsLocal();
      const linkedLineItems = cart.lineItems.filter((lineitem) => {
        return lineitem.parentId === lineItemId;
      });
      const cartUpdate = {
        version: +cart.cartVersion,
        actions: []
      };
      linkedLineItems?.forEach((field) => {
        const addLineItemActions = {
          action: "removeLineItem",
          lineItemId: field.lineItemId
        };
        cartUpdate.actions.push(addLineItemActions);
      });
      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate);
      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
    async updateLinkedLineitemsInCart(cart, lineItem) {
      const locale = await this.getCommercetoolsLocal();
      const linkedLineItems = cart.lineItems.filter((lineitem) => {
        return lineitem.parentId === lineItem.id;
      });
      const cartUpdate = {
        version: +cart.cartVersion,
        actions: []
      };
      linkedLineItems?.forEach((field) => {
        const addLineItemActions = {
          action: "changeLineItemQuantity",
          lineItemId: field.lineItemId,
          quantity: lineItem.count
        };
        cartUpdate.actions.push(addLineItemActions);
      });
      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate);
      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
  };
};

export {
  injectCartApi
};
