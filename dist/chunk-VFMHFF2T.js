import {
  extractDependency
} from "./chunk-HF434PTE.js";
import {
  getCurrency,
  getLocale,
  getPath
} from "./chunk-OUNJUZFQ.js";

// src/subscription/extensions/utils/product-router.ts
var _ProductRouter = class _ProductRouter {
};
_ProductRouter.getBundles = async (request, frontasticContext, product, config) => {
  const urlMatches = getPath(request)?.match(config.props.product.productDetailsPageRegex);
  const ProductApi = extractDependency("ProductApi", config);
  if (!ProductApi) {
    throw new Error("ProductApi not found");
  }
  const referencedProductsMapping = [
    { name: "subscriptions", key: config.props.product.attributeNameOnParentProduct, productIds: [] }
  ];
  if (urlMatches) {
    const variants = product.variants;
    if (variants.length) {
      variants.forEach((variant) => {
        referencedProductsMapping.forEach((referenceProductMap) => {
          const attributes = frontasticContext?.projectConfiguration?.[referenceProductMap.key]?.split(",");
          if (attributes?.length) {
            const attributeKeys = Object.keys(variant.attributes || {}).filter(
              (attributeKey) => attributes.includes(attributeKey)
            );
            referenceProductMap.productIds = _ProductRouter.getProductIdsFromReferencedAttributes(attributeKeys, variant);
          }
        });
      });
      const allProductIds = referencedProductsMapping.reduce((prev, current) => {
        prev = prev.concat(current.productIds);
        return prev;
      }, []).filter((item, index, self) => self.indexOf(item) === index);
      if (allProductIds.length) {
        const productApi = new ProductApi(frontasticContext, getLocale(request), getCurrency(request));
        const products = await productApi.query({ productIds: allProductIds }).then((result) => result.items);
        if (products.length) {
          return referencedProductsMapping.reduce((prev, current) => {
            prev[current.name] = products.filter((product2) => current.productIds.includes(product2.productId));
            return prev;
          }, {});
        }
      }
    }
  }
  return {};
};
_ProductRouter.getProductIdsFromReferencedAttributes = (attributeNames, variant) => {
  return attributeNames.reduce((prev, attributeKey) => {
    const attributeValue = variant.attributes?.[attributeKey];
    if (attributeValue && Array.isArray(attributeValue)) {
      prev = prev.concat(attributeValue?.map((item) => item.id));
    } else if (attributeValue) {
      prev.push(attributeValue.id);
    }
    return prev;
  }, []);
};
var ProductRouter = _ProductRouter;

export {
  ProductRouter
};
