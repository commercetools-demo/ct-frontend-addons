"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk2NVYSSW7cjs = require('./chunk-2NVYSSW7.cjs');








var _chunk7BO3LFEBcjs = require('./chunk-7BO3LFEB.cjs');

// src/configurable-products/extensions/utils/product-router.ts
var _ProductRouter = class _ProductRouter {
};
_ProductRouter.getBundles = async (request, frontasticContext, product, config) => {
  const urlMatches = _optionalChain([_chunk7BO3LFEBcjs.getPath.call(void 0, request), 'optionalAccess', _ => _.match, 'call', _2 => _2(config.props.product.productDetailsPageRegex)]);
  const ProductApi = _chunk2NVYSSW7cjs.extractDependency.call(void 0, "ProductApi", config);
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
        const productApi = new ProductApi(frontasticContext, _chunk7BO3LFEBcjs.getLocale.call(void 0, request), _chunk7BO3LFEBcjs.getCurrency.call(void 0, request), request);
        const products = await productApi.query({
          productIds: uniqueIds,
          storeKey: _chunk7BO3LFEBcjs.getStoreKey.call(void 0, request),
          storeId: _chunk7BO3LFEBcjs.getStoreId.call(void 0, request),
          distributionChannelId: _chunk7BO3LFEBcjs.getDistributionChannelId.call(void 0, request),
          supplyChannelId: _chunk7BO3LFEBcjs.getSupplyChannelId.call(void 0, request)
        }).then((result) => result.items);
        return products;
      }
    }
  }
  return [];
};
_ProductRouter.getProductIdsFromReferencedAttribute = (attributeName, variant) => {
  const attributeValue = _optionalChain([variant, 'access', _3 => _3.attributes, 'optionalAccess', _4 => _4[attributeName]]);
  if (attributeValue && Array.isArray(attributeValue)) {
    return _optionalChain([attributeValue, 'optionalAccess', _5 => _5.map, 'call', _6 => _6((item) => item.id)]);
  } else if (attributeValue) {
    return [attributeValue.id];
  }
  return [];
};
var ProductRouter = _ProductRouter;



exports.ProductRouter = ProductRouter;
