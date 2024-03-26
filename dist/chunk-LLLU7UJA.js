import {
  getCurrency,
  getLocale
} from "./chunk-OUNJUZFQ.js";
import {
  extractDependency
} from "./chunk-U7V7DDWV.js";

// src/minimum-quantity/extensions/actionControllers/cartController.ts
var addToCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config?.dependencies);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
      const changes = [];
      cart.lineItems.forEach((lineItem) => {
        const minimoAttribute = lineItem.variant?.attributes?.[config?.props?.attributeName || ""];
        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
          if (lineItem.count < minimoAttribute) {
            changes.push({
              lineItemId: lineItem.lineItemId,
              quantity: minimoAttribute
            });
          }
        }
      });
      const res = await cartApi.addMinimumQuantityToCart(cart, changes);
      const response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(res)
      };
      return response;
    }
    return originalResult;
  };
};
var updateLineItem = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config?.dependencies);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
      const changes = [];
      cart.lineItems.forEach((lineItem) => {
        const minimoAttribute = lineItem.variant?.attributes?.[config?.props?.attributeName || ""];
        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
          if (lineItem.count < minimoAttribute) {
            changes.push({
              lineItemId: lineItem.lineItemId,
              quantity: minimoAttribute
            });
          }
        }
      });
      const res = await cartApi.addMinimumQuantityToCart(cart, changes);
      const response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(res)
      };
      return response;
    }
    return originalResult;
  };
};

export {
  addToCart,
  updateLineItem
};
