"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkXOX4LYIZcjs = require('./chunk-XOX4LYIZ.cjs');

// src/utils/request.ts
var getPath = (request) => {
  return _nullishCoalesce(getHeader(request, "frontastic-path"), () => ( request.query.path));
};
var getLocale = (request) => {
  const locale = _nullishCoalesce(getHeader(request, "frontastic-locale"), () => ( request.query.locale));
  if (locale !== void 0) {
    return _nullishCoalesce(getHeader(request, "frontastic-locale"), () => ( request.query.locale));
  }
  throw new Error(`Locale is missing from request ${request}`);
};
var getCurrency = (request) => {
  const currency = _nullishCoalesce(getHeader(request, "frontastic-currency"), () => ( request.query["currency"]));
  if (currency !== void 0) {
    return _nullishCoalesce(getHeader(request, "frontastic-currency"), () => ( request.query["currency"]));
  }
  return "USD";
  throw new Error(`Currency is missing from request ${request}`);
};
var getHeader = (request, header) => {
  if (_optionalChain([request, 'optionalAccess', _ => _.headers]) && header in request.headers) {
    const foundHeader = request.headers[header];
    if (Array.isArray(foundHeader)) {
      return foundHeader[0];
    }
    return foundHeader;
  }
  return null;
};
var getBusinessUnitKey = (request) => {
  if (request !== void 0) {
    const { businessUnitKey } = _chunkXOX4LYIZcjs.parseRequestParams_default.call(void 0, request.query);
    return _nullishCoalesce(businessUnitKey, () => ( _optionalChain([request, 'access', _2 => _2.sessionData, 'optionalAccess', _3 => _3.businessUnitKey])));
  }
  return null;
};
var getStoreKey = (request) => {
  if (request !== void 0) {
    const { storeKey } = _chunkXOX4LYIZcjs.parseRequestParams_default.call(void 0, request.query);
    return _nullishCoalesce(storeKey, () => ( _optionalChain([request, 'access', _4 => _4.sessionData, 'optionalAccess', _5 => _5.storeKey])));
  }
  return null;
};
var getStoreId = (request) => {
  if (request !== void 0) {
    const { storeId } = _chunkXOX4LYIZcjs.parseRequestParams_default.call(void 0, request.query);
    return _nullishCoalesce(storeId, () => ( _optionalChain([request, 'access', _6 => _6.sessionData, 'optionalAccess', _7 => _7.storeId])));
  }
  return null;
};
var getDistributionChannelId = (request) => {
  if (request !== void 0) {
    const { distributionChannelId } = _chunkXOX4LYIZcjs.parseRequestParams_default.call(void 0, request.query);
    return _nullishCoalesce(distributionChannelId, () => ( _optionalChain([request, 'access', _8 => _8.sessionData, 'optionalAccess', _9 => _9.distributionChannelId])));
  }
  return null;
};
var getSupplyChannelId = (request) => {
  if (request !== void 0) {
    const { supplyChannelId } = _chunkXOX4LYIZcjs.parseRequestParams_default.call(void 0, request.query);
    return _nullishCoalesce(supplyChannelId, () => ( _optionalChain([request, 'access', _10 => _10.sessionData, 'optionalAccess', _11 => _11.supplyChannelId])));
  }
  return null;
};
function fetchAccountFromSession(request) {
  if (_optionalChain([request, 'access', _12 => _12.sessionData, 'optionalAccess', _13 => _13.account]) !== void 0) {
    return request.sessionData.account;
  }
  return void 0;
}
function fetchCartIdFromSession(request) {
  if (_optionalChain([request, 'access', _14 => _14.sessionData, 'optionalAccess', _15 => _15.cartId]) !== void 0) {
    return request.sessionData.cartId;
  }
  return void 0;
}












exports.getPath = getPath; exports.getLocale = getLocale; exports.getCurrency = getCurrency; exports.getBusinessUnitKey = getBusinessUnitKey; exports.getStoreKey = getStoreKey; exports.getStoreId = getStoreId; exports.getDistributionChannelId = getDistributionChannelId; exports.getSupplyChannelId = getSupplyChannelId; exports.fetchAccountFromSession = fetchAccountFromSession; exports.fetchCartIdFromSession = fetchCartIdFromSession;
