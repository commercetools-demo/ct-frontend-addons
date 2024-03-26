import { ActionContext, ActionHandler, Context, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { Cart, Order } from '../../../shared/types';
import { handleSubscriptionsOnAddToCart } from '../utils/subscription';
import { LineItemVariant } from '../types';
import { extractDependency } from '../utils';
import {
  fetchAccountFromSession,
  getBusinessUnitKey,
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getSupplyChannelId,
} from '../../../utils/request';

const getCartApi = (request: Request, actionContext?: Context, CartApi?: any) => {
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
    supplyChannelId,
  );
};

export const addToCart = (originalCb: ActionHandler, config: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const CartApi = extractDependency('CartApi', config);
    if (!CartApi) {
      const response: Response = {
        statusCode: 401,
        body: JSON.stringify('Dependencies not provided: CartApi'),
      };

      return response;
    }
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body && request.body) {
      const body: {
        variant?: LineItemVariant;
        subscriptions?: Partial<LineItemVariant>[];
        configurableComponents?: Partial<LineItemVariant>[];
      } = JSON.parse(request.body);
      let cart: Cart = JSON.parse(originalResult?.body);
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      cart = await handleSubscriptionsOnAddToCart(
        cart,
        body,
        cartApi,
        config.props.lineItemCustomType.customTypeKey,
        config.props.lineItemCustomType.parentLineItemCustomFieldKey,
        config.props.lineItemCustomType.isSubscriptionCustomFieldKey,
      );
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(cart),
      };

      return response;
    }
    return originalResult;
  };
};

export const checkout = (originalCb: ActionHandler, config: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const CartApi = extractDependency('CartApi', config);
    const SubscriptionApi = extractDependency('SubscriptionApi', config);
    const CartMapper = extractDependency('CartMapper', config);
    if (!CartApi) {
      const response: Response = {
        statusCode: 401,
        body: JSON.stringify('Dependencies not provided: CartApi'),
      };

      return response;
    }
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const order: Order = JSON.parse(originalResult?.body);
      const subscriptionApi = new SubscriptionApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );

      const commercetoolsCart = await CartApi.getById(order.cartId);
      const cart = CartMapper.commercetoolsCartToCart(commercetoolsCart);
      await subscriptionApi.handleSubscriptionsOnOrder(cart, order);
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(order),
      };

      return response;
    }
    return originalResult;
  };
};
