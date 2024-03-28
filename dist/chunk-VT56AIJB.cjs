"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkA4ZOZQJJcjs = require('./chunk-A4ZOZQJJ.cjs');


var _chunkM3FM44BIcjs = require('./chunk-M3FM44BI.cjs');


var _chunkYVP6EWXEcjs = require('./chunk-YVP6EWXE.cjs');

// src/subscription/extensions/index.ts
var subscription = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: _chunkA4ZOZQJJcjs.addToCart
    },
    {
      action: "getAllSubscriptions",
      actionNamespace: "subscription",
      hook: _chunkM3FM44BIcjs.getAllSubscriptions,
      create: true
    }
  ],
  dynamicPageHandler: {
    "frontastic/product-page": _chunkYVP6EWXEcjs.injectProductDetailPageHandler
  }
};
var extensions_default = subscription;



exports.extensions_default = extensions_default;
