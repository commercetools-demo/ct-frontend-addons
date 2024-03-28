"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk3BBIWK26cjs = require('./chunk-3BBIWK26.cjs');

// src/subscription/extensions/dynamic-page-handlers/index.ts
var injectProductDetailPageHandler = (request, context, originalResult, config) => {
  const product = originalResult.dataSourcePayload.product;
  return _chunk3BBIWK26cjs.ProductRouter.getBundles(request, context.frontasticContext, product, config).then(
    ({ subscriptions }) => {
      return {
        dynamicPageType: originalResult.dynamicPageType,
        dataSourcePayload: {
          ...originalResult.dataSourcePayload,
          subscriptions
        },
        pageMatchingPayload: originalResult.pageMatchingPayload
      };
    }
  );
};



exports.injectProductDetailPageHandler = injectProductDetailPageHandler;
