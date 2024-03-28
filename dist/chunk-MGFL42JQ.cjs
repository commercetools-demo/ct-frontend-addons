"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkD42HV6CIcjs = require('./chunk-D42HV6CI.cjs');


var _chunkSUGJV3LQcjs = require('./chunk-SUGJV3LQ.cjs');


var _chunk6TCT5IQMcjs = require('./chunk-6TCT5IQM.cjs');


var _chunk45MG5URHcjs = require('./chunk-45MG5URH.cjs');

// src/extensions.ts
var injectExtensionsRegistry = (extensionRegirstry, configuration) => {
  if (!configuration) {
    return extensionRegirstry;
  }
  Object.keys(configuration.modules || {}).forEach((mod) => {
    switch (mod) {
      case "minimum-quantity" /* MinimumQuantity */:
        extensionRegirstry = _chunk6TCT5IQMcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunk45MG5URHcjs.extensions_default,
          configuration.modules["minimum-quantity" /* MinimumQuantity */]
        );
        break;
      case "superuser" /* Superuser */:
        extensionRegirstry = _chunk6TCT5IQMcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunkSUGJV3LQcjs.extensions_default,
          configuration.modules["superuser" /* Superuser */]
        );
        break;
      case "b2b-subscription" /* B2BSubscription */:
        extensionRegirstry = _chunk6TCT5IQMcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunkD42HV6CIcjs.extensions_default,
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
