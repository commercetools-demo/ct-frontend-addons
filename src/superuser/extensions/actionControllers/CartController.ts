import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { Money, Order } from '../../../shared/types';
import { extractDependency } from '../utils';
import { CartFetcher } from '../../../shared/utils/CartFetcher';
import { getCartApi } from '../../../shared/utils/apiConstructors/getCartApi';

export const changePrice = (config?: Configuration) => {
  return async (request: Request, actionContext: ActionContext) => {
    if (request.body) {
      const cartApi = getCartApi(request, actionContext.frontasticContext!, config, extractDependency, false);
      const body: {
        lineItemId: string;
        price: Money;
      } = JSON.parse(request.body);

      let cart = await CartFetcher.fetchCart(cartApi, request, actionContext);

      cart = await cartApi.changeLineItemPrice(cart, body.lineItemId, body.price);
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(cart),
        sessionData: {
          ...request.sessionData,
          cartId: cart.cartId,
        },
      };

      return response;
    }
  };
};

export const checkoutWithCSR = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let order: Order = JSON.parse(originalResult.body);
      const superUserEmail = request.sessionData?.superUser?.email;

      if (order && superUserEmail) {
        const cartApi = getCartApi(request, actionContext.frontasticContext!, config, extractDependency, false);

        order = await cartApi.setSuperUserEmailOnOrder(
          order,
          superUserEmail,
          config?.props.csrCustomTypeKey,
          config?.props.csrCustomFieldKey,
        );
        const response: Response = {
          statusCode: 200,
          body: JSON.stringify(order),
          sessionData: originalResult.sessionData,
        };
        return response;
      }
    }
    return originalResult;
  };
};

export const getOrders = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const cartApi = getCartApi(request, actionContext.frontasticContext!, config, extractDependency, false);

    const account = request.sessionData?.account !== undefined ? request.sessionData.account : undefined;

    if (account === undefined) {
      const response: Response = {
        statusCode: 500,
      };
      return response;
    }

    const orders = await cartApi.getOrders(account);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(orders),
    };
    return response;
  };
};
