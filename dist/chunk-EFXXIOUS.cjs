"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkLPBG2D3Mcjs = require('./chunk-LPBG2D3M.cjs');

// src/subscription/extensions/dynamic-page-handlers/index.ts
var injectProductDetailPageHandler = (request, context, originalResult, config) => {
  const product = originalResult.dataSourcePayload.product;
  return _chunkLPBG2D3Mcjs.ProductRouter.getBundles(request, context.frontasticContext, product, config).then(
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
