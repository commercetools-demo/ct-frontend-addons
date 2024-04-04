import {
  addComponentsToCart,
  addToCart,
  getCart,
  removeLineItem,
  updateLineItem
} from "./chunk-KCCSW4DO.js";
import {
  injectProductDetailPageHandler
} from "./chunk-JEO5FFFM.js";

// src/configurable-products/extensions/index.ts
var configurableProducts = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: addToCart
    },
    {
      action: "addComponentsToCart",
      actionNamespace: "cart",
      hook: addComponentsToCart,
      create: true
    },
    {
      action: "getCart",
      actionNamespace: "cart",
      hook: getCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: updateLineItem
    },
    {
      action: "removeLineItem",
      actionNamespace: "cart",
      hook: removeLineItem
    }
  ],
  dynamicPageHandlers: {
    "frontastic/product-page": injectProductDetailPageHandler
  }
};
var extensions_default = configurableProducts;

export {
  extensions_default
};
