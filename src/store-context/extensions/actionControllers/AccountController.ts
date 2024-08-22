import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';
import { getCurrency, getLocale } from '../../../utils/request';

export const login = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      const account = JSON.parse(originalResult.body);
      const response: Response = {
        statusCode: 200,
        body: originalResult.body,
        sessionData: {
          ...originalResult.sessionData,
          account: account,
          storeKey: account.storeKey,
          storeId: account.storeId,
          storeName: account.storeName,
          distributionChannelId: account.distributionChannelId,
          supplyChannelId: account.supplyChannelId,
        },
      };

      return response;
    }

    return originalResult;
  };
};

export const getAccount = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      const body = JSON.parse(originalResult.body);

      if (!body.loggedIn) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            ...body,
            distributionChannelId: request.sessionData?.distributionChannelId,
            supplyChannelId: request.sessionData?.supplyChannelId,
            storeId: request.sessionData?.storeId,
            storeKey: request.sessionData?.storeKey,
            storeName: request.sessionData?.storeName,
          }),
          sessionData: {
            ...request.sessionData,
          },
        };
      }

      const AccountApi = extractDependency('AccountApi', config);
      const accountApi = new AccountApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request,
      );
      const account = await accountApi.getAccount(body.account, body.cart);

      return {
        statusCode: 200,
        body: JSON.stringify({
          loggedIn: true,
          account,
          distributionChannelId: account.distributionChannelId,
          supplyChannelId: account.supplyChannelId,
          storeKey: account.storeKey,
          storeId: account.storeId,
          storeName: account.storeName,
          persisted: account.persisted,
        }),
        sessionData: {
          ...request.sessionData,
          account: account,
          distributionChannelId: account.distributionChannelId,
          supplyChannelId: account.supplyChannelId,
          storeKey: account.storeKey,
          storeId: account.storeId,
          storeName: account.storeName,
          persisted: account.persisted,
        },
      };
    }
    return originalResult;
  };
};
