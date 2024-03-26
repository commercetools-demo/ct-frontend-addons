"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk6J3YPBMAcjs = require('./chunk-6J3YPBMA.cjs');


var _chunkKCSZ3N2Ucjs = require('./chunk-KCSZ3N2U.cjs');


var _chunk5HH4XYDBcjs = require('./chunk-5HH4XYDB.cjs');


var _chunk45MG5URHcjs = require('./chunk-45MG5URH.cjs');

// src/extensions.ts
var injectExtensionsRegistry = (extensionRegirstry, configuration) => {
  if (!configuration) {
    return extensionRegirstry;
  }
  Object.keys(configuration.modules || {}).forEach((mod) => {
    switch (mod) {
      case "minimum-quantity" /* MinimumQuantity */:
        extensionRegirstry = _chunk5HH4XYDBcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunk45MG5URHcjs.extensions_default,
          configuration.modules["minimum-quantity" /* MinimumQuantity */]
        );
        break;
      case "superuser" /* Superuser */:
        extensionRegirstry = _chunk5HH4XYDBcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunkKCSZ3N2Ucjs.extensions_default,
          configuration.modules["superuser" /* Superuser */]
        );
        break;
      case "b2b-subscription" /* B2BSubscription */:
        extensionRegirstry = _chunk5HH4XYDBcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunk6J3YPBMAcjs.extensions_default,
          configuration.modules["b2b-subscription" /* B2BSubscription */]
        );
        break;
      default:
        break;
    }
  });
  return extensionRegirstry;
};



exports.injectExtensionsRegistry = injectExtensionsRegistry;
