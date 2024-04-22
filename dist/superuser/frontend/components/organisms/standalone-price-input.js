var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useStandalonePrice } from '../../hooks/standalone-price';
import { formatMoneyCurrency, formatNumberForCurrency } from '../../utils/currency-helpers';
var StandalonePriceInput = function (_a) {
    var item = _a.item, price = _a.price, sdk = _a.sdk, buttonText = _a.buttonText, wrapperClassName = _a.wrapperClassName, priceClassName = _a.priceClassName, buttonClassName = _a.buttonClassName, buttonWrapperClassName = _a.buttonWrapperClassName;
    var changePrice = useStandalonePrice({ sdk: sdk }).changePrice;
    var locale = useParams().locale;
    var _b = useState(((price === null || price === void 0 ? void 0 : price.centAmount) || 0) / 100), priceValue = _b[0], setPriceValue = _b[1];
    var _c = useState(formatMoneyCurrency(price, locale)), formattedPrice = _c[0], setFormattedPrice = _c[1];
    var _d = useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var currencyCode = useMemo(function () {
        return price === null || price === void 0 ? void 0 : price.currencyCode;
    }, [price]);
    var fractionDigits = useMemo(function () {
        return price === null || price === void 0 ? void 0 : price.fractionDigits;
    }, [price]);
    var isChanged = useMemo(function () {
        return priceValue !== ((price === null || price === void 0 ? void 0 : price.centAmount) || 0) / 100;
    }, [priceValue, price]);
    var handleChangePrice = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    if (!item.lineItemId) return [3 /*break*/, 2];
                    return [4 /*yield*/, changePrice(item.lineItemId, {
                            centAmount: priceValue * 100,
                            currencyCode: price === null || price === void 0 ? void 0 : price.currencyCode,
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, [priceValue, item]);
    var debounceFormatAndSet = useCallback(debounce(function (value) {
        var numericValue = parseFloat(value.replace(/[^0-9\.]/g, ''));
        if (isNaN(numericValue))
            return;
        setPriceValue(numericValue);
        var formatted = formatNumberForCurrency(numericValue * 100, locale, currencyCode, fractionDigits);
        setFormattedPrice(formatted);
    }, 1000), [currencyCode, fractionDigits, locale]);
    var onChange = useCallback(function (event) {
        var value = event.target.value;
        setFormattedPrice(value);
        debounceFormatAndSet(value);
    }, [debounceFormatAndSet]);
    return (React.createElement("div", { className: wrapperClassName },
        React.createElement("input", { value: formattedPrice, className: priceClassName, type: "text", onChange: onChange, disabled: isLoading, onBlur: function () {
                return setFormattedPrice(formatNumberForCurrency(priceValue * 100, locale, currencyCode, fractionDigits));
            } }),
        React.createElement("div", { className: buttonWrapperClassName },
            React.createElement("button", { disabled: !isChanged || isLoading, onClick: handleChangePrice, type: "button", className: buttonClassName }, buttonText))));
};
export default StandalonePriceInput;
