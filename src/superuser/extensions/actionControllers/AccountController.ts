import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { Account, AccountLoginBody } from '../../../shared/types';
import { getCurrency, getLocale } from '../../../utils/request';
import { extractDependency } from '../utils';

async function loginCSRAccount(
  request: Request,
  actionContext: ActionContext,
  account: Account,
  impersonatedCustomerEmail?: string,
  config?: Configuration,
): Promise<Response> {
  const AccountApi = extractDependency('AccountApi', config?.dependencies);
  if (!AccountApi) {
    const response: Response = {
      statusCode: 401,
      body: JSON.stringify('Dependencies not provided: AccountApi'),
    };

    return response;
  }

  if (!impersonatedCustomerEmail) {
    const response: Response = {
      statusCode: 401,
      body: JSON.stringify('Impersonated customer email is required'),
      sessionData: {
        ...request.sessionData,
        account: undefined,
        superUser: undefined,
      },
    };

    return response;
  }
  const accountApi = new AccountApi(actionContext.frontasticContext, getLocale(request), getCurrency(request));

  let superUserAccount: Account;
  let impersonatedAccount: Account = {} as Account;
  try {
    superUserAccount = await accountApi.login(account, undefined);
    impersonatedAccount = await accountApi.getCustomerByEmail(impersonatedCustomerEmail);
  } catch (error: any) {
    if (error.code === 'account_authentication_error') {
      const response: Response = {
        statusCode: 401,
        body: JSON.stringify(error.message),
        sessionData: {
          ...request.sessionData,
          account: undefined,
          superUser: undefined,
        },
      };

      return response;
    }

    throw error;
  }
  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(account),
    sessionData: {
      ...request.sessionData,
      account: impersonatedAccount,
      superUser: {
        email: superUserAccount.email,
        firstName: superUserAccount.firstName,
        lastName: superUserAccount.lastName,
      },
    },
  };

  return response;
}

export const loginCSR = (config?: Configuration) => {
  return async (request: Request, actionContext: ActionContext) => {
    if (request.body) {
      const accountLoginBody: AccountLoginBody = JSON.parse(request.body);

      const account = {
        email: accountLoginBody.email,
        password: accountLoginBody.password,
      };

      return await loginCSRAccount(request, actionContext, account, accountLoginBody.impersonatedCustomerEmail, config);
    }
  };
};

export const getSuperuser = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const response: Response = {
      statusCode: 200,
      body: JSON.stringify({
        isSuperuser: false,
        superUser: request.sessionData?.superUser,
      }),
      sessionData: {
        ...request.sessionData,
      },
    };
    return response;
  };
};

export const loginHookWithCSRCheck = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const account = JSON.parse(originalResult.body);

      const AccountApi = extractDependency('AccountApi', config?.dependencies);
      const accountApi = new AccountApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
      );

      const customerAccount = await accountApi.getCustomerByEmail(account.email);

      if (customerAccount.customerGroupId && customerAccount.customerGroupId === config?.props.csrCustomerGroupId) {
        const response: Response = {
          statusCode: 300,
          body: JSON.stringify('CSR'),
          sessionData: {
            ...request.sessionData,
            account: undefined,
            superUser: undefined,
          },
        };
        return response;
      }
    }
    return originalResult;
  };
};

export const logoutWithCSRCheck = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200) {
      return {
        statusCode: 200,
        body: originalResult.body,
        sessionData: {
          ...originalResult.sessionData,
          superUser: undefined,
        },
      } as Response;
    }
    return originalResult;
  };
};
