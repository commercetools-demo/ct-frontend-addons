/// <reference types="react" />
export declare const COMPONENTS: {
    CartBrowser: import("react").FC<{
        setCart: (cartId: string, email?: string | undefined) => void;
        createSuperuserCart: () => void;
        cartId: string;
        className?: string | undefined;
        associates?: import("../../shared/businessUnit").Associate[] | undefined;
        translate: (translationKey: string) => string;
    }>;
    CartReassignButton: import("react").FC<{
        activeBusinessUnit?: import("../../shared/businessUnit").BusinessUnit | undefined;
        translate: (translationKey: string) => string;
        reassignCart: (accountId?: string | undefined, email?: string | undefined) => void;
        Dropdown: import("react").FC<any> & {
            Button: import("react").FC<any>;
            Options: import("react").FC<any>;
            Option: import("react").FC<any>;
        };
        className?: string | undefined;
        accountId?: string | undefined;
        cartAccountId?: string | undefined;
    }>;
};
export declare const PROVIDERS: {
    SuperuserProvider: ({ children, sdk }: {
        children?: import("react").ReactNode;
    } & {
        sdk: any;
    }) => import("react").JSX.Element;
    useSuperuserContext: () => import("./provider/types").SuperuserContextShape;
};
export declare const hooks: {
    useSuperuserCarts: (sdk: any, mutate: import("swr/dist/_internal").KeyedMutator<import("@commercetools/frontend-domain-types/cart").Cart>) => {
        setCart: (id: string, email?: string | undefined) => Promise<Partial<import("@commercetools/frontend-domain-types/cart").Cart>>;
        createSuperuserCart: () => Promise<Partial<import("@commercetools/frontend-domain-types/cart").Cart>>;
        reassignCart: (accountId?: string | undefined, email?: string | undefined) => Promise<Partial<import("@commercetools/frontend-domain-types/cart").Cart>>;
    };
};
export { SuperuserStatus } from './types';
//# sourceMappingURL=index.d.ts.map