/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { useConfigurableProductAttribute } from '../../hooks/useConfigurableProductAttribute';
import { useConfigurableComponentsContext } from '../../providers/configurable-components';
var ConfigurableComponent = function (_a) {
    var product = _a.product, variant = _a.variant, onChangeVariantIdx = _a.onChangeVariantIdx, className = _a.className, Select = _a.Select;
    var _b = useState(), selectedVariant = _b[0], setSelectedVariant = _b[1];
    var productAttributes = useConfigurableComponentsContext().productAttributes;
    var findAttributeLabel = useConfigurableProductAttribute({ productAttributes: productAttributes }).findAttributeLabel;
    var getAttributeValueForSku = function (sku) {
        var _a;
        return findAttributeLabel((_a = product === null || product === void 0 ? void 0 : product.variants.find(function (variant) { return variant.sku === sku; })) === null || _a === void 0 ? void 0 : _a.attributes);
    };
    var handleChangeVariant = function (sku) {
        var variantInx = product === null || product === void 0 ? void 0 : product.variants.findIndex(function (variant) { return variant.sku === sku; });
        onChangeVariantIdx(variantInx);
        setSelectedVariant(product === null || product === void 0 ? void 0 : product.variants[variantInx]);
    };
    useEffect(function () {
        if (variant) {
            setSelectedVariant(variant);
        }
    }, [variant]);
    return (React.createElement("div", null,
        React.createElement("p", { className: "p-4 text-14 font-semibold leading-loose" }, product.name),
        React.createElement(Select, { onChange: function (sku) { return handleChangeVariant(sku); }, className: className, defaultValue: selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.sku, options: product === null || product === void 0 ? void 0 : product.variants.map(function (variant) { return ({
                value: variant.sku,
                name: getAttributeValueForSku(variant.sku),
            }); }) })));
};
export default ConfigurableComponent;
