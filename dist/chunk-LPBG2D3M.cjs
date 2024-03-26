"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkEFK6P2GDcjs = require('./chunk-EFK6P2GD.cjs');




var _chunkTLTXMAELcjs = require('./chunk-TLTXMAEL.cjs');

// src/subscription/extensions/utils/product-router.ts
var _ProductRouter = class _ProductRouter {
};
_ProductRouter.getBundles = async (request, frontasticContext, product, config) => {
  const urlMatches = _optionalChain([_chunkTLTXMAELcjs.getPath.call(void 0, request), 'optionalAccess', _ => _.match, 'call', _2 => _2(config.props.product.productDetailsPageRegex)]);
  const ProductApi = _chunkEFK6P2GDcjs.extractDependency.call(void 0, "ProductApi", config);
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
          const attributes = _optionalChain([frontasticContext, 'optionalAccess', _3 => _3.projectConfiguration, 'optionalAccess', _4 => _4[referenceProductMap.key], 'optionalAccess', _5 => _5.split, 'call', _6 => _6(",")]);
          if (_optionalChain([attributes, 'optionalAccess', _7 => _7.length])) {
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
        const productApi = new ProductApi(frontasticContext, _chunkTLTXMAELcjs.getLocale.call(void 0, request), _chunkTLTXMAELcjs.getCurrency.call(void 0, request));
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
    const attributeValue = _optionalChain([variant, 'access', _8 => _8.attributes, 'optionalAccess', _9 => _9[attributeKey]]);
    if (attributeValue && Array.isArray(attributeValue)) {
      prev = prev.concat(_optionalChain([attributeValue, 'optionalAccess', _10 => _10.map, 'call', _11 => _11((item) => item.id)]));
    } else if (attributeValue) {
      prev.push(attributeValue.id);
    }
    return prev;
  }, []);
};
var ProductRouter = _ProductRouter;



exports.ProductRouter = ProductRouter;
