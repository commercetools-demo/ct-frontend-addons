import { UseStandalonePrice } from './superuser/frontend/hooks/standalone-price.cjs';
import { SuperUser, SuperUserReturn, LineItem, Money, SuperUserDatasource } from './superuser/frontend/types.cjs';
import * as react from 'react';
import * as swr_dist__internal from 'swr/dist/_internal';
import * as _commercetools_frontend_domain_types_cart from '@commercetools/frontend-domain-types/cart';
import { ContextProps as ContextProps$1, ContextShape as ContextShape$1 } from './configurable-products/frontend/providers/bundled-items/types.cjs';
import { ContextProps, ContextShape } from './configurable-products/frontend/providers/configurable-components/types.cjs';
import * as _commercetools_frontend_domain_types_product from '@commercetools/frontend-domain-types/product';

declare const PROVIDERS$1: {
    SuperUserProvider: react.FC<{
        children?: react.ReactNode;
    } & {
        initialSuperUserData?: SuperUser | undefined;
    }>;
    useSuperUserContext: () => SuperUserReturn;
};
declare const COMPONENTS$1: {
    StandalonePriceInput: ({ item, price, sdk, buttonText, wrapperClassName, priceClassName, buttonClassName, buttonWrapperClassName, }: {
        item: LineItem;
        price?: Money | undefined;
        sdk: any;
        buttonText?: string | undefined;
        wrapperClassName?: string | undefined;
        priceClassName?: string | undefined;
        buttonClassName?: string | undefined;
        buttonWrapperClassName?: string | undefined;
    }) => react.JSX.Element;
};
declare const HOOKS: {
    useStandalonePrice: ({ sdk, mutatePath, }: {
        sdk: any;
        mutatePath?: string | undefined;
    }) => UseStandalonePrice;
    useCSRLoginForm: ({ sdk, data, setError, formatMessage, onLogin, }: {
        sdk: any;
        data: any;
        setError: (message: string) => void;
        formatMessage: (params: {
            id: string;
            defaultMessage: string;
        }) => string;
        onLogin?: (() => void) | undefined;
    }) => {
        isCSRLogin: boolean;
        csrErrorHandler: (error: Error) => void;
        login: () => void;
    };
};

declare const index$1_HOOKS: typeof HOOKS;
declare namespace index$1 {
  export { COMPONENTS$1 as COMPONENTS, SuperUserDatasource as DataSource, index$1_HOOKS as HOOKS, PROVIDERS$1 as PROVIDERS };
}

declare const COMPONENTS: {
    BundledItems: react.FC<{
        item: _commercetools_frontend_domain_types_product.Product & {
            id: string;
        };
    }>;
    ConfigurableComponents: react.FC<{
        product: any;
        className?: string | undefined;
        children: ({ isDisabled }: {
            isDisabled: boolean;
        }) => react.ReactNode;
        Button: react.FC<any>;
        Select: react.FC<any>;
        translatedTexts?: {
            summary?: string | undefined;
            next?: string | undefined;
            total?: string | undefined;
            back?: string | undefined;
        } | undefined;
    }>;
};
declare const PROVIDERS: {
    ConfigurableComponentsProvider: ({ children, configurableComponents, productAttributes, }: react.PropsWithChildren<ContextProps>) => react.JSX.Element;
    useConfigurableComponentsContext: () => ContextShape;
    BundledItemsProvider: ({ cart, productAttributes, children }: react.PropsWithChildren<ContextProps$1>) => react.JSX.Element;
    useBundledItemsContext: () => ContextShape$1;
};
declare const hooks: {
    useChildComponents: () => {
        bundleComponentsIntoLineItems: <T extends _commercetools_frontend_domain_types_cart.Cart>(cart: T) => T;
        getBundledPrice: (lineItem: {
            id: string;
            price?: number | undefined;
            discountedPrice?: number | undefined;
        }) => {
            discountedPrice?: number | undefined;
            price?: number | undefined;
        };
    };
    useComponentsCart: (sdk: any, businessUnitKey?: string | undefined, storeKey?: string | undefined) => {
        addComponents: (lineItems: {
            sku: string;
            count: number;
        }[], mutate: swr_dist__internal.KeyedMutator<_commercetools_frontend_domain_types_cart.Cart | undefined>) => Promise<void>;
    };
};

declare const index_COMPONENTS: typeof COMPONENTS;
declare const index_PROVIDERS: typeof PROVIDERS;
declare const index_hooks: typeof hooks;
declare namespace index {
  export { index_COMPONENTS as COMPONENTS, index_PROVIDERS as PROVIDERS, index_hooks as hooks };
}

export { index as ConfigurableProducts, index$1 as SuperuserFrontend };
