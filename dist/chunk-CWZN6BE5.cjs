"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkL4KGVOI2cjs = require('./chunk-L4KGVOI2.cjs');




var _chunkZUAYFCMPcjs = require('./chunk-ZUAYFCMP.cjs');




var _chunkN5EBOSS2cjs = require('./chunk-N5EBOSS2.cjs');

// src/superuser/extensions/index.ts
var superuser = {
  actions: [
    {
      action: "login",
      actionNamespace: "account",
      hook: _chunkZUAYFCMPcjs.loginHookWithCSRCheck
    },
    {
      action: "logout",
      actionNamespace: "account",
      hook: _chunkZUAYFCMPcjs.logoutWithCSRCheck
    },
    {
      action: "loginCSR",
      actionNamespace: "account",
      hook: _chunkZUAYFCMPcjs.loginCSR,
      create: true
    },
    {
      action: "checkout",
      actionNamespace: "cart",
      hook: _chunkN5EBOSS2cjs.checkoutWithCSR
    },
    {
      action: "getOrders",
      actionNamespace: "cart",
      hook: _chunkN5EBOSS2cjs.getOrders
    },
    {
      action: "changePrice",
      actionNamespace: "cart",
      hook: _chunkN5EBOSS2cjs.changePrice,
      create: true
    }
  ],
  dataSources: _chunkL4KGVOI2cjs.dataSources_default
};
var extensions_default = superuser;



exports.extensions_default = extensions_default;
