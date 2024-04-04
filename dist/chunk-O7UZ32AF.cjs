"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/configurable-products/extensions/apis/CartApi.ts
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
      _optionalChain([configurableComponents, 'optionalAccess', _ => _.forEach, 'call', _2 => _2((field) => {
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
              key: _optionalChain([config, 'optionalAccess', _3 => _3.props, 'access', _4 => _4.lineItem, 'access', _5 => _5.customTypeKey]),
              typeId: "type"
            },
            fields: {
              [config.props.lineItem.parentIdCustomFieldKey]: lineItemId
            }
          }
        };
        cartUpdate.actions.push(addLineItemActions);
      })]);
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
      _optionalChain([linkedLineItems, 'optionalAccess', _6 => _6.forEach, 'call', _7 => _7((field) => {
        const addLineItemActions = {
          action: "removeLineItem",
          lineItemId: field.lineItemId
        };
        cartUpdate.actions.push(addLineItemActions);
      })]);
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
      _optionalChain([linkedLineItems, 'optionalAccess', _8 => _8.forEach, 'call', _9 => _9((field) => {
        const addLineItemActions = {
          action: "changeLineItemQuantity",
          lineItemId: field.lineItemId,
          quantity: lineItem.count
        };
        cartUpdate.actions.push(addLineItemActions);
      })]);
      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate);
      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
  };
};



exports.injectCartApi = injectCartApi;
