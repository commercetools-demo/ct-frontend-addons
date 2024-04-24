import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';

// overriding the original login
export const login = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      // add your code here
      // sample getting cartApi
      const CartApi = extractDependency('CartApi', config);
      // rest of your code
      const response: Response = {
        ...originalResult,
        sessionData: {
          ...originalResult.sessionData,
          foo: 'bar'
        },
      };
    }
    return originalResult;
  };
};

export const aNewAction = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    // add your code here
    const response: Response = {
      statusCode: 200,
      body: JSON.stringify({
        // sample response
      }),
      sessionData: {
        ...request.sessionData,
      },
    };
    return response;
  };
};
