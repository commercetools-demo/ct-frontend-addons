import {
  addToCart
} from "./chunk-S5MIIU3N.js";
import {
  getAllSubscriptions
} from "./chunk-GBLCEEJC.js";

// src/subscription/extensions/index.ts
var subscription = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: addToCart,
      create: true
    },
    {
      action: "getAllSubscriptions",
      actionNamespace: "subscription",
      hook: getAllSubscriptions,
      create: true
    }
  ]
};
var extensions_default = subscription;

export {
  extensions_default
};
