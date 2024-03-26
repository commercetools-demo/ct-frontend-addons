"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkMKUKGMKHcjs = require('./chunk-MKUKGMKH.cjs');


var _chunkHBG5WUTHcjs = require('./chunk-HBG5WUTH.cjs');



var _chunkTLTXMAELcjs = require('./chunk-TLTXMAEL.cjs');

// src/superuser/extensions/actionControllers/CartController.ts
var changePrice = (config) => {
  return async (request, actionContext) => {
    const CartApi = _chunkHBG5WUTHcjs.extractDependency.call(void 0, "CartApi", _optionalChain([config, 'optionalAccess', _ => _.dependencies]));
    if (!CartApi) {
      const response = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi | CartFetcher")
      };
      return response;
    }
    if (request.body) {
      const cartApi = new CartApi(actionContext.frontasticContext, _chunkTLTXMAELcjs.getLocale.call(void 0, request), _chunkTLTXMAELcjs.getCurrency.call(void 0, request), request);
      const body = JSON.parse(request.body);
      let cart = await _chunkMKUKGMKHcjs.CartFetcher.fetchCart(cartApi, request, actionContext);
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
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _2 => _2.body])) {
      let order = JSON.parse(originalResult.body);
      const superUserEmail = _optionalChain([request, 'access', _3 => _3.sessionData, 'optionalAccess', _4 => _4.superUser, 'optionalAccess', _5 => _5.email]);
      if (order && superUserEmail) {
        const CartApi = _chunkHBG5WUTHcjs.extractDependency.call(void 0, "CartApi", _optionalChain([config, 'optionalAccess', _6 => _6.dependencies]));
        if (!CartApi) {
          const response2 = {
            statusCode: 401,
            body: JSON.stringify("Dependencies not provided: CartApi")
          };
          return response2;
        }
        const cartApi = new CartApi(actionContext.frontasticContext, _chunkTLTXMAELcjs.getLocale.call(void 0, request), _chunkTLTXMAELcjs.getCurrency.call(void 0, request), request);
        order = await cartApi.setSuperUserEmailOnOrder(
          order,
          superUserEmail,
          _optionalChain([config, 'optionalAccess', _7 => _7.props, 'access', _8 => _8.csrCustomTypeKey]),
          _optionalChain([config, 'optionalAccess', _9 => _9.props, 'access', _10 => _10.csrCustomFieldKey])
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
    const CartApi = _chunkHBG5WUTHcjs.extractDependency.call(void 0, "CartApi", _optionalChain([config, 'optionalAccess', _11 => _11.dependencies]));
    if (!CartApi) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response2;
    }
    const cartApi = new CartApi(actionContext.frontasticContext, _chunkTLTXMAELcjs.getLocale.call(void 0, request), _chunkTLTXMAELcjs.getCurrency.call(void 0, request), request);
    const account = _optionalChain([request, 'access', _12 => _12.sessionData, 'optionalAccess', _13 => _13.account]) !== void 0 ? request.sessionData.account : void 0;
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





exports.changePrice = changePrice; exports.checkoutWithCSR = checkoutWithCSR; exports.getOrders = getOrders;
