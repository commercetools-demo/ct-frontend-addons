"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk6OGEBVM5cjs = require('./chunk-6OGEBVM5.cjs');

// src/minimum-quantity/extensions/index.ts
var minimumQuantity = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: _chunk6OGEBVM5cjs.addToCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: _chunk6OGEBVM5cjs.updateLineItem
    }
  ]
};
var extensions_default = minimumQuantity;



exports.extensions_default = extensions_default;
