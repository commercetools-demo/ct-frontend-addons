import {
  extractDependency
} from "./chunk-HF434PTE.js";
import {
  handleSubscriptionsOnAddToCart
} from "./chunk-M5BHFVAK.js";
import {
  fetchAccountFromSession,
  getBusinessUnitKey,
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getSupplyChannelId
} from "./chunk-OUNJUZFQ.js";

// src/subscription/extensions/actionControllers/CartController.ts
var getCartApi = (request, actionContext, CartApi) => {
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  const distributionChannelId = getDistributionChannelId(request);
  const supplyChannelId = getSupplyChannelId(request);
  return new CartApi(
    actionContext,
    getLocale(request),
    getCurrency(request),
    account?.accountId,
    businessUnitKey,
    distributionChannelId,
    supplyChannelId
  );
};
var addToCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const CartApi = extractDependency("CartApi", config);
    if (!CartApi) {
      const response = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response;
    }
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body && request.body) {
      const body = JSON.parse(request.body);
      let cart = JSON.parse(originalResult?.body);
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      cart = await handleSubscriptionsOnAddToCart(
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
    const CartApi = extractDependency("CartApi", config);
    const SubscriptionApi = extractDependency("SubscriptionApi", config);
    const CartMapper = extractDependency("CartMapper", config);
    if (!CartApi) {
      const response = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response;
    }
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const order = JSON.parse(originalResult?.body);
      const subscriptionApi = new SubscriptionApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
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

export {
  addToCart,
  checkout
};
