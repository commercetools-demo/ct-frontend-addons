"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk375EWEINcjs = require('./chunk-375EWEIN.cjs');


var _chunkY3AQLYGEcjs = require('./chunk-Y3AQLYGE.cjs');


var _chunk6TCT5IQMcjs = require('./chunk-6TCT5IQM.cjs');


var _chunkKF6OT33Dcjs = require('./chunk-KF6OT33D.cjs');

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
          _chunkKF6OT33Dcjs.extensions_default,
          configuration.modules["minimum-quantity" /* MinimumQuantity */]
        );
        break;
      case "superuser" /* Superuser */:
        extensionRegirstry = _chunk6TCT5IQMcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunkY3AQLYGEcjs.extensions_default,
          configuration.modules["superuser" /* Superuser */]
        );
        break;
      case "b2b-subscription" /* B2BSubscription */:
        extensionRegirstry = _chunk6TCT5IQMcjs.mergeExtensions.call(void 0, 
          extensionRegirstry,
          _chunk375EWEINcjs.extensions_default,
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
