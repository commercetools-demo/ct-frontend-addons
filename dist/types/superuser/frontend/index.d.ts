/// <reference types="react" />
export declare const PROVIDERS: {
    SuperUserProvider: import("react").FC<{
        children?: import("react").ReactNode;
    } & {
        sdk: any;
    }>;
    useSuperUserContext: () => import("./types").SuperUserReturn;
};
export declare const COMPONENTS: {
    StandalonePriceInput: ({ item, price, sdk, buttonText, wrapperClassName, priceClassName, buttonClassName, buttonWrapperClassName, }: {
        item: import("./types").LineItem;
        price?: import("./types").Money | undefined;
        sdk: any;
        buttonText?: string | undefined;
        wrapperClassName?: string | undefined;
        priceClassName?: string | undefined;
        buttonClassName?: string | undefined;
        buttonWrapperClassName?: string | undefined;
    }) => import("react").JSX.Element;
};
export declare const HOOKS: {
    useStandalonePrice: ({ sdk, mutatePath, }: {
        sdk: any;
        mutatePath?: string | undefined;
    }) => import("./hooks/standalone-price").UseStandalonePrice;
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
export { SuperUserDatasource as DataSource } from './types';
//# sourceMappingURL=index.d.ts.map