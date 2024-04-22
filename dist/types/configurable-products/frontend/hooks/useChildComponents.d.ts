import { Cart } from '@commercetools/frontend-domain-types/cart';
import { Middleware } from 'swr';
export declare const childComponentsAttributeName = "bundled_components";
declare const useChildComponents: () => {
    bundleComponentsIntoLineItems: <T extends Cart>(cart: T) => T;
    getBundledPrice: (lineItem: {
        id: string;
        price?: number | undefined;
        discountedPrice?: number | undefined;
    }) => {
        discountedPrice?: number | undefined;
        price?: number | undefined;
    };
    swrBundleMiddleware: Middleware;
};
export default useChildComponents;
//# sourceMappingURL=useChildComponents.d.ts.map