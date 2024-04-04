import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Cart, LineItem } from '../../../shared/types';
import { extractDependency, getCartApi } from '../utils';
import { Configuration } from '../../types';
import { AddToCartBody } from '../types';
import parseRequestBody from '../../../utils/parseRequestBody';
import { CartMapper } from '../mappers/CartMapper';
import { fetchCartIdFromSession } from '../../../utils/request';
import { Cart as CommercetoolsCart } from '@commercetools/platform-sdk';

export const getCart = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart: Cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency('CartApi', config);
      if (!CartApi) {
        const response: Response = {
          statusCode: 401,
          body: JSON.stringify('Dependencies not provided: CartApi'),
        };

        return response;
      }

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
      const commercetoolsCart: CommercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);

      cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);

      const response: Response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(cart),
      };
      return response;
    }
    return originalResult;
  };
};

export const addToCart = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    const body = parseRequestBody<AddToCartBody>(request.body);

    if (!body) {
      return originalResult;
    }

    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart: Cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency('CartApi', config);
      if (!CartApi) {
        const response: Response = {
          statusCode: 401,
          body: JSON.stringify('Dependencies not provided: CartApi'),
        };

        return response;
      }

      if (!config?.props.lineItem.customTypeKey || !config?.props.lineItem.parentIdCustomFieldKey) {
        return originalResult;
      }

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);

      if (body.configurableComponents?.length) {
        const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);

        const response: Response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart),
        };
        return response;
      }
    }
    return originalResult;
  };
};

export const addComponentsToCart = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const body = parseRequestBody<AddToCartBody>(request.body);

    const CartApi = extractDependency('CartApi', config);
    if (!CartApi) {
      const response: Response = {
        statusCode: 401,
        body: JSON.stringify('Dependencies not provided: CartApi'),
      };

      return response;
    }

    if (!config?.props.lineItem.customTypeKey || !config?.props.lineItem.parentIdCustomFieldKey) {
      const response: Response = {
        statusCode: 401,
        body: JSON.stringify('Config not provided: lineItem.customTypeKey or lineItem.parentIdCustomFieldKey'),
      };

      return response;
    }

    const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
    const cartId = fetchCartIdFromSession(request);

    let commercetoolsCart: CommercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);
    if (commercetoolsCart) {
      const lineItemId = findNewLineItem(commercetoolsCart, body);
      if (lineItemId && body?.configurableComponents?.length) {
        let cart = await cartApi.addLinkedLineitemsToCart(
          commercetoolsCart.id,
          commercetoolsCart.version,
          lineItemId,
          body.configurableComponents,
        );
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);

        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);

        const response: Response = {
          statusCode: 200,
          body: JSON.stringify(cart),
          sessionData: request.sessionData,
        };
        return response;
      }
    }

    const response: Response = {
      statusCode: 503,
      body: JSON.stringify({
        statusCode: 503,
        message: 'Error in addComponentsToCart',
      }),
      sessionData: request.sessionData,
    };
    return response;
  };
};
export const removeLineItem = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    const body = parseRequestBody<{
      lineItem?: { id?: string };
    }>(request.body);

    if (!body) {
      return originalResult;
    }

    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart: Cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency('CartApi', config);
      if (!CartApi) {
        const response: Response = {
          statusCode: 401,
          body: JSON.stringify('Dependencies not provided: CartApi'),
        };

        return response;
      }

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);

      cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);

      const lineItemId = body.lineItem?.id;

      if (lineItemId) {
        cart = await cartApi.removeLinkedLineitemsFromCart(cart, lineItemId);
        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);

        const response: Response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart),
        };
        return response;
      }
    }
    return originalResult;
  };
};
export const updateLineItem = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    const body = parseRequestBody<{ lineItem?: { id?: string; count: number } }>(request.body);

    if (!body) {
      return originalResult;
    }

    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart: Cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency('CartApi', config);
      if (!CartApi) {
        const response: Response = {
          statusCode: 401,
          body: JSON.stringify('Dependencies not provided: CartApi'),
        };

        return response;
      }

      const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
      let commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);

      cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);

      if (body.lineItem) {
        cart = await cartApi.updateLinkedLineitemsInCart(cart, body.lineItem);
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);

        cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);

        const response: Response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart),
        };
        return response;
      }
    }
    return originalResult;
  };
};

const findNewLineItem = (cart: CommercetoolsCart, body: AddToCartBody | null) => {
  return cart.lineItems.find((item) =>
    body?.lineItems.find((bodyItem: LineItem) => item.variant.sku === bodyItem.variant?.sku),
  )?.id;
};
