"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkUZ357MHWcjs = require('./chunk-UZ357MHW.cjs');

// src/configurable-products/extensions/dynamic-page-handlers/index.ts
var injectProductDetailPageHandler = (request, context, originalResult, config) => {
  const product = originalResult.dataSourcePayload.product;
  return _chunkUZ357MHWcjs.ProductRouter.getBundles(request, context.frontasticContext, product, config).then(
    (configurableComponents) => {
      return {
        dynamicPageType: originalResult.dynamicPageType,
        dataSourcePayload: {
          ...originalResult.dataSourcePayload,
          configurableComponents
        },
        pageMatchingPayload: originalResult.pageMatchingPayload
      };
    }
  );
};



exports.injectProductDetailPageHandler = injectProductDetailPageHandler;
