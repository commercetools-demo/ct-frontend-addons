import { Request } from '@frontastic/extension-types';
import { Account } from '@commercetools/frontend-domain-types/account';

declare const getPath: (request: Request) => string | null;
declare const getLocale: (request: Request) => string;
declare const getCurrency: (request: Request) => string | null;
declare const getBusinessUnitKey: (request: Request) => string | null;
declare const getStoreKey: (request: Request) => string | null;
declare const getStoreId: (request: Request) => string | null;
declare const getDistributionChannelId: (request: Request) => string | null;
declare const getSupplyChannelId: (request: Request) => string | null;
declare function fetchAccountFromSession(request: Request): Account | undefined;

export { fetchAccountFromSession, getBusinessUnitKey, getCurrency, getDistributionChannelId, getLocale, getPath, getStoreId, getStoreKey, getSupplyChannelId };
