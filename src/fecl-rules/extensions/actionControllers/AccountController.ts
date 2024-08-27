import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../types';
import { getCurrency, getLocale } from '../../../utils/request';
import { ExternalError } from '../../../utils/Errors';
import { extractDependency } from '../utils';

export const accountFilters = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    try {
      const AccountApi = extractDependency('AccountApi', config);
      const accountApi = new AccountApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );

      const result = await accountApi.getAccountFilters();

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(result),
        sessionData: {
          ...accountApi.getSessionData(),
        },
      };

      return response;
    } catch (error) {
      throw new ExternalError({ status: error.status, message: error.message, body: error.body });
    }
  };
};
