import { Context, Request } from '@frontastic/extension-types';
import { Configuration, Dependencies } from '../types';
import { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getDistributionChannelId, getLocale, getSupplyChannelId } from '../../utils/request';
import { injectCartApi } from './apis/CartApi';

export const extractDependency = (dependency: keyof Dependencies, config?: Configuration): any => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case 'CartApi':
        return injectCartApi(config?.dependencies.CartApi, config);
      case 'ProductApi':
        return config?.dependencies.ProductApi
    }
  }
};

export const getCartApi = (request: Request, actionContext: Context, CartApi: any) => {
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
};


