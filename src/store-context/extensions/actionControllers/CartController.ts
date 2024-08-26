import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { StoreContext } from '../../types/StoreContext';
import { extractDependency } from '../utils';
import {
  fetchAccountFromSession,
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getSupplyChannelId,
} from '../../../utils/request';
import { CartFetcher } from '../../../shared/utils/CartFetcher';

export const checkout = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      if (request.sessionData?.account !== undefined) {
        const storeContext: StoreContext = {
          storeId: request.sessionData.account.storeId,
          storeKey: request.sessionData.account.storeKey,
          distributionChannelId: request.sessionData.account.distributionChannelId,
          supplyChannelId: request.sessionData.account.supplyChannelId,
          storeName: request.sessionData.account.storeName,
        };

        const AccountApi = extractDependency('AccountApi', config);
        const accountAPi = new AccountApi(
          actionContext.frontasticContext,
          getLocale(request),
          getCurrency(request),
          request,
        );
        await accountAPi.persistStore(request.sessionData?.account, storeContext);
      }
    }
    return originalResult;
  };
};

export const assignToStore = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const body: { storeId: string } = JSON.parse(request.body);

      const StoreApi = extractDependency('StoreApi', config);
      const storeApi = new StoreApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);

      const stores = await storeApi.query(`id="${body.storeId}"`);

      if (stores.length !== 1) {
        throw new Error(`Could not find store with id ${body.storeId}`);
      }

      const selectedStoreContext: StoreContext = {
        distributionChannelId: stores[0].distributionChannels[0].channelId,
        supplyChannelId: stores[0].supplyChannels[0].channelId,
        storeKey: stores[0].key,
        storeId: stores[0].storeId,
        storeName: stores[0].name,
      };

      const AccountApi = extractDependency('AccountApi', config);
      const accountApi = new AccountApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );
      const account = fetchAccountFromSession(request);

      const CartApi = extractDependency('CartApi', config);
      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
      const storeCart = await CartFetcher.fetchCart(cartApi, request, actionContext, {
        storeKey: selectedStoreContext.storeKey,
      });

      if (account) {
        const result = await accountApi.assignToStore(account, selectedStoreContext);

        const response: Response = {
          statusCode: 200,
          body: JSON.stringify(storeCart),
          sessionData: {
            ...request.sessionData,
            ...selectedStoreContext,
            ...(storeCart && { cartId: storeCart.cartId }),
            account: result,
          },
        };

        return response;
      }

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(storeCart),
        sessionData: {
          ...request.sessionData,
          ...(storeCart && { cartId: storeCart.cartId }),
          ...selectedStoreContext,
        },
      };

      return response;
    } catch (error) {
      return {
        statusCode: 500,
      } as Response;
    }
  };
};

export const addToCart = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const CartApi = extractDependency('CartApi', config);
    const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);

    const body: {
      variant?: { sku?: string; count: number };
    } = JSON.parse(request.body);

    const lineItem: LineItem = {
      variant: {
        sku: body.variant?.sku || undefined,
        price: undefined,
      },
      count: +body.variant?.count || 1,
    };

    let cart = await CartFetcher.fetchCart(cartApi, request, actionContext);
    const distributionChannelId = getDistributionChannelId(request);
    const supplyChannelId = getSupplyChannelId(request);
    cart = await cartApi.addToCart(cart, lineItem, distributionChannelId, supplyChannelId);

    const cartId = cart.cartId;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(cart),
      sessionData: {
        ...cartApi.getSessionData(),
        cartId,
      },
    };

    return response;
  };
};

export const getCart = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      if (request.sessionData.storeKey) {
        const CartApi = extractDependency('CartApi', config);
        const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
        const storeCart = await CartFetcher.fetchCart(cartApi, request, actionContext, {
          storeKey: request.sessionData.storeKey,
        });
        return {
          statusCode: 200,
          body: storeCart ? JSON.stringify(storeCart) : '',
          sessionData: {
            ...request.sessionData,
            ...(storeCart && { cartId: storeCart.cartId }),
          },
        };
      }
    }

    return originalResult;
  };
};
