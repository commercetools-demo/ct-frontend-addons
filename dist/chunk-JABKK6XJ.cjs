"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkI4IN4CENcjs = require('./chunk-I4IN4CEN.cjs');



var _chunk2NVYSSW7cjs = require('./chunk-2NVYSSW7.cjs');


var _chunk5YMZ5AZAcjs = require('./chunk-5YMZ5AZA.cjs');


var _chunk7BO3LFEBcjs = require('./chunk-7BO3LFEB.cjs');

// src/configurable-products/extensions/actionControllers/CartController.ts
var getCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _ => _.body])) {
      let cart = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _2 => _2.body]));
      const CartApi = _chunk2NVYSSW7cjs.extractDependency.call(void 0, "CartApi", config);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = _chunk2NVYSSW7cjs.getCartApi.call(void 0, request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = _chunkI4IN4CENcjs.CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
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
    const body = _chunk5YMZ5AZAcjs.parseRequestBody_default.call(void 0, request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _3 => _3.body])) {
      let cart = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _4 => _4.body]));
      const CartApi = _chunk2NVYSSW7cjs.extractDependency.call(void 0, "CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      if (!_optionalChain([config, 'optionalAccess', _5 => _5.props, 'access', _6 => _6.lineItem, 'access', _7 => _7.customTypeKey]) || !_optionalChain([config, 'optionalAccess', _8 => _8.props, 'access', _9 => _9.lineItem, 'access', _10 => _10.parentIdCustomFieldKey])) {
        return originalResult;
      }
      const cartApi = _chunk2NVYSSW7cjs.getCartApi.call(void 0, request, actionContext.frontasticContext, CartApi);
      if (_optionalChain([body, 'access', _11 => _11.configurableComponents, 'optionalAccess', _12 => _12.length])) {
        const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
        cart = _chunkI4IN4CENcjs.CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
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
    const body = _chunk5YMZ5AZAcjs.parseRequestBody_default.call(void 0, request.body);
    const CartApi = _chunk2NVYSSW7cjs.extractDependency.call(void 0, "CartApi", config);
    if (!CartApi) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response2;
    }
    if (!_optionalChain([config, 'optionalAccess', _13 => _13.props, 'access', _14 => _14.lineItem, 'access', _15 => _15.customTypeKey]) || !_optionalChain([config, 'optionalAccess', _16 => _16.props, 'access', _17 => _17.lineItem, 'access', _18 => _18.parentIdCustomFieldKey])) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Config not provided: lineItem.customTypeKey or lineItem.parentIdCustomFieldKey")
      };
      return response2;
    }
    const cartApi = _chunk2NVYSSW7cjs.getCartApi.call(void 0, request, actionContext.frontasticContext, CartApi);
    const cartId = _chunk7BO3LFEBcjs.fetchCartIdFromSession.call(void 0, request);
    let commercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);
    if (commercetoolsCart) {
      const lineItemId = findNewLineItem(commercetoolsCart, body);
      if (lineItemId && _optionalChain([body, 'optionalAccess', _19 => _19.configurableComponents, 'optionalAccess', _20 => _20.length])) {
        let cart = await cartApi.addLinkedLineitemsToCart(
          commercetoolsCart.id,
          commercetoolsCart.version,
          lineItemId,
          body.configurableComponents
        );
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);
        cart = _chunkI4IN4CENcjs.CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
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
    const body = _chunk5YMZ5AZAcjs.parseRequestBody_default.call(void 0, request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _21 => _21.body])) {
      let cart = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _22 => _22.body]));
      const CartApi = _chunk2NVYSSW7cjs.extractDependency.call(void 0, "CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      const cartApi = _chunk2NVYSSW7cjs.getCartApi.call(void 0, request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = _chunkI4IN4CENcjs.CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
      const lineItemId = _optionalChain([body, 'access', _23 => _23.lineItem, 'optionalAccess', _24 => _24.id]);
      if (lineItemId) {
        cart = await cartApi.removeLinkedLineitemsFromCart(cart, lineItemId);
        cart = _chunkI4IN4CENcjs.CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
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
    const body = _chunk5YMZ5AZAcjs.parseRequestBody_default.call(void 0, request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _25 => _25.body])) {
      let cart = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _26 => _26.body]));
      const CartApi = _chunk2NVYSSW7cjs.extractDependency.call(void 0, "CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      const cartApi = _chunk2NVYSSW7cjs.getCartApi.call(void 0, request, actionContext.frontasticContext, CartApi);
      let commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = _chunkI4IN4CENcjs.CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
      if (body.lineItem) {
        cart = await cartApi.updateLinkedLineitemsInCart(cart, body.lineItem);
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
        cart = _chunkI4IN4CENcjs.CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
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
  return _optionalChain([cart, 'access', _27 => _27.lineItems, 'access', _28 => _28.find, 'call', _29 => _29(
    (item) => _optionalChain([body, 'optionalAccess', _30 => _30.lineItems, 'access', _31 => _31.find, 'call', _32 => _32((bodyItem) => item.variant.sku === _optionalChain([bodyItem, 'access', _33 => _33.variant, 'optionalAccess', _34 => _34.sku]))])
  ), 'optionalAccess', _35 => _35.id]);
};







exports.getCart = getCart; exports.addToCart = addToCart; exports.addComponentsToCart = addComponentsToCart; exports.removeLineItem = removeLineItem; exports.updateLineItem = updateLineItem;
