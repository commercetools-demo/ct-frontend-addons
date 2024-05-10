import { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getDistributionChannelId, getLocale, getSupplyChannelId } from '../../utils/request';
export var getCartApi = function (request, actionContext, CartApi) {
    var account = fetchAccountFromSession(request);
    var businessUnitKey = getBusinessUnitKey(request);
    var distributionChannelId = getDistributionChannelId(request);
    var supplyChannelId = getSupplyChannelId(request);
    return new CartApi(actionContext, getLocale(request), getCurrency(request), account === null || account === void 0 ? void 0 : account.accountId, businessUnitKey, distributionChannelId, supplyChannelId);
};
