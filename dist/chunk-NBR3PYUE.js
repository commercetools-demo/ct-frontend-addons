import {
  extractDependency
} from "./chunk-XJJ4GMMW.js";
import {
  CartFetcher
} from "./chunk-Y5YH7C6K.js";
import {
  getCurrency,
  getLocale
} from "./chunk-OUNJUZFQ.js";

// src/superuser/extensions/actionControllers/CartController.ts
var changePrice = (config) => {
  return async (request, actionContext) => {
    const CartApi = extractDependency("CartApi", config?.dependencies);
    if (!CartApi) {
      const response = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi | CartFetcher")
      };
      return response;
    }
    if (request.body) {
      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
      const body = JSON.parse(request.body);
      let cart = await CartFetcher.fetchCart(cartApi, request, actionContext);
      cart = await cartApi.changeLineItemPrice(cart, body.lineItemId, body.price);
      const response = {
        statusCode: 200,
        body: JSON.stringify(cart),
        sessionData: {
          ...request.sessionData,
          cartId: cart.cartId
        }
      };
      return response;
    }
  };
};
var checkoutWithCSR = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let order = JSON.parse(originalResult.body);
      const superUserEmail = request.sessionData?.superUser?.email;
      if (order && superUserEmail) {
        const CartApi = extractDependency("CartApi", config?.dependencies);
        if (!CartApi) {
          const response2 = {
            statusCode: 401,
            body: JSON.stringify("Dependencies not provided: CartApi")
          };
          return response2;
        }
        const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
        order = await cartApi.setSuperUserEmailOnOrder(
          order,
          superUserEmail,
          config?.props.csrCustomTypeKey,
          config?.props.csrCustomFieldKey
        );
        const response = {
          statusCode: 200,
          body: JSON.stringify(order),
          sessionData: originalResult.sessionData
        };
        return response;
      }
    }
    return originalResult;
  };
};
var getOrders = (originalCb, config) => {
  return async (request, actionContext) => {
    const CartApi = extractDependency("CartApi", config?.dependencies);
    if (!CartApi) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response2;
    }
    const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
    const account = request.sessionData?.account !== void 0 ? request.sessionData.account : void 0;
    if (account === void 0) {
      const response2 = {
        statusCode: 500
      };
      return response2;
    }
    const orders = await cartApi.getOrders(account);
    const response = {
      statusCode: 200,
      body: JSON.stringify(orders)
    };
    return response;
  };
};

export {
  changePrice,
  checkoutWithCSR,
  getOrders
};
