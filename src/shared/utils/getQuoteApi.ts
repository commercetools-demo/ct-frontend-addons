import { Context, Request } from '@frontastic/extension-types';
import { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getLocale } from '../../utils/request';

export const getQuoteApi = (request: Request, actionContext: Context, QuoteApi: any) => {
  const account = fetchAccountFromSession(request);

  const businessUnitKey = getBusinessUnitKey(request);

  return new QuoteApi(actionContext, getLocale(request), getCurrency(request), account?.accountId, businessUnitKey);
};
