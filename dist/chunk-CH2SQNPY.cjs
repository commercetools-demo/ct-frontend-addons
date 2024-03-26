"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkRJQQSQ2Gcjs = require('./chunk-RJQQSQ2G.cjs');

// src/superuser/extensions/apis/CartApi.ts
var injectCartApi = (BaseCartApi, CartMapper) => {
  return class CartApi extends BaseCartApi {
    constructor() {
      super(...arguments);
      this.changeLineItemPrice = async (cart, lineItemId, externalPrice) => {
        const locale = await this.getCommercetoolsLocal();
        const cartUpdate = {
          version: +cart.cartVersion,
          actions: [
            {
              action: "setLineItemPrice",
              lineItemId,
              externalPrice
            }
          ]
        };
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
        return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
      };
      this.getOrderByID = async (id) => {
        const commercetoolsOrder = await this.requestBuilder().orders().withId({ ID: id }).get({
          queryArgs: {
            expand: "custom.type"
          }
        }).execute().then((response) => response.body).catch((error) => {
          throw new (0, _chunkRJQQSQ2Gcjs.ExternalError)({ status: error.code, message: error.message, body: error.body });
        });
        return commercetoolsOrder;
      };
      this.getOrders = async (account) => {
        const locale = await this.getCommercetoolsLocal();
        return await this.requestBuilder().orders().get({
          queryArgs: {
            expand: [
              "lineItems[*].discountedPrice.includedDiscounts[*].discount",
              "discountCodes[*].discountCode",
              "paymentInfo.payments[*]"
            ],
            where: `customerId="${account.accountId}"`,
            sort: "createdAt desc"
          }
        }).execute().then((response) => {
          return response.body.results.map((order) => CartMapper.commercetoolsOrderToOrder(order, locale));
        }).catch((error) => {
          throw new (0, _chunkRJQQSQ2Gcjs.ExternalError)({ status: error.code, message: error.message, body: error.body });
        });
      };
      this.setSuperUserEmailOnOrder = async (order, superUserEmail, customType, customField) => {
        const locale = await this.getCommercetoolsLocal();
        const orderObj = await this.getOrderByID(order.cartId);
        let fields = {};
        if (_optionalChain([orderObj, 'access', _ => _.custom, 'optionalAccess', _2 => _2.type, 'optionalAccess', _3 => _3.obj, 'optionalAccess', _4 => _4.key]) === customType) {
          fields = {
            ..._optionalChain([orderObj, 'access', _5 => _5.custom, 'optionalAccess', _6 => _6.fields])
          };
        }
        const orderUpdate = {
          version: +order.orderVersion,
          actions: [
            {
              action: "setCustomType",
              type: {
                typeId: "type",
                key: customType
              },
              fields: {
                ...fields,
                [customField]: superUserEmail
              }
            }
          ]
        };
        order = await this.requestBuilder().orders().withId({ ID: order.cartId }).post({ body: orderUpdate }).execute().then((response) => CartMapper.commercetoolsOrderToOrder(response.body, locale)).catch((error) => {
          throw new (0, _chunkRJQQSQ2Gcjs.ExternalError)({ status: error.code, message: error.message, body: error.body });
        });
        return order;
      };
      this.getActiveCartById = async (cartId) => {
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
          if (response.body.cartState !== "Active") {
            throw new Error(`Cart ${cartId} is not active.`);
          }
          return this.buildCartWithAvailableShippingMethods(response.body, locale);
        }).catch((error) => {
          throw new (0, _chunkRJQQSQ2Gcjs.ExternalError)({ status: error.code, message: error.message, body: error.body });
        });
      };
    }
  };
};



exports.injectCartApi = injectCartApi;
