export var getLocaleFromShortenedLocale = function (locale) {
    return locale ? locale.split('_')[0] : 'en';
};
export var formatMoneyCurrency = function (price, locale) {
    var _a, _b, _c, _d;
    return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
        style: 'currency',
        currency: (_a = price === null || price === void 0 ? void 0 : price.currencyCode) !== null && _a !== void 0 ? _a : 'USD',
        maximumFractionDigits: (_b = price === null || price === void 0 ? void 0 : price.fractionDigits) !== null && _b !== void 0 ? _b : 0,
        minimumFractionDigits: (_c = price === null || price === void 0 ? void 0 : price.fractionDigits) !== null && _c !== void 0 ? _c : 0,
    }).format(((_d = price === null || price === void 0 ? void 0 : price.centAmount) !== null && _d !== void 0 ? _d : 0) / 100);
};
export var formatNumberForCurrency = function (costInCents, locale, currencyCode, fractionDigits) {
    if (currencyCode === void 0) { currencyCode = 'USD'; }
    if (fractionDigits === void 0) { fractionDigits = 0; }
    return Intl.NumberFormat(getLocaleFromShortenedLocale(locale), {
        style: 'currency',
        currency: currencyCode !== null && currencyCode !== void 0 ? currencyCode : 'USD',
        maximumFractionDigits: fractionDigits !== null && fractionDigits !== void 0 ? fractionDigits : 0,
        minimumFractionDigits: fractionDigits !== null && fractionDigits !== void 0 ? fractionDigits : 0,
    }).format((costInCents !== null && costInCents !== void 0 ? costInCents : 0) / 100);
};
