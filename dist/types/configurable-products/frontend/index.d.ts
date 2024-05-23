/// <reference types="react" />
export declare const COMPONENTS: {
    BundledItems: import("react").FC<{
        item: import("@commercetools/frontend-domain-types/product").Product & {
            id: string;
        };
    }>;
    ConfigurableComponents: import("react").FC<{
        product: any;
        className?: string | undefined;
        children: ({ isDisabled }: {
            isDisabled: boolean;
        }) => import("react").ReactNode;
        Button: import("react").FC<any>;
        Select: import("react").FC<any>;
        translatedTexts?: {
            summary?: string | undefined;
            next?: string | undefined;
            total?: string | undefined;
            back?: string | undefined;
        } | undefined;
    }>;
};
export declare const PROVIDERS: {
    ConfigurableComponentsProvider: ({ children, configurableComponents, productAttributes, }: import("react").PropsWithChildren<import("./providers/configurable-components/types").ContextProps>) => import("react").JSX.Element;
    useConfigurableComponentsContext: () => import("./providers/configurable-components/types").ContextShape;
    BundledItemsProvider: ({ cart, productAttributes, children }: import("react").PropsWithChildren<import("./providers/bundled-items/types").ContextProps>) => import("react").JSX.Element;
    useBundledItemsContext: () => import("./providers/bundled-items/types").ContextShape;
};
export declare const hooks: {
    useChildComponents: () => {
        bundleComponentsIntoLineItems: <T extends import("@commercetools/frontend-domain-types/cart").Cart>(cart: T) => T;
        getBundledPrice: (lineItem: {
            id: string;
            price?: number | undefined;
            discountedPrice?: number | undefined;
        }) => {
            discountedPrice?: number | undefined;
            price?: number | undefined;
        };
        swrBundleMiddleware: import("swr/dist/_internal").Middleware;
    };
    useComponentsCart: (sdk: any, mutate: import("swr/dist/_internal").KeyedMutator<import("@commercetools/frontend-domain-types/cart").Cart>, businessUnitKey?: string | undefined, storeKey?: string | undefined) => {
        addComponents: (lineItems: {
            sku: string;
            count: number;
        }[]) => Promise<import("@commercetools/frontend-sdk/lib/types/SDKResponse").SDKResponse<unknown>>;
    };
};
//# sourceMappingURL=index.d.ts.map