// src/superuser/frontend/utils/currency-helpers.ts
var getLocaleFromShortenedLocale = function(locale) {
  return locale ? locale.split("_")[0] : "en";
};
var formatMoneyCurrency = function(price, locale) {
  return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
    style: "currency",
    currency: price?.currencyCode ?? "USD",
    maximumFractionDigits: price?.fractionDigits ?? 0,
    minimumFractionDigits: price?.fractionDigits ?? 0
  }).format((price?.centAmount ?? 0) / 100);
};
var formatNumberForCurrency = function(costInCents, locale, currencyCode = "USD", fractionDigits = 0) {
  return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
    style: "currency",
    currency: currencyCode ?? "USD",
    maximumFractionDigits: fractionDigits ?? 0,
    minimumFractionDigits: fractionDigits ?? 0
  }).format((costInCents ?? 0) / 100);
};

export {
  getLocaleFromShortenedLocale,
  formatMoneyCurrency,
  formatNumberForCurrency
};
