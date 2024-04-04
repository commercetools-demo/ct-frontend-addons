"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkIACJ7GCDcjs = require('./chunk-IACJ7GCD.cjs');


var _chunkCWZN6BE5cjs = require('./chunk-CWZN6BE5.cjs');


var _chunkL666PFWZcjs = require('./chunk-L666PFWZ.cjs');


var _chunkCT4ICSD6cjs = require('./chunk-CT4ICSD6.cjs');

// src/extensions.ts
var injectExtensionsRegistry = (extensionRegirstry, configuration) => {
  if (!configuration) {
    return extensionRegirstry;
  }
  Object.keys(configuration.modules || {}).forEach((mod) => {
    switch (mod) {
      case "minimum-quantity" /* MinimumQuantity */:
        extensionRegirstry = _chunkL666PFWZcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunkIACJ7GCDcjs.extensions_default,
          configuration.modules["minimum-quantity" /* MinimumQuantity */]
        );
        break;
      case "superuser" /* Superuser */:
        extensionRegirstry = _chunkL666PFWZcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunkCWZN6BE5cjs.extensions_default,
          configuration.modules["superuser" /* Superuser */]
        );
        break;
      case "configurable-products" /* ConfigurableProducts */:
        extensionRegirstry = _chunkL666PFWZcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunkCT4ICSD6cjs.extensions_default,
          configuration.modules["configurable-products" /* ConfigurableProducts */]
        );
        break;
      default:
        break;
    }
  });
  return extensionRegirstry;
};



exports.injectExtensionsRegistry = injectExtensionsRegistry;
