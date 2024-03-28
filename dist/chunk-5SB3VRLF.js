import {
  ProductRouter
} from "./chunk-2T4GDJP6.js";

// src/subscription/extensions/dynamic-page-handlers/index.ts
var injectProductDetailPageHandler = (request, context, originalResult, config) => {
  const product = originalResult.dataSourcePayload.product;
  return ProductRouter.getBundles(request, context.frontasticContext, product, config).then(
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

export {
  injectProductDetailPageHandler
};
