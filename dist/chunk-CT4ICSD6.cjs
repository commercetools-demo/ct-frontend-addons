"use strict";Object.defineProperty(exports, "__esModule", {value: true});





var _chunkJABKK6XJcjs = require('./chunk-JABKK6XJ.cjs');


var _chunkKVBRJXYTcjs = require('./chunk-KVBRJXYT.cjs');

// src/configurable-products/extensions/index.ts
var configurableProducts = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: _chunkJABKK6XJcjs.addToCart
    },
    {
      action: "addComponentsToCart",
      actionNamespace: "cart",
      hook: _chunkJABKK6XJcjs.addComponentsToCart,
      create: true
    },
    {
      action: "getCart",
      actionNamespace: "cart",
      hook: _chunkJABKK6XJcjs.getCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: _chunkJABKK6XJcjs.updateLineItem
    },
    {
      action: "removeLineItem",
      actionNamespace: "cart",
      hook: _chunkJABKK6XJcjs.removeLineItem
    }
  ],
  dynamicPageHandlers: {
    "frontastic/product-page": _chunkKVBRJXYTcjs.injectProductDetailPageHandler
  }
};
var extensions_default = configurableProducts;



exports.extensions_default = extensions_default;
