import { Context, Request } from '@frontastic/extension-types';
import { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getLocale } from '../../../utils/request';
export const getApprovalApi = (request: Request, actionContext: Context, ApprovalApi: any) => {
    const account = fetchAccountFromSession(request);
    const businessUnitKey = getBusinessUnitKey(request);
  
    if (!account?.accountId) {
      throw new Error('Not logged in');
    }
  
    return new ApprovalApi(
      actionContext,
      getLocale(request),
      getCurrency(request),
      account.accountId,
      businessUnitKey,
    );
  };