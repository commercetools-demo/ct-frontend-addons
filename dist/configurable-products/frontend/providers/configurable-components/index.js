'use client';
import React, { createContext, useContext, useState } from 'react';
var initialState = {
    configurableComponents: [],
    selectedVariants: [],
    productAttributes: [],
    setSelectedVariants: function () { },
};
export var ConfigurableComponentsContext = createContext(initialState);
var ConfigurableComponentsProvider = function (_a) {
    var children = _a.children, configurableComponents = _a.configurableComponents, productAttributes = _a.productAttributes;
    var _b = useState(Array(configurableComponents === null || configurableComponents === void 0 ? void 0 : configurableComponents.length).fill(null)), selectedVariants = _b[0], setSelectedVariants = _b[1];
    return (React.createElement(ConfigurableComponentsContext.Provider, { value: {
            configurableComponents: configurableComponents,
            selectedVariants: selectedVariants,
            setSelectedVariants: setSelectedVariants,
            productAttributes: productAttributes,
        } }, children));
};
export default ConfigurableComponentsProvider;
export var useConfigurableComponentsContext = function () { return useContext(ConfigurableComponentsContext); };
