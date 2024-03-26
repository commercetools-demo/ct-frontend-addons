"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkEFK6P2GDcjs = require('./chunk-EFK6P2GD.cjs');


var _chunk3ZKYW53Kcjs = require('./chunk-3ZKYW53K.cjs');







var _chunkTLTXMAELcjs = require('./chunk-TLTXMAEL.cjs');

// src/subscription/extensions/actionControllers/CartController.ts
var getCartApi = (request, actionContext, CartApi) => {
  const account = _chunkTLTXMAELcjs.fetchAccountFromSession.call(void 0, request);
  const businessUnitKey = _chunkTLTXMAELcjs.getBusinessUnitKey.call(void 0, request);
  const distributionChannelId = _chunkTLTXMAELcjs.getDistributionChannelId.call(void 0, request);
  const supplyChannelId = _chunkTLTXMAELcjs.getSupplyChannelId.call(void 0, request);
  return new CartApi(
    actionContext,
    _chunkTLTXMAELcjs.getLocale.call(void 0, request),
    _chunkTLTXMAELcjs.getCurrency.call(void 0, request),
    _optionalChain([account, 'optionalAccess', _ => _.accountId]),
    businessUnitKey,
    distributionChannelId,
    supplyChannelId
  );
};
var addToCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const CartApi = _chunkEFK6P2GDcjs.extractDependency.call(void 0, "CartApi", config);
    if (!CartApi) {
      const response = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response;
    }
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _2 => _2.body]) && request.body) {
      const body = JSON.parse(request.body);
      let cart = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _3 => _3.body]));
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      cart = await _chunk3ZKYW53Kcjs.handleSubscriptionsOnAddToCart.call(void 0, 
        cart,
        body,
        cartApi,
        config.props.lineItemCustomType.customTypeKey,
        config.props.lineItemCustomType.parentLineItemCustomFieldKey,
        config.props.lineItemCustomType.isSubscriptionCustomFieldKey
      );
      const response = {
        statusCode: 200,
        body: JSON.stringify(cart)
      };
      return response;
    }
    return originalResult;
  };
};
var checkout = (originalCb, config) => {
  return async (request, actionContext) => {
    const CartApi = _chunkEFK6P2GDcjs.extractDependency.call(void 0, "CartApi", config);
    const SubscriptionApi = _chunkEFK6P2GDcjs.extractDependency.call(void 0, "SubscriptionApi", config);
    const CartMapper = _chunkEFK6P2GDcjs.extractDependency.call(void 0, "CartMapper", config);
    if (!CartApi) {
      const response = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response;
    }
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _4 => _4.body])) {
      const order = JSON.parse(_optionalChain([originalResult, 'optionalAccess', _5 => _5.body]));
      const subscriptionApi = new SubscriptionApi(
        actionContext.frontasticContext,
        _chunkTLTXMAELcjs.getLocale.call(void 0, request),
        _chunkTLTXMAELcjs.getCurrency.call(void 0, request),
        request
      );
      const commercetoolsCart = await CartApi.getById(order.cartId);
      const cart = CartMapper.commercetoolsCartToCart(commercetoolsCart);
      await subscriptionApi.handleSubscriptionsOnOrder(cart, order);
      const response = {
        statusCode: 200,
        body: JSON.stringify(order)
      };
      return response;
    }
    return originalResult;
  };
};




exports.addToCart = addToCart; exports.checkout = checkout;
