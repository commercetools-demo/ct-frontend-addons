import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';
import { getCurrency, getLocale } from '../../../utils/request';
import { Cart } from '../../../shared/types';
import { ProductQuery } from '@commercetools/frontend-domain-types/query';


export const getProduct = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config?.dependencies);
      const productApi = new ProductApi(actionContext, getLocale(request), getCurrency(request));
  
      let productQuery: ProductQuery = {};
  
      if ('id' in request.query) {
        productQuery = {
          productIds: [request.query['id']],
        };
      }
  
      if ('sku' in request.query) {
        productQuery = {
          skus: [request.query['sku']],
        };
      }
  
      const product = await productApi.getProduct(productQuery);
  
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(product),
        sessionData: {
          ...productApi.getSessionData(),
        },
      };
  
      return response;
    } catch (error) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error),
      };
      return response;
    }
  }
}
export const query = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config?.dependencies);
      const productApi = new ProductApi(actionContext, getLocale(request), getCurrency(request));
  
      const productQuery = ProductQueryFactory.queryFromParams(request);
  
      const queryResult = await productApi.query(productQuery);
  
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(queryResult),
        sessionData: {
          ...productApi.getSessionData(),
        },
      };
  
      return response;
    } catch (error) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error),
      };
      return response;    }
  }
}


export const : ActionHook = async (request: Request, actionContext: ActionContext) => {
 
};

export const queryCategories: ActionHook = async (request: Request, actionContext: ActionContext) => {
  try {
    const productApi = getProductApi(request, actionContext);

    const categoryQuery: CategoryQuery = {
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
      slug: request.query?.slug ?? undefined,
      parentId: request.query?.parentId ?? undefined,
      format: request.query?.format ?? CategoryQueryFormat.FLAT,
    };

    const queryResult = await productApi.queryCategories(categoryQuery);
    queryResult.items = queryResult.items.filter((category) => {
      return (
        !category.customerGroupId ||
        category.customerGroupId.length === 0 ||
        category.customerGroupId.includes(request.sessionData.account?.customerGroupId)
      );
    });

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(queryResult),
      sessionData: {
        ...productApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};
export const addToCart = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      const cart: Cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency('CartApi', config?.dependencies);
      if (!CartApi) {
        const response: Response = {
          statusCode: 401,
          body: JSON.stringify('Dependencies not provided: CartApi'),
        };

        return response;
      }

      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);

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
