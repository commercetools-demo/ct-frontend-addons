import { useState } from 'react';
export var useSelectConfigurableComponents = function (configurableComponents) {
    var _a = useState(Array(configurableComponents === null || configurableComponents === void 0 ? void 0 : configurableComponents.length).fill(null)), selectedVariants = _a[0], setSelectedVariants = _a[1];
    var selectComponentVariant = function (componentIndex, variantSku) {
        var selectedVariant = !variantSku
            ? null
            : configurableComponents === null || configurableComponents === void 0 ? void 0 : configurableComponents[componentIndex].variants.find(function (v) { return v.sku === variantSku; });
        setSelectedVariants(selectedVariants.map(function (variant, i) {
            if (i === componentIndex) {
                return selectedVariant;
            }
            return variant;
        }));
    };
    return {
        selectedVariants: selectedVariants,
        setSelectedVariants: setSelectedVariants,
        selectComponentVariant: selectComponentVariant,
    };
};
