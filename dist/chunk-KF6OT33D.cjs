"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkUIOZDNLScjs = require('./chunk-UIOZDNLS.cjs');

// src/minimum-quantity/extensions/index.ts
var minimumQuantity = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: _chunkUIOZDNLScjs.addToCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: _chunkUIOZDNLScjs.updateLineItem
    }
  ]
};
var extensions_default = minimumQuantity;



exports.extensions_default = extensions_default;
