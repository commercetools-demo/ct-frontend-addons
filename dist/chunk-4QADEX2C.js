import {
  StringHelpers
} from "./chunk-JRZA6KGA.js";

// src/shared/utils/currency-helpers/index.ts
var _CurrencyHelpers = class _CurrencyHelpers {
};
_CurrencyHelpers.formatNumberForCurrency = function(costInCents, locale, currencyCode = "USD", fractionDigits = 0) {
  return _CurrencyHelpers.formatMoneyCurrency(
    {
      centAmount: costInCents,
      currencyCode,
      fractionDigits
    },
    locale
  );
};
_CurrencyHelpers.formatStringForCurrency = function(costInCents, locale, currencyCode = "USD", fractionDigits = 0) {
  if (!StringHelpers.isNumeric(costInCents)) {
    console.error(new Error(`Value (${costInCents}) passed for currency formatting cannot be parsed to a number`));
    return "";
  }
  return _CurrencyHelpers.formatNumberForCurrency(parseInt(costInCents, 10), locale, currencyCode, fractionDigits);
};
_CurrencyHelpers.getLocaleFromShortenedLocale = function(locale) {
  return {
    en: "en-US",
    de: "de-DE"
  }[locale] ?? locale;
};
_CurrencyHelpers.formatMoneyCurrency = function(price, locale) {
  return Intl.NumberFormat(_CurrencyHelpers.getLocaleFromShortenedLocale(locale), {
    style: "currency",
    currency: price?.currencyCode ?? "USD",
    maximumFractionDigits: price?.fractionDigits ?? 0,
    minimumFractionDigits: price?.fractionDigits ?? 0
  }).format((price?.centAmount ?? 0) / 100);
};
/**
 * formatForCurrency formats a string of number into a cost representation. If
 * passing a string it must be numeric only.
 */
_CurrencyHelpers.formatForCurrency = (costInCents, locale, currencyCode = "USD", fractionDigits = 0) => typeof costInCents === "string" ? _CurrencyHelpers.formatStringForCurrency(costInCents, locale, currencyCode, fractionDigits) : typeof costInCents === "number" ? _CurrencyHelpers.formatNumberForCurrency(costInCents, locale, currencyCode, fractionDigits) : _CurrencyHelpers.formatMoneyCurrency(costInCents, locale);
_CurrencyHelpers.addCurrency = (value1, value2) => {
  if (!value1)
    value1 = { centAmount: 0 };
  if (!value2)
    value2 = { centAmount: 0 };
  if (value1.fractionDigits !== value2.fractionDigits && value1.fractionDigits && value2.fractionDigits) {
    console.warn(
      new Error(
        `Money with different fraction codes passed to addCurrency, value returned will be innacurate. Value 1: ${value1.fractionDigits}, value 2: ${value2.fractionDigits}`
      )
    );
  }
  if (value1.currencyCode !== value2.currencyCode && value1.currencyCode && value2.currencyCode) {
    console.warn(
      new Error(
        `Money with different currency codes passed to addCurrency, value returned will be innacurate. Value 1: ${value1.currencyCode}, value 2: ${value2.currencyCode}`
      )
    );
  }
  return {
    fractionDigits: value1.fractionDigits || value2.fractionDigits,
    centAmount: value1.centAmount + value2.centAmount,
    currencyCode: value1.currencyCode || value2.currencyCode
  };
};
_CurrencyHelpers.subtractCurrency = (value1, value2) => {
  if (value1.fractionDigits !== value2.fractionDigits) {
    console.warn(
      new Error(
        `Money with different fraction codes passed to addCurrency, value returned will be innacurate. Value 1: ${value1.fractionDigits}, value 2: ${value2.fractionDigits}`
      )
    );
  }
  if (value1.currencyCode !== value2.currencyCode) {
    console.warn(
      new Error(
        `Money with different currency codes passed to addCurrency, value returned will be innacurate. Value 1: ${value1.currencyCode}, value 2: ${value2.currencyCode}`
      )
    );
  }
  return {
    fractionDigits: value1.fractionDigits || value2.fractionDigits,
    centAmount: value1.centAmount - value2.centAmount,
    currencyCode: value1.currencyCode || value2.currencyCode
  };
};
_CurrencyHelpers.multiplyCurrency = (value, numberOfItems) => ({
  fractionDigits: value.fractionDigits,
  centAmount: value.centAmount * numberOfItems,
  currencyCode: value.currencyCode
});
var CurrencyHelpers = _CurrencyHelpers;

export {
  CurrencyHelpers
};
