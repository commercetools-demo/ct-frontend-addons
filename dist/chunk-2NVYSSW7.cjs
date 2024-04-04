"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkO7UZ32AFcjs = require('./chunk-O7UZ32AF.cjs');







var _chunk7BO3LFEBcjs = require('./chunk-7BO3LFEB.cjs');

// src/configurable-products/extensions/utils.ts
var extractDependency = (dependency, config) => {
  if (_optionalChain([config, 'optionalAccess', _ => _.dependencies, 'optionalAccess', _2 => _2[dependency]])) {
    switch (dependency) {
      case "CartApi":
        return _chunkO7UZ32AFcjs.injectCartApi.call(void 0, _optionalChain([config, 'optionalAccess', _3 => _3.dependencies, 'access', _4 => _4.CartApi]), config);
      case "ProductApi":
        return _optionalChain([config, 'optionalAccess', _5 => _5.dependencies, 'access', _6 => _6.ProductApi]);
    }
  }
};
var getCartApi = (request, actionContext, CartApi) => {
  const account = _chunk7BO3LFEBcjs.fetchAccountFromSession.call(void 0, request);
  const businessUnitKey = _chunk7BO3LFEBcjs.getBusinessUnitKey.call(void 0, request);
  const distributionChannelId = _chunk7BO3LFEBcjs.getDistributionChannelId.call(void 0, request);
  const supplyChannelId = _chunk7BO3LFEBcjs.getSupplyChannelId.call(void 0, request);
  return new CartApi(
    actionContext,
    _chunk7BO3LFEBcjs.getLocale.call(void 0, request),
    _chunk7BO3LFEBcjs.getCurrency.call(void 0, request),
    _optionalChain([account, 'optionalAccess', _7 => _7.accountId]),
    businessUnitKey,
    distributionChannelId,
    supplyChannelId
  );
};




exports.extractDependency = extractDependency; exports.getCartApi = getCartApi;
