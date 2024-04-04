import {
  extractDependency
} from "./chunk-XJJ4GMMW.js";
import {
  getCurrency,
  getLocale
} from "./chunk-YZV7KPZP.js";

// src/superuser/extensions/actionControllers/AccountController.ts
async function loginCSRAccount(request, actionContext, account, impersonatedCustomerEmail, config) {
  const AccountApi = extractDependency("AccountApi", config?.dependencies);
  if (!AccountApi) {
    const response2 = {
      statusCode: 401,
      body: JSON.stringify("Dependencies not provided: AccountApi")
    };
    return response2;
  }
  if (!impersonatedCustomerEmail) {
    const response2 = {
      statusCode: 401,
      body: JSON.stringify("Impersonated customer email is required"),
      sessionData: {
        ...request.sessionData,
        account: void 0,
        superUser: void 0
      }
    };
    return response2;
  }
  const accountApi = new AccountApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
  let superUserAccount;
  let impersonatedAccount = {};
  try {
    superUserAccount = await accountApi.login(account, void 0);
    impersonatedAccount = await accountApi.getCustomerByEmail(impersonatedCustomerEmail);
  } catch (error) {
    if (error.code === "account_authentication_error") {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify(error.message),
        sessionData: {
          ...request.sessionData,
          account: void 0,
          superUser: void 0
        }
      };
      return response2;
    }
    throw error;
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(account),
    sessionData: {
      ...request.sessionData,
      account: impersonatedAccount,
      superUser: {
        email: superUserAccount.email,
        firstName: superUserAccount.firstName,
        lastName: superUserAccount.lastName
      }
    }
  };
  return response;
}
var loginCSR = (config) => {
  return async (request, actionContext) => {
    if (request.body) {
      const accountLoginBody = JSON.parse(request.body);
      const account = {
        email: accountLoginBody.email,
        password: accountLoginBody.password
      };
      return await loginCSRAccount(request, actionContext, account, accountLoginBody.impersonatedCustomerEmail, config);
    }
  };
};
var loginHookWithCSRCheck = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const account = JSON.parse(originalResult.body);
      if (account.customerGroupId && account.customerGroupId === config?.props.csrCustomerGroupId) {
        const response = {
          statusCode: 300,
          body: JSON.stringify("CSR"),
          sessionData: {
            ...request.sessionData,
            account: void 0,
            superUser: void 0
          }
        };
        return response;
      }
    }
    return originalResult;
  };
};
var logoutWithCSRCheck = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200) {
      return {
        statusCode: 200,
        body: originalResult.body,
        sessionData: {
          ...originalResult.sessionData,
          superUser: void 0
        }
      };
    }
    return originalResult;
  };
};

export {
  loginCSR,
  loginHookWithCSRCheck,
  logoutWithCSRCheck
};
