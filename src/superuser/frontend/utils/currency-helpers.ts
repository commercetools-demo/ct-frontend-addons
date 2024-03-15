import { Money } from "../types";

export const getLocaleFromShortenedLocale = function (locale?: string) {
  return locale ? locale.split('_')[0] : 'en';
};
export const formatMoneyCurrency = function (price?: Money, locale?: string) {
  return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
    style: 'currency',
    currency: price?.currencyCode ?? 'USD',
    maximumFractionDigits: price?.fractionDigits ?? 0,
    minimumFractionDigits: price?.fractionDigits ?? 0,
  }).format((price?.centAmount ?? 0) / 100);
};

export const formatNumberForCurrency = function (
  costInCents: number,
  locale?: string,
  currencyCode = 'USD',
  fractionDigits = 0,
) {
  return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
    style: 'currency',
    currency: currencyCode ?? 'USD',
    maximumFractionDigits: fractionDigits ?? 0,
    minimumFractionDigits: fractionDigits ?? 0,
  }).format((costInCents ?? 0) / 100);
};
