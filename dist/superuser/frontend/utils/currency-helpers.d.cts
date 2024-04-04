import { Money } from '../types.cjs';

declare const getLocaleFromShortenedLocale: (locale?: string) => string;
declare const formatMoneyCurrency: (price?: Money, locale?: string) => string;
declare const formatNumberForCurrency: (costInCents: number, locale?: string, currencyCode?: string, fractionDigits?: number) => string;

export { formatMoneyCurrency, formatNumberForCurrency, getLocaleFromShortenedLocale };
