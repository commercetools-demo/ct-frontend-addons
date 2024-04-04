import {
  ProductRouter
} from "./chunk-L3IIBYUZ.js";

// src/configurable-products/extensions/dynamic-page-handlers/index.ts
var injectProductDetailPageHandler = (request, context, originalResult, config) => {
  const product = originalResult.dataSourcePayload.product;
  return ProductRouter.getBundles(request, context.frontasticContext, product, config).then(
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

export {
  injectProductDetailPageHandler
};
