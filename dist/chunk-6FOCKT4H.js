import {
  extensions_default as extensions_default3
} from "./chunk-UV6WTXFB.js";
import {
  extensions_default as extensions_default2
} from "./chunk-C3I3LBKA.js";
import {
  mergeExtensions
} from "./chunk-LMX5WSAA.js";
import {
  extensions_default
} from "./chunk-AO3YWNPT.js";

// src/extensions.ts
var injectExtensionsRegistry = (extensionRegirstry, configuration) => {
  if (!configuration) {
    return extensionRegirstry;
  }
  Object.keys(configuration.modules || {}).forEach((mod) => {
    switch (mod) {
      case "minimum-quantity" /* MinimumQuantity */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default,
          configuration.modules["minimum-quantity" /* MinimumQuantity */]
        );
        break;
      case "superuser" /* Superuser */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default2,
          configuration.modules["superuser" /* Superuser */]
        );
        break;
      case "b2b-subscription" /* B2BSubscription */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default3,
          configuration.modules["b2b-subscription" /* B2BSubscription */]
        );
        break;
      default:
        break;
    }
  });
  return extensionRegirstry;
};

export {
  injectExtensionsRegistry
};
