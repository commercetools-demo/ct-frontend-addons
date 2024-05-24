import { Context, Request } from '@frontastic/extension-types';
import {
  fetchAccountFromSession,
  getBusinessUnitKey,
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getSupplyChannelId,
} from '../../../utils/request';
import { GeneralConfiguration } from '../../../utils/types';

export const getCartApi = <T extends GeneralConfiguration>(
  request: Request,
  actionContext: Context,
  config?: T,
  extractDependency?: (dependency: keyof Record<string, any>, config?: T) => any,
  b2b: boolean = true,
) => {
  const CartApi = extractDependency?.('CartApi', config);

  if (b2b) {
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
      supplyChannelId,
    );
  }
  return new CartApi(actionContext, getLocale(request), getCurrency(request), request);

};
