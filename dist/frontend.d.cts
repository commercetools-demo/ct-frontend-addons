import { UseStandalonePrice } from './superuser/frontend/hooks/standalone-price.cjs';
import { SuperUser, SuperUserReturn, LineItem, Money, SuperUserDatasource } from './superuser/frontend/types.cjs';
import * as react from 'react';

declare const PROVIDERS: {
    SuperUserProvider: react.FC<{
        children?: react.ReactNode;
    } & {
        initialSuperUserData?: SuperUser | undefined;
    }>;
    useSuperUserContext: () => SuperUserReturn;
};
declare const COMPONENTS: {
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

declare const index_COMPONENTS: typeof COMPONENTS;
declare const index_HOOKS: typeof HOOKS;
declare const index_PROVIDERS: typeof PROVIDERS;
declare namespace index {
  export { index_COMPONENTS as COMPONENTS, SuperUserDatasource as DataSource, index_HOOKS as HOOKS, index_PROVIDERS as PROVIDERS };
}

export { index as SuperuserFrontend };
