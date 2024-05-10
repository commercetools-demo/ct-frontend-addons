import { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getLocale } from '../../utils/request';
export var getQuoteApi = function (request, actionContext, QuoteApi) {
    var account = fetchAccountFromSession(request);
    var businessUnitKey = getBusinessUnitKey(request);
    return new QuoteApi(actionContext, getLocale(request), getCurrency(request), account === null || account === void 0 ? void 0 : account.accountId, businessUnitKey);
};
