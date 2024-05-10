var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useConfigurableComponentsContext } from '../../providers/configurable-components';
import ConfigurableComponent from './configurable-component';
import { useConfigurableProductAttribute } from '../../hooks/useConfigurableProductAttribute';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
var ConfigurableComponents = function (_a) {
    var product = _a.product, className = _a.className, children = _a.children, Button = _a.Button, Select = _a.Select, translatedTexts = _a.translatedTexts;
    var _b = useState(0), selectedComponentIdx = _b[0], setSelectedComponentIdx = _b[1];
    var _c = useState(true), isDisabled = _c[0], setIsDisabled = _c[1];
    var _d = useState([]), components = _d[0], setComponents = _d[1];
    var _e = useState(), updateCentAmount = _e[0], setUpdateCentAmount = _e[1];
    var _f = useState(), currentCentAmount = _f[0], setCurrentCentAmount = _f[1];
    var _g = useConfigurableComponentsContext(), configurableComponents = _g.configurableComponents, setSelectedVariants = _g.setSelectedVariants, productAttributes = _g.productAttributes;
    var findAttributeLabel = useConfigurableProductAttribute({ productAttributes: productAttributes }).findAttributeLabel;
    var locale = useParams().locale;
    var handleChangeVariantIdx = function (variantIdx, componentIdx) {
        setComponents(function (prevComponents) {
            return prevComponents.map(function (component, i) {
                var _a;
                if (i !== componentIdx) {
                    return component;
                }
                return __assign(__assign({}, component), { tempVariant: (_a = component.variants) === null || _a === void 0 ? void 0 : _a[variantIdx] });
            });
        });
    };
    var handleAdvanceNextStep = function (i) {
        setSelectedComponentIdx(i + 1);
        setComponents(components.map(function (component, idx) {
            if (i !== idx) {
                return component;
            }
            return __assign(__assign({}, component), { selectedVariant: __assign({}, component.tempVariant) });
        }));
    };
    var jumpToStep = function (i) {
        setComponents(components.map(function (component, idx) {
            if (selectedComponentIdx !== idx) {
                return component;
            }
            return __assign(__assign({}, component), { tempVariant: undefined });
        }));
        setSelectedComponentIdx(i);
    };
    useEffect(function () {
        if (components.length) {
            var updated = components.reduce(function (prev, item) {
                var _a;
                return CurrencyHelpers.addCurrency(prev, (_a = item.tempVariant) === null || _a === void 0 ? void 0 : _a.price);
            }, { centAmount: 0, currencyCode: product.currency });
            var current = components.reduce(function (prev, item) { var _a; return CurrencyHelpers.addCurrency(prev, (_a = item.selectedVariant) === null || _a === void 0 ? void 0 : _a.price); }, { centAmount: 0, currencyCode: product.currency });
            setIsDisabled(components.some(function (component) { return !component.selectedVariant; }));
            setUpdateCentAmount(CurrencyHelpers.subtractCurrency(updated, currentCentAmount || { centAmount: 0, currencyCode: product.currency }));
            setCurrentCentAmount(current);
            setSelectedVariants(components.map(function (component) { return component.selectedVariant; }));
        }
    }, [components]);
    useEffect(function () {
        if (configurableComponents === null || configurableComponents === void 0 ? void 0 : configurableComponents.length) {
            setComponents(configurableComponents);
        }
    }, [configurableComponents]);
    if (!(configurableComponents === null || configurableComponents === void 0 ? void 0 : configurableComponents.length)) {
        return children({ isDisabled: false });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, "\n        .tab-panels--selected {\n          margin-top: -1px;\n        }\n        .tab-button--selected {\n          margin-bottom: -1px;\n        }\n      "),
        React.createElement("div", { className: className },
            components.map(function (component, i) { return (React.createElement(React.Fragment, null,
                React.createElement("input", { type: "radio", name: "tabset", className: "hidden", id: "tab".concat(i), checked: i === selectedComponentIdx, onChange: function () { return selectedComponentIdx > i && jumpToStep(i); } }),
                React.createElement("label", { className: "relative inline-block cursor-pointer whitespace-nowrap border-neutral-300 bg-white px-4 py-4 text-12 ".concat(selectedComponentIdx === i && 'z-10 border-t border-x font-bold', " ").concat(components.length !== selectedComponentIdx && 'tab-button--selected'), htmlFor: "tab".concat(i) },
                    React.createElement("span", { className: "flex items-center gap-2" },
                        component.name,
                        " ",
                        selectedComponentIdx > i && React.createElement(CheckIcon, { className: "h-4 w-4 text-primary" }))))); }),
            React.createElement("div", { className: "tab-panels relative ".concat(components.length !== selectedComponentIdx && 'tab-panels--selected') },
                components.map(function (component, i) { return (React.createElement("article", { className: "border border-neutral-300 ".concat(i === selectedComponentIdx ? 'block' : 'hidden'), key: component.productId },
                    React.createElement(ConfigurableComponent, { className: "p-4", product: component, onChangeVariantIdx: function (idx) { return handleChangeVariantIdx(idx, i); }, variant: component.tempVariant, Select: Select }),
                    React.createElement("div", { className: "flex justify-center p-4" },
                        React.createElement(Button, { variant: "primary", size: "full", onClick: function () { return handleAdvanceNextStep(i); }, type: "button" }, "".concat(translatedTexts === null || translatedTexts === void 0 ? void 0 : translatedTexts.next, " ").concat((updateCentAmount === null || updateCentAmount === void 0 ? void 0 : updateCentAmount.centAmount) && (updateCentAmount === null || updateCentAmount === void 0 ? void 0 : updateCentAmount.centAmount) >= 0 ? '+' : '').concat(CurrencyHelpers.formatForCurrency(updateCentAmount || 0, locale)))))); }),
                components.length === selectedComponentIdx && (React.createElement("article", { className: "border-accent-400 max-h-[350px] border p-4" },
                    React.createElement("span", { className: "text-14 font-semibold" }, translatedTexts === null || translatedTexts === void 0 ? void 0 : translatedTexts.summary),
                    React.createElement("ul", null, components.map(function (component) {
                        var _a;
                        return (React.createElement("li", { key: component.productId },
                            React.createElement("span", { className: "text-14 font-bold" },
                                component.name,
                                ": "),
                            React.createElement("span", { className: "text-12" }, findAttributeLabel((_a = component === null || component === void 0 ? void 0 : component.selectedVariant) === null || _a === void 0 ? void 0 : _a.attributes))));
                    })),
                    React.createElement("div", { className: "mt-4" },
                        React.createElement("span", { className: "text-14" }, translatedTexts === null || translatedTexts === void 0 ? void 0 : translatedTexts.total),
                        React.createElement("p", { className: "text-16" }, "".concat(CurrencyHelpers.formatForCurrency((product === null || product === void 0 ? void 0 : product.price) * 100, locale, product === null || product === void 0 ? void 0 : product.currency), " + ").concat(CurrencyHelpers.formatForCurrency(currentCentAmount || 0)))),
                    React.createElement("button", { className: "text-accent-400 mt-8 underline", onClick: function () { return jumpToStep(0); }, type: "button" }, translatedTexts === null || translatedTexts === void 0 ? void 0 : translatedTexts.back))),
                components.length !== selectedComponentIdx && (React.createElement("div", { className: "mt-4" },
                    React.createElement("span", { className: "text-14" }, translatedTexts === null || translatedTexts === void 0 ? void 0 : translatedTexts.total),
                    React.createElement("p", { className: "text-16" }, "".concat(CurrencyHelpers.formatForCurrency((product === null || product === void 0 ? void 0 : product.price) * 100, locale, product === null || product === void 0 ? void 0 : product.currency), " + ").concat(CurrencyHelpers.formatForCurrency(currentCentAmount || 0, locale))))))),
        children({ isDisabled: isDisabled })));
};
export default ConfigurableComponents;
