import { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getLocale } from '../../../utils/request';
export var getApprovalApi = function (request, actionContext, ApprovalApi) {
    var account = fetchAccountFromSession(request);
    var businessUnitKey = getBusinessUnitKey(request);
    if (!(account === null || account === void 0 ? void 0 : account.accountId)) {
        throw new Error('Not logged in');
    }
    return new ApprovalApi(actionContext, getLocale(request), getCurrency(request), account.accountId, businessUnitKey);
};
