"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkEWHQ5UYYcjs = require('./chunk-EWHQ5UYY.cjs');



var _chunk7BO3LFEBcjs = require('./chunk-7BO3LFEB.cjs');

// src/minimum-quantity/extensions/actionControllers/cartController.ts
var addToCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _ => _.body])) {
      const cart = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _2 => _2.body]));
      const CartApi = _chunkEWHQ5UYYcjs.extractDependency.call(void 0, "CartApi", _optionalChain([config, 'optionalAccess', _3 => _3.dependencies]));
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = new CartApi(actionContext.frontasticContext, _chunk7BO3LFEBcjs.getLocale.call(void 0, request), _chunk7BO3LFEBcjs.getCurrency.call(void 0, request), request);
      const changes = [];
      cart.lineItems.forEach((lineItem) => {
        const minimoAttribute = _optionalChain([lineItem, 'access', _4 => _4.variant, 'optionalAccess', _5 => _5.attributes, 'optionalAccess', _6 => _6[_optionalChain([config, 'optionalAccess', _7 => _7.props, 'optionalAccess', _8 => _8.attributeName]) || ""]]);
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
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _9 => _9.body])) {
      const cart = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _10 => _10.body]));
      const CartApi = _chunkEWHQ5UYYcjs.extractDependency.call(void 0, "CartApi", _optionalChain([config, 'optionalAccess', _11 => _11.dependencies]));
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = new CartApi(actionContext.frontasticContext, _chunk7BO3LFEBcjs.getLocale.call(void 0, request), _chunk7BO3LFEBcjs.getCurrency.call(void 0, request), request);
      const changes = [];
      cart.lineItems.forEach((lineItem) => {
        const minimoAttribute = _optionalChain([lineItem, 'access', _12 => _12.variant, 'optionalAccess', _13 => _13.attributes, 'optionalAccess', _14 => _14[_optionalChain([config, 'optionalAccess', _15 => _15.props, 'optionalAccess', _16 => _16.attributeName]) || ""]]);
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




exports.addToCart = addToCart; exports.updateLineItem = updateLineItem;
