import {
  addToCart,
  updateLineItem
} from "./chunk-JFZU5ED7.js";

// src/minimum-quantity/extensions/index.ts
var minimumQuantity = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: addToCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: updateLineItem
    }
  ]
};
var extensions_default = minimumQuantity;

export {
  extensions_default
};
