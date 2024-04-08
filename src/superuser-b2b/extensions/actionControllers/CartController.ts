import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { getLocale, getStoreKey, getSuperuserFromSession } from '../../../utils/request';
import { extractDependency } from '../utils';
import { Cart, Order } from '@commercetools/frontend-domain-types/cart';
import { getCartApi } from '../../../shared/utils/getCartApi';
import parseRequestBody from '../../../utils/parseRequestBody';
import { Cart as CommercetoolsCart } from '@commercetools/platform-sdk';

export const getAllSuperuserCartsInStore = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    let carts: Cart[] = [];

    if (getSuperuserFromSession(request)) {
      const CartApi = extractDependency('CartApi', config);

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
      const storeKey = getStoreKey(request);

      carts = (await cartApi.getAllSuperuserCartsInStore(storeKey)) as Cart[];

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(carts),
        sessionData: {
          ...request.sessionData,
        },
      };

      return response;
    }
    const response: Response = {
      statusCode: 200,
      body: JSON.stringify([]),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  };
};
export const setCart = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    if (getSuperuserFromSession(request)) {
      const CartApi = extractDependency('CartApi', config);

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
      const id = request.query?.id;
      const body = parseRequestBody<{
        email?: string;
      }>(request.body);

      const cart = await cartApi.getByPureId(id);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      const cartId = cart.cartId;

      if (!!body?.email) {
        await cartApi.setOriginalCustomerData(
          commercetoolsCart,
          body?.email || '',
          config?.props.cart.customTypeKey,
          config?.props.cart.originalEmailFieldKey,
        );
      }

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(cart),
        sessionData: {
          ...request.sessionData,
          cartId,
        },
      };
      return response;
    }

    const response: Response = {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: 'Not a superuser',
      }),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  };
};
export const createSuperuserCart = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    if (getSuperuserFromSession(request)) {
      const CartApi = extractDependency('CartApi', config);

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
      const storeKey = getStoreKey(request);

      const cart = await cartApi.createSuperuserCart(storeKey, true);
      const cartId = cart.cartId;

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(cart),
        sessionData: {
          ...request.sessionData,
          cartId,
        },
      };
      return response;
    }

    const response: Response = {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: 'Not a superuser',
      }),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  };
};

export const checkout = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const locale = getLocale(request);

    const CartApi = extractDependency('CartApi', config);
    const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
    const cartId = request.sessionData?.cartId;

    // If the cartId or the originalEmailFieldKey is not found, return the original callback.
    if (!cartId || !config?.props.cart.originalEmailFieldKey) {
      return originalCb(request, actionContext);
    }

    const originalCart = await cartApi.getCommercetoolsCartById(cartId);
    const originalOwnerEmail = originalCart?.custom?.fields?.[config.props.cart.originalEmailFieldKey];
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      const order: Order = JSON.parse(originalResult?.body);

      const isSuperuser = getSuperuserFromSession(request);

      if (isSuperuser && order) {
        const orderId = order?.orderId;

        if (orderId) {
          await cartApi.setSuperUserEmailOnOrder(
            orderId,
            order.orderVersion,
            originalOwnerEmail,
            request.sessionData?.account?.email,
            config?.props.cart.customTypeKey,
            config?.props.cart.superuserEmailFieldKey,
          );

          // Send the order confirmation email.
          const EmailApiFactory = extractDependency('EmailApiFactory', config);

          const emailApi = EmailApiFactory.getDefaultApi(actionContext.frontasticContext, locale);

          emailApi.sendOrderConfirmationEmail({ ...order, email: originalOwnerEmail });
        }
      }
    }

    return originalResult;
  };
};

export const reassignCart = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const originalRequstBody = parseRequestBody<{
        accountId?: string;
        email?: string;
      }>(request.body);
      const cart: Cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency('CartApi', config);

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
      const commercetoolsCart: CommercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);

      if (!!originalRequstBody?.email) {
        await cartApi.setOriginalCustomerData(
          commercetoolsCart,
          originalRequstBody?.email,
          config?.props.cart.customTypeKey,
          config?.props.cart.originalEmailFieldKey,
        );
      }

      return originalResult;
    }
    return originalResult;
  };
};
