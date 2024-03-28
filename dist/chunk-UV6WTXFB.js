import {
  addToCart
} from "./chunk-OB3S5HHL.js";
import {
  getAllSubscriptions
} from "./chunk-ZTX22PIV.js";
import {
  injectProductDetailPageHandler
} from "./chunk-WOVZKRJD.js";

// src/subscription/extensions/index.ts
var subscription = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: addToCart
    },
    {
      action: "getAllSubscriptions",
      actionNamespace: "subscription",
      hook: getAllSubscriptions,
      create: true
    }
  ],
  dynamicPageHandler: {
    "frontastic/product-page": injectProductDetailPageHandler
  }
};
var extensions_default = subscription;

export {
  extensions_default
};
