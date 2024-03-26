import {
  parseRequestParams_default
} from "./chunk-QMKXRZHV.js";

// src/utils/request.ts
var getPath = (request) => {
  return getHeader(request, "frontastic-path") ?? request.query.path;
};
var getLocale = (request) => {
  const locale = getHeader(request, "frontastic-locale") ?? request.query.locale;
  if (locale !== void 0) {
    return getHeader(request, "frontastic-locale") ?? request.query.locale;
  }
  throw new Error(`Locale is missing from request ${request}`);
};
var getCurrency = (request) => {
  if (request !== void 0) {
    const currency = getHeader(request, "frontastic-currency") ?? request.query["currency"];
    if (currency !== void 0) {
      return getHeader(request, "frontastic-currency") ?? request.query["currency"];
    }
  }
  return null;
};
var getHeader = (request, header) => {
  if (header in request.headers) {
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
    const { businessUnitKey } = parseRequestParams_default(request.query);
    return businessUnitKey ?? request.sessionData?.businessUnitKey;
  }
  return null;
};
var getStoreKey = (request) => {
  if (request !== void 0) {
    const { storeKey } = parseRequestParams_default(request.query);
    return storeKey ?? request.sessionData?.storeKey;
  }
  return null;
};
var getStoreId = (request) => {
  if (request !== void 0) {
    const { storeId } = parseRequestParams_default(request.query);
    return storeId ?? request.sessionData?.storeId;
  }
  return null;
};
var getDistributionChannelId = (request) => {
  if (request !== void 0) {
    const { distributionChannelId } = parseRequestParams_default(request.query);
    return distributionChannelId ?? request.sessionData?.distributionChannelId;
  }
  return null;
};
var getSupplyChannelId = (request) => {
  if (request !== void 0) {
    const { supplyChannelId } = parseRequestParams_default(request.query);
    return supplyChannelId ?? request.sessionData?.supplyChannelId;
  }
  return null;
};
function fetchAccountFromSession(request) {
  if (request.sessionData?.account !== void 0) {
    return request.sessionData.account;
  }
  return void 0;
}

export {
  getPath,
  getLocale,
  getCurrency,
  getBusinessUnitKey,
  getStoreKey,
  getStoreId,
  getDistributionChannelId,
  getSupplyChannelId,
  fetchAccountFromSession
};
