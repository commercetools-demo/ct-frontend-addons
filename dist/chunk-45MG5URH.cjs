"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkZNFG4SG5cjs = require('./chunk-ZNFG4SG5.cjs');

// src/minimum-quantity/extensions/index.ts
var minimumQuantity = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: _chunkZNFG4SG5cjs.addToCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: _chunkZNFG4SG5cjs.updateLineItem
    }
  ]
};
var extensions_default = minimumQuantity;



exports.extensions_default = extensions_default;
