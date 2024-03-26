"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/superuser/frontend/utils/currency-helpers.ts
var getLocaleFromShortenedLocale = function(locale) {
  return locale ? locale.split("_")[0] : "en";
};
var formatMoneyCurrency = function(price, locale) {
  return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
    style: "currency",
    currency: _nullishCoalesce(_optionalChain([price, 'optionalAccess', _ => _.currencyCode]), () => ( "USD")),
    maximumFractionDigits: _nullishCoalesce(_optionalChain([price, 'optionalAccess', _2 => _2.fractionDigits]), () => ( 0)),
    minimumFractionDigits: _nullishCoalesce(_optionalChain([price, 'optionalAccess', _3 => _3.fractionDigits]), () => ( 0))
  }).format((_nullishCoalesce(_optionalChain([price, 'optionalAccess', _4 => _4.centAmount]), () => ( 0))) / 100);
};
var formatNumberForCurrency = function(costInCents, locale, currencyCode = "USD", fractionDigits = 0) {
  return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
    style: "currency",
    currency: _nullishCoalesce(currencyCode, () => ( "USD")),
    maximumFractionDigits: _nullishCoalesce(fractionDigits, () => ( 0)),
    minimumFractionDigits: _nullishCoalesce(fractionDigits, () => ( 0))
  }).format((_nullishCoalesce(costInCents, () => ( 0))) / 100);
};





exports.getLocaleFromShortenedLocale = getLocaleFromShortenedLocale; exports.formatMoneyCurrency = formatMoneyCurrency; exports.formatNumberForCurrency = formatNumberForCurrency;
