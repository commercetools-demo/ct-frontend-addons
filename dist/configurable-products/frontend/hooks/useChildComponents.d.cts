import { Cart } from '@commercetools/frontend-domain-types/cart';

declare const childComponentsAttributeName = "bundled_components";
declare const useChildComponents: () => {
    bundleComponentsIntoLineItems: <T extends Cart>(cart: T) => T;
    getBundledPrice: (lineItem: {
        id: string;
        price?: number;
        discountedPrice?: number;
    }) => {
        discountedPrice?: number | undefined;
        price?: number | undefined;
    };
};

export { childComponentsAttributeName, useChildComponents as default };
