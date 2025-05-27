import { Context, Request } from '@frontastic/extension-types';
import {
  fetchAccountIdFromSession,
  getBusinessUnitKey,
  getCurrency,
  getDistributionChannelId,
  getLocale,
  getSupplyChannelId,
} from '../../utils/request';

export const getCartApi = (request: Request, actionContext: Context, CartApi: any) => {
  const accountId = fetchAccountIdFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  const distributionChannelId = getDistributionChannelId(request);
  const supplyChannelId = getSupplyChannelId(request);

  return new CartApi(
    actionContext,
    getLocale(request),
    getCurrency(request),
    accountId,
    businessUnitKey,
    distributionChannelId,
    supplyChannelId,
    request
  );
};
