import {
  CartMapper
} from "./chunk-57LVUZXW.js";
import {
  extractDependency,
  getCartApi
} from "./chunk-C6AX467J.js";
import {
  parseRequestBody_default
} from "./chunk-ULFCO6PH.js";
import {
  fetchCartIdFromSession
} from "./chunk-YZV7KPZP.js";

// src/configurable-products/extensions/actionControllers/CartController.ts
var getCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
      const response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(cart)
      };
      return response;
    }
    return originalResult;
  };
};
var addToCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    const body = parseRequestBody_default(request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      if (!config?.props.lineItem.customTypeKey || !config?.props.lineItem.parentIdCustomFieldKey) {
        return originalResult;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      if (body.configurableComponents?.length) {
        const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
        const response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart)
        };
        return response;
      }
    }
    return originalResult;
  };
};
var addComponentsToCart = (config) => {
  return async (request, actionContext) => {
    const body = parseRequestBody_default(request.body);
    const CartApi = extractDependency("CartApi", config);
    if (!CartApi) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response2;
    }
    if (!config?.props.lineItem.customTypeKey || !config?.props.lineItem.parentIdCustomFieldKey) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Config not provided: lineItem.customTypeKey or lineItem.parentIdCustomFieldKey")
      };
      return response2;
    }
    const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
    const cartId = fetchCartIdFromSession(request);
    let commercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);
    if (commercetoolsCart) {
      const lineItemId = findNewLineItem(commercetoolsCart, body);
      if (lineItemId && body?.configurableComponents?.length) {
        let cart = await cartApi.addLinkedLineitemsToCart(
          commercetoolsCart.id,
          commercetoolsCart.version,
          lineItemId,
          body.configurableComponents
        );
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);
        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
        const response2 = {
          statusCode: 200,
          body: JSON.stringify(cart),
          sessionData: request.sessionData
        };
        return response2;
      }
    }
    const response = {
      statusCode: 503,
      body: JSON.stringify({
        statusCode: 503,
        message: "Error in addComponentsToCart"
      }),
      sessionData: request.sessionData
    };
    return response;
  };
};
var removeLineItem = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    const body = parseRequestBody_default(request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
      const lineItemId = body.lineItem?.id;
      if (lineItemId) {
        cart = await cartApi.removeLinkedLineitemsFromCart(cart, lineItemId);
        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
        const response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart)
        };
        return response;
      }
    }
    return originalResult;
  };
};
var updateLineItem = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    const body = parseRequestBody_default(request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      let commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
      if (body.lineItem) {
        cart = await cartApi.updateLinkedLineitemsInCart(cart, body.lineItem);
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
        const response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart)
        };
        return response;
      }
    }
    return originalResult;
  };
};
var findNewLineItem = (cart, body) => {
  return cart.lineItems.find(
    (item) => body?.lineItems.find((bodyItem) => item.variant.sku === bodyItem.variant?.sku)
  )?.id;
};

export {
  getCart,
  addToCart,
  addComponentsToCart,
  removeLineItem,
  updateLineItem
};
