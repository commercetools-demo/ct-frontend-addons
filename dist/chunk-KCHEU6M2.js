import {
  ExternalError
} from "./chunk-AIH233S2.js";

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
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
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
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
      };
      this.setSuperUserEmailOnOrder = async (order, superUserEmail, customType, customField) => {
        const locale = await this.getCommercetoolsLocal();
        const orderObj = await this.getOrderByID(order.cartId);
        let fields = {};
        if (orderObj.custom?.type?.obj?.key === customType) {
          fields = {
            ...orderObj.custom?.fields
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
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
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
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
      };
    }
  };
};

export {
  injectCartApi
};
