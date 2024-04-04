import {
  extensions_default
} from "./chunk-M6PWN3MM.js";
import {
  extensions_default as extensions_default2
} from "./chunk-ZN7NEGIY.js";
import {
  mergeExtensions
} from "./chunk-AO42KKQX.js";
import {
  extensions_default as extensions_default3
} from "./chunk-FP5CA4JU.js";

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
      case "configurable-products" /* ConfigurableProducts */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default3,
          configuration.modules["configurable-products" /* ConfigurableProducts */]
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
