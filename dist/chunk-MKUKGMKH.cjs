"use strict";Object.defineProperty(exports, "__esModule", {value: true}); async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/shared/utils/CartFetcher.ts
var CartFetcher = class {
  static async fetchCart(cartApi, request, actionContext) {
    return await _asyncNullishCoalesce(await this.fetchCartFromSession(cartApi, request, actionContext), async () => ( await cartApi.getAnonymous()));
  }
  static async fetchCartFromSession(cartApi, request, actionContext) {
    if (_optionalChain([request, 'access', _ => _.sessionData, 'optionalAccess', _2 => _2.account]) !== void 0) {
      return await cartApi.getForUser(request.sessionData.account);
    }
    if (_optionalChain([request, 'access', _3 => _3.sessionData, 'optionalAccess', _4 => _4.cartId]) !== void 0) {
      try {
        return await cartApi.getActiveCartById(request.sessionData.cartId);
      } catch (error) {
        console.info(`Error fetching the cart ${request.sessionData.cartId}. ${error}`);
      }
    }
    return void 0;
  }
};



exports.CartFetcher = CartFetcher;
