"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkHBG5WUTHcjs = require('./chunk-HBG5WUTH.cjs');



var _chunk7BO3LFEBcjs = require('./chunk-7BO3LFEB.cjs');

// src/superuser/extensions/actionControllers/AccountController.ts
async function loginCSRAccount(request, actionContext, account, impersonatedCustomerEmail, config) {
  const AccountApi = _chunkHBG5WUTHcjs.extractDependency.call(void 0, "AccountApi", _optionalChain([config, 'optionalAccess', _ => _.dependencies]));
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
  const accountApi = new AccountApi(actionContext.frontasticContext, _chunk7BO3LFEBcjs.getLocale.call(void 0, request), _chunk7BO3LFEBcjs.getCurrency.call(void 0, request), request);
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
    if (originalResult.statusCode === 200 && _optionalChain([originalResult, 'optionalAccess', _2 => _2.body])) {
      const account = JSON.parse(originalResult.body);
      if (account.customerGroupId && account.customerGroupId === _optionalChain([config, 'optionalAccess', _3 => _3.props, 'access', _4 => _4.csrCustomerGroupId])) {
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





exports.loginCSR = loginCSR; exports.loginHookWithCSRCheck = loginHookWithCSRCheck; exports.logoutWithCSRCheck = logoutWithCSRCheck;
