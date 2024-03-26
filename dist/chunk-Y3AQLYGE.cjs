"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _chunkX6AMZYKQcjs = require('./chunk-X6AMZYKQ.cjs');




var _chunkWBP6GK7Zcjs = require('./chunk-WBP6GK7Z.cjs');


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
      hook: _chunkWBP6GK7Zcjs.checkoutWithCSR
    },
    {
      action: "getOrders",
      actionNamespace: "cart",
      hook: _chunkWBP6GK7Zcjs.getOrders
    },
    {
      action: "changePrice",
      actionNamespace: "cart",
      hook: _chunkWBP6GK7Zcjs.changePrice,
      create: true
    }
  ],
  dataSources: _chunkL4KGVOI2cjs.dataSources_default
};
var extensions_default = superuser;



exports.extensions_default = extensions_default;
