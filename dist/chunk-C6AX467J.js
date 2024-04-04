import {
  injectCartApi
} from "./chunk-4TZPHING.js";
import {
  fetchAccountFromSession,
  getBusinessUnitKey,
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getSupplyChannelId
} from "./chunk-YZV7KPZP.js";

// src/configurable-products/extensions/utils.ts
var extractDependency = (dependency, config) => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case "CartApi":
        return injectCartApi(config?.dependencies.CartApi, config);
      case "ProductApi":
        return config?.dependencies.ProductApi;
    }
  }
};
var getCartApi = (request, actionContext, CartApi) => {
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  const distributionChannelId = getDistributionChannelId(request);
  const supplyChannelId = getSupplyChannelId(request);
  return new CartApi(
    actionContext,
    getLocale(request),
    getCurrency(request),
    account?.accountId,
    businessUnitKey,
    distributionChannelId,
    supplyChannelId
  );
};

export {
  extractDependency,
  getCartApi
};
