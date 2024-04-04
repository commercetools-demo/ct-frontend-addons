import {
  extractDependency
} from "./chunk-C6AX467J.js";
import {
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getPath,
  getStoreId,
  getStoreKey,
  getSupplyChannelId
} from "./chunk-YZV7KPZP.js";

// src/configurable-products/extensions/utils/product-router.ts
var _ProductRouter = class _ProductRouter {
};
_ProductRouter.getBundles = async (request, frontasticContext, product, config) => {
  const urlMatches = getPath(request)?.match(config.props.product.productDetailsPageRegex);
  const ProductApi = extractDependency("ProductApi", config);
  if (!ProductApi) {
    throw new Error("ProductApi not found");
  }
  const productIds = [];
  if (urlMatches) {
    const variants = product.variants;
    if (variants.length) {
      variants.forEach((variant) => {
        const attribute = config.props.product.attributeName;
        productIds.push(..._ProductRouter.getProductIdsFromReferencedAttribute(attribute, variant));
      });
      const uniqueIds = productIds.filter((item, index, self) => self.indexOf(item) === index);
      if (uniqueIds.length) {
        const productApi = new ProductApi(frontasticContext, getLocale(request), getCurrency(request), request);
        const products = await productApi.query({
          productIds: uniqueIds,
          storeKey: getStoreKey(request),
          storeId: getStoreId(request),
          distributionChannelId: getDistributionChannelId(request),
          supplyChannelId: getSupplyChannelId(request)
        }).then((result) => result.items);
        return products;
      }
    }
  }
  return [];
};
_ProductRouter.getProductIdsFromReferencedAttribute = (attributeName, variant) => {
  const attributeValue = variant.attributes?.[attributeName];
  if (attributeValue && Array.isArray(attributeValue)) {
    return attributeValue?.map((item) => item.id);
  } else if (attributeValue) {
    return [attributeValue.id];
  }
  return [];
};
var ProductRouter = _ProductRouter;

export {
  ProductRouter
};
