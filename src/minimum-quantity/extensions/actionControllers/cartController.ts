import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';
import { Cart } from '../../../shared/types';
import { getCartApi } from '../../../shared/utils/apiConstructors/getCartApi';

export const addToCart = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      const cart: Cart = JSON.parse(originalResult?.body);

      const cartApi = getCartApi(request, actionContext.frontasticContext!, config, extractDependency, false);

      const changes: {
        lineItemId: string;
        quantity: number;
      }[] = [];

      cart.lineItems.forEach((lineItem) => {
        // Find the 'minimo' attribute within the line item's attributes.
        const minimoAttribute = lineItem.variant?.attributes?.[config?.props?.attributeName || ''];

        // Ensure the 'minimo' attribute exists and has a valid integer value.
        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
          // Check if the quantity of the line item is less than the 'minimo' value.
          if (lineItem.count < minimoAttribute) {
            // Add an action to update the quantity of the line item to the 'minimo' value.
            changes.push({
              lineItemId: lineItem.lineItemId,
              quantity: minimoAttribute,
            });
          }
        }
      });

      const res = await cartApi.addMinimumQuantityToCart(cart, changes);
      const response: Response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(res),
      };
      return response;
    }
    return originalResult;
  };
};
export const updateLineItem = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      const cart: Cart = JSON.parse(originalResult?.body);
      const cartApi = getCartApi(request, actionContext.frontasticContext!, config, extractDependency, false);

      const changes: {
        lineItemId: string;
        quantity: number;
      }[] = [];

      cart.lineItems.forEach((lineItem) => {
        // Find the 'minimo' attribute within the line item's attributes.
        const minimoAttribute = lineItem.variant?.attributes?.[config?.props?.attributeName || ''];

        // Ensure the 'minimo' attribute exists and has a valid integer value.
        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
          // Check if the quantity of the line item is less than the 'minimo' value.
          if (lineItem.count < minimoAttribute) {
            // Add an action to update the quantity of the line item to the 'minimo' value.
            changes.push({
              lineItemId: lineItem.lineItemId,
              quantity: minimoAttribute,
            });
          }
        }
      });

      const res = await cartApi.addMinimumQuantityToCart(cart, changes);
      const response: Response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(res),
      };
      return response;
    }
    return originalResult;
  };
};
