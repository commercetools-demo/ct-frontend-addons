import { StringHelpers } from '../string-herlpers';
var CurrencyHelpers = /** @class */ (function () {
    function CurrencyHelpers() {
    }
    CurrencyHelpers.formatNumberForCurrency = function (costInCents, locale, currencyCode, fractionDigits) {
        if (currencyCode === void 0) { currencyCode = 'USD'; }
        if (fractionDigits === void 0) { fractionDigits = 0; }
        return CurrencyHelpers.formatMoneyCurrency({
            centAmount: costInCents,
            currencyCode: currencyCode,
            fractionDigits: fractionDigits,
        }, locale);
    };
    CurrencyHelpers.formatStringForCurrency = function (costInCents, locale, currencyCode, fractionDigits) {
        if (currencyCode === void 0) { currencyCode = 'USD'; }
        if (fractionDigits === void 0) { fractionDigits = 0; }
        if (!StringHelpers.isNumeric(costInCents)) {
            console.error(new Error("Value (".concat(costInCents, ") passed for currency formatting cannot be parsed to a number")));
            return '';
        }
        return CurrencyHelpers.formatNumberForCurrency(parseInt(costInCents, 10), locale, currencyCode, fractionDigits);
    };
    CurrencyHelpers.getLocaleFromShortenedLocale = function (locale) {
        var _a;
        return ((_a = {
            en: 'en-US',
            de: 'de-DE',
        }[locale]) !== null && _a !== void 0 ? _a : locale);
    };
    CurrencyHelpers.formatMoneyCurrency = function (price, locale) {
        var _a, _b, _c, _d;
        return Intl.NumberFormat(CurrencyHelpers.getLocaleFromShortenedLocale(locale), {
            style: 'currency',
            currency: (_a = price === null || price === void 0 ? void 0 : price.currencyCode) !== null && _a !== void 0 ? _a : 'USD',
            maximumFractionDigits: (_b = price === null || price === void 0 ? void 0 : price.fractionDigits) !== null && _b !== void 0 ? _b : 0,
            minimumFractionDigits: (_c = price === null || price === void 0 ? void 0 : price.fractionDigits) !== null && _c !== void 0 ? _c : 0,
        }).format(((_d = price === null || price === void 0 ? void 0 : price.centAmount) !== null && _d !== void 0 ? _d : 0) / 100);
    };
    /**
     * formatForCurrency formats a string of number into a cost representation. If
     * passing a string it must be numeric only.
     */
    CurrencyHelpers.formatForCurrency = function (costInCents, locale, currencyCode, fractionDigits) {
        if (currencyCode === void 0) { currencyCode = 'USD'; }
        if (fractionDigits === void 0) { fractionDigits = 0; }
        return typeof costInCents === 'string'
            ? CurrencyHelpers.formatStringForCurrency(costInCents, locale, currencyCode, fractionDigits)
            : typeof costInCents === 'number'
                ? CurrencyHelpers.formatNumberForCurrency(costInCents, locale, currencyCode, fractionDigits)
                : CurrencyHelpers.formatMoneyCurrency(costInCents, locale);
    };
    CurrencyHelpers.addCurrency = function (value1, value2) {
        if (!value1)
            value1 = { centAmount: 0 };
        if (!value2)
            value2 = { centAmount: 0 };
        if (value1.fractionDigits !== value2.fractionDigits && value1.fractionDigits && value2.fractionDigits) {
            console.warn(new Error("Money with different fraction codes passed to addCurrency, value returned will be innacurate. " +
                "Value 1: ".concat(value1.fractionDigits, ", value 2: ").concat(value2.fractionDigits)));
        }
        if (value1.currencyCode !== value2.currencyCode && value1.currencyCode && value2.currencyCode) {
            console.warn(new Error("Money with different currency codes passed to addCurrency, value returned will be innacurate. " +
                "Value 1: ".concat(value1.currencyCode, ", value 2: ").concat(value2.currencyCode)));
        }
        return {
            fractionDigits: value1.fractionDigits || value2.fractionDigits,
            centAmount: value1.centAmount + value2.centAmount,
            currencyCode: value1.currencyCode || value2.currencyCode,
        };
    };
    CurrencyHelpers.subtractCurrency = function (value1, value2) {
        if (value1.fractionDigits !== value2.fractionDigits) {
            console.warn(new Error("Money with different fraction codes passed to addCurrency, value returned will be innacurate. " +
                "Value 1: ".concat(value1.fractionDigits, ", value 2: ").concat(value2.fractionDigits)));
        }
        if (value1.currencyCode !== value2.currencyCode) {
            console.warn(new Error("Money with different currency codes passed to addCurrency, value returned will be innacurate. " +
                "Value 1: ".concat(value1.currencyCode, ", value 2: ").concat(value2.currencyCode)));
        }
        return {
            fractionDigits: value1.fractionDigits || value2.fractionDigits,
            centAmount: value1.centAmount - value2.centAmount,
            currencyCode: value1.currencyCode || value2.currencyCode,
        };
    };
    CurrencyHelpers.multiplyCurrency = function (value, numberOfItems) { return ({
        fractionDigits: value.fractionDigits,
        centAmount: value.centAmount * numberOfItems,
        currencyCode: value.currencyCode,
    }); };
    return CurrencyHelpers;
}());
export { CurrencyHelpers };
