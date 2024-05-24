import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';
import { getCurrency, getLocale, getStoreKey, getSuperuserFromSession } from '../../../utils/request';
import { BusinessUnit } from '../../../shared/businessUnit';
import { getCartApi } from '../../../shared/utils/apiConstructors/getCartApi';
import { Cart } from '@commercetools/frontend-domain-types/cart';

export const login = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);

    if (originalResult.statusCode === 200 && originalResult?.body) {
      const BusinessUnitApi = extractDependency('BusinessUnitApi', config);
      if (!BusinessUnitApi) {
        const response: Response = {
          statusCode: 401,
          body: JSON.stringify('Dependencies not provided: BusinessUnitApi'),
        };

        return response;
      }

      const businessUnitApi = new BusinessUnitApi(
        actionContext.frontasticContext!,
        getLocale(request),
        getCurrency(request),
      );
      const businessUnit: BusinessUnit = await businessUnitApi.getByKeyForAccount(
        originalResult.sessionData.businessUnitKey,
        originalResult.sessionData.account.accountId,
      );

      if (businessUnit?.associates && !getSuperuserFromSession(request)) {
        const isSuperuser = businessUnit.associates.some(
          (associate) =>
            associate.roles?.some((role) => role.key === config?.props?.superuserRoleKey) &&
            associate.accountId === originalResult.sessionData.account.accountId,
        );
        const response: Response = {
          ...originalResult,
          sessionData: {
            ...originalResult.sessionData,
            superuser: isSuperuser,
          },
        };
        return response;
      }
      return originalResult;
    }
    return originalResult;
  };
};

export const getSuperuser = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    if (!getSuperuserFromSession(request)) {
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify({
          isSuperuser: false,
        }),
        sessionData: {
          ...request.sessionData,
        },
      };
      return response;
    }

    const cartApi = getCartApi(request, actionContext.frontasticContext!, config, extractDependency);
    const storeKey = getStoreKey(request);

    const carts = (await cartApi.getAllSuperuserCartsInStore(storeKey)) as Cart[];
    const response: Response = {
      statusCode: 200,
      body: JSON.stringify({
        isSuperuser: true,
        carts,
      }),
      sessionData: {
        ...request.sessionData,
      },
    };
    return response;
  };
};

export const logout = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const originalResult = await originalCb(request, actionContext);
    return {
      ...originalResult,
      sessionData: {
        ...originalResult.sessionData,
        superuser: undefined,
      },
    };
  };
};
