import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../types';
import { ExternalError } from '../../../utils/Errors';
import { getCurrency, getLocale } from '../../../utils/request';
import { extractDependency } from '../utils';

export const categoryFilters = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config);
      const productApi = new ProductApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );

      const result = await productApi.getCategoryFilters();

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(result),
        sessionData: {
          ...productApi.getSessionData(),
        },
      };

      return response;
    } catch (error) {
      throw new ExternalError({ status: error.status, message: error.message, body: error.body });
    }
  };
};

export const productFilters = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const ProductApi = extractDependency('ProductApi', config);
      const productApi = new ProductApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );

      const result = await productApi.getProductFilters();

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(result),
        sessionData: {
          ...productApi.getSessionData(),
        },
      };

      return response;
    } catch (error) {
      throw new ExternalError({ status: error.status, message: error.message, body: error.body });
    }
  };
};
