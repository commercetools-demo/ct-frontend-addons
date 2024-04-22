'use client';
import React, { createContext, useContext } from 'react';
var initialState = {
    cart: undefined,
    productAttributes: [],
};
export var BundledItemsContext = createContext(initialState);
var BundledItemsProvider = function (_a) {
    var cart = _a.cart, productAttributes = _a.productAttributes, children = _a.children;
    return (React.createElement(BundledItemsContext.Provider, { value: {
            productAttributes: productAttributes,
            cart: cart,
        } }, children));
};
export default BundledItemsProvider;
export var useBundledItemsContext = function () { return useContext(BundledItemsContext); };
