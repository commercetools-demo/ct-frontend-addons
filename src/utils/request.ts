import { Request } from '@frontastic/extension-types';

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
