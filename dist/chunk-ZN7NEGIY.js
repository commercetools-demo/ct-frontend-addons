import {
  dataSources_default
} from "./chunk-KURTXYBW.js";
import {
  loginCSR,
  loginHookWithCSRCheck,
  logoutWithCSRCheck
} from "./chunk-2GUZOZUR.js";
import {
  changePrice,
  checkoutWithCSR,
  getOrders
} from "./chunk-E3JU25SU.js";

// src/superuser/extensions/index.ts
var superuser = {
  actions: [
    {
      action: "login",
      actionNamespace: "account",
      hook: loginHookWithCSRCheck
    },
    {
      action: "logout",
      actionNamespace: "account",
      hook: logoutWithCSRCheck
    },
    {
      action: "loginCSR",
      actionNamespace: "account",
      hook: loginCSR,
      create: true
    },
    {
      action: "checkout",
      actionNamespace: "cart",
      hook: checkoutWithCSR
    },
    {
      action: "getOrders",
      actionNamespace: "cart",
      hook: getOrders
    },
    {
      action: "changePrice",
      actionNamespace: "cart",
      hook: changePrice,
      create: true
    }
  ],
  dataSources: dataSources_default
};
var extensions_default = superuser;

export {
  extensions_default
};
