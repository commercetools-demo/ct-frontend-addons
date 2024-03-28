"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _chunkX6AMZYKQcjs = require('./chunk-X6AMZYKQ.cjs');




var _chunk434NYINVcjs = require('./chunk-434NYINV.cjs');


var _chunkL4KGVOI2cjs = require('./chunk-L4KGVOI2.cjs');

// src/superuser/extensions/index.ts
var superuser = {
  actions: [
    {
      action: "login",
      actionNamespace: "account",
      hook: _chunkX6AMZYKQcjs.loginHookWithCSRCheck
    },
    {
      action: "logout",
      actionNamespace: "account",
      hook: _chunkX6AMZYKQcjs.logoutWithCSRCheck
    },
    {
      action: "loginCSR",
      actionNamespace: "account",
      hook: _chunkX6AMZYKQcjs.loginCSR,
      create: true
    },
    {
      action: "checkout",
      actionNamespace: "cart",
      hook: _chunk434NYINVcjs.checkoutWithCSR
    },
    {
      action: "getOrders",
      actionNamespace: "cart",
      hook: _chunk434NYINVcjs.getOrders
    },
    {
      action: "changePrice",
      actionNamespace: "cart",
      hook: _chunk434NYINVcjs.changePrice,
      create: true
    }
  ],
  dataSources: _chunkL4KGVOI2cjs.dataSources_default
};
var extensions_default = superuser;



exports.extensions_default = extensions_default;
