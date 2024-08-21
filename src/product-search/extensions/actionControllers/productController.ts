import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';
import { getCurrency, getLocale, getStoreId } from '../../../utils/request';
import { ProductQuery } from '@commercetools/frontend-domain-types/query';
import { ProductQueryFactory } from '../utils/ProductQueryFactory';
import { CategoryQuery, CategoryQueryFormat } from '../../types/CategoryQuery';

export const getProduct = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config?.dependencies);
      const productApi = new ProductApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );

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
        sessionData: request.sessionData,
      };

      return response;
    } catch (error) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error),
      };
      return response;
    }
  };
};
export const query = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config?.dependencies);
      const productApi = new ProductApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );
      const productQuery = ProductQueryFactory.queryFromParams(request);
      const queryResult = await productApi.query(productQuery);
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(queryResult),
        sessionData: request.sessionData,
      };

      return response;
    } catch (error) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error),
      };
      return response;
    }
  };
};

export const queryCategories = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config?.dependencies);
      const productApi = new ProductApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );

      const categoryQuery: CategoryQuery = {
        limit: request.query?.limit ?? undefined,
        cursor: request.query?.cursor ?? undefined,
        slug: request.query?.slug ?? undefined,
        parentId: request.query?.parentId ?? undefined,
        format: request.query?.format ?? CategoryQueryFormat.FLAT,
      };

      let buckets = [];

      if (config?.props?.useStoreProducts) {
        buckets = await productApi.queryFacetCategoriesForSubtree(getStoreId(request));
      }

      const queryResult = await productApi.queryCategories(categoryQuery, buckets);

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(queryResult),
        sessionData: request.sessionData,
      };

      return response;
    } catch (error) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error),
      };
      return response;
    }
  };
};

export const searchableAttributes = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config?.dependencies);
      const productApi = new ProductApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );
      const result = await productApi.getSearchableAttributes();

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(result),
        sessionData: request.sessionData,
      };

      return response;
    } catch (error) {
      const response: Response = {
        statusCode: 500,
        body: JSON.stringify(error),
      };
      return response;
    }
  };
};
