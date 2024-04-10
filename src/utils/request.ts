import { Request } from '@frontastic/extension-types';
import parseQueryParams from './parseRequestParams';
import { Account } from '../shared/types';

export const getPath = (request: Request): string | null => {
  return getHeader(request, 'frontastic-path') ?? request.query.path;
};

export const getLocale = (request: Request): string => {
  const locale = getHeader(request, 'frontastic-locale') ?? request.query.locale;

  if (locale !== undefined) {
    return getHeader(request, 'frontastic-locale') ?? request.query.locale;
  }

  throw new Error(`Locale is missing from request ${request}`);
};

export const getCurrency = (request: Request): string => {
  const currency = getHeader(request, 'frontastic-currency') ?? request.query['currency'];

  if (currency !== undefined) {
    return getHeader(request, 'frontastic-currency') ?? request.query['currency'];
  }

  return 'USD'; //hardcoded for testing

  throw new Error(`Currency is missing from request ${request}`);
};
const getHeader = (request: Request, header: string): string | null => {
  if (request?.headers && header in request.headers) {
    // @ts-ignore
    const foundHeader = request.headers[header];
    if (Array.isArray(foundHeader)) {
      return foundHeader[0];
    }
    return foundHeader;
  }

  return null;
};

export const getBusinessUnitKey = (request: Request): string | null => {
  if (request !== undefined) {
    const { businessUnitKey } = parseQueryParams<{
      businessUnitKey: string;
    }>(request.query);

    return businessUnitKey ?? request.sessionData?.businessUnitKey;
  }

  return null;
};

export const getStoreKey = (request: Request): string | null => {
  if (request !== undefined) {
    const { storeKey } = parseQueryParams<{
      storeKey: string;
    }>(request.query);

    return storeKey ?? request.sessionData?.storeKey;
  }

  return null;
};

export const getStoreId = (request: Request): string | null => {
  if (request !== undefined) {
    const { storeId } = parseQueryParams<{
      storeId: string;
    }>(request.query);

    return storeId ?? request.sessionData?.storeId;
  }

  return null;
};

export const getDistributionChannelId = (request: Request): string | null => {
  if (request !== undefined) {
    const { distributionChannelId } = parseQueryParams<{
      distributionChannelId: string;
    }>(request.query);

    return distributionChannelId ?? request.sessionData?.distributionChannelId;
  }

  return null;
};

export const getSupplyChannelId = (request: Request): string | null => {
  if (request !== undefined) {
    const { supplyChannelId } = parseQueryParams<{
      supplyChannelId: string;
    }>(request.query);

    return supplyChannelId ?? request.sessionData?.supplyChannelId;
  }

  return null;
};

export function fetchAccountFromSession(request: Request): Account | undefined {
  if (request.sessionData?.account !== undefined) {
    return request.sessionData.account;
  }

  return undefined;
}

export function fetchCartIdFromSession(request: Request): string | undefined {
  if (request.sessionData?.cartId !== undefined) {
    return request.sessionData.cartId;
  }

  return undefined;
}

export const getSuperuserFromSession = (request: Request): string | null => {
  return request.sessionData?.superuser;
};
