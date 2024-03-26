"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkAUYI3KIBcjs = require('./chunk-AUYI3KIB.cjs');


var _chunkQSILZYPPcjs = require('./chunk-QSILZYPP.cjs');

// src/subscription/extensions/index.ts
var subscription = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: _chunkAUYI3KIBcjs.addToCart,
      create: true
    },
    {
      action: "getAllSubscriptions",
      actionNamespace: "subscription",
      hook: _chunkQSILZYPPcjs.getAllSubscriptions,
      create: true
    }
  ]
};
var extensions_default = subscription;



exports.extensions_default = extensions_default;
