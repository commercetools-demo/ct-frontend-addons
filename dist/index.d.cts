import * as react from 'react';
import * as _commercetools_frontend_sdk_lib_types_SDKResponse from '@commercetools/frontend-sdk/lib/types/SDKResponse';
import * as swr_dist__internal from 'swr/dist/_internal';
import * as _commercetools_frontend_domain_types_cart from '@commercetools/frontend-domain-types/cart';
import { Cart, Order } from '@commercetools/frontend-domain-types/cart';
import * as _commercetools_frontend_domain_types_product from '@commercetools/frontend-domain-types/product';
import { Product, Variant } from '@commercetools/frontend-domain-types/product';
import * as _commercetools_platform_sdk from '@commercetools/platform-sdk';
import { Cart as Cart$1, ApprovalFlow as ApprovalFlow$1, ApprovalRule as ApprovalRule$1, ApprovalRuleDraft } from '@commercetools/platform-sdk';
import { Account } from '@commercetools/frontend-domain-types/account';
import { Currency } from '@commercetools/frontend-sdk/lib/types/Currency';

interface SuperUser {
    email: string;
    firstName: string;
    lastName: string;
}
interface SuperUserReturn {
    superUserData?: SuperUser;
}
interface SuperUserDatasource {
    superuser?: {
        dataSource?: {
            superUser?: SuperUser;
        };
    };
}
interface LineItem {
    lineItemId?: string;
}
interface Money {
    fractionDigits?: number;
    centAmount?: number;
    currencyCode?: string;
}

type UseStandalonePrice = {
    changePrice: (lineItemId: string, price: Money) => Promise<void>;
};

declare const PROVIDERS$2: {
    SuperUserProvider: react.FC<{
        children?: react.ReactNode;
    } & {
        sdk: any;
    }>;
    useSuperUserContext: () => SuperUserReturn;
};
declare const COMPONENTS$3: {
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
declare const HOOKS$1: {
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

declare namespace index$3 {
  export { COMPONENTS$3 as COMPONENTS, type SuperUserDatasource as DataSource, HOOKS$1 as HOOKS, PROVIDERS$2 as PROVIDERS };
}

interface ContextShape$1 {
    cart?: Cart;
    productAttributes: string[];
}
interface ContextProps$1 {
    cart?: Cart;
    productAttributes: string[];
}

interface ContextShape {
    configurableComponents?: Product[];
    selectedVariants: Variant[];
    productAttributes: string[];
    setSelectedVariants: (variants: Variant[]) => void;
}
interface ContextProps {
    configurableComponents?: Product[];
    productAttributes: string[];
}

declare const COMPONENTS$2: {
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
declare const PROVIDERS$1: {
    ConfigurableComponentsProvider: ({ children, configurableComponents, productAttributes, }: react.PropsWithChildren<ContextProps>) => react.JSX.Element;
    useConfigurableComponentsContext: () => ContextShape;
    BundledItemsProvider: ({ cart, productAttributes, children }: react.PropsWithChildren<ContextProps$1>) => react.JSX.Element;
    useBundledItemsContext: () => ContextShape$1;
};
declare const hooks$1: {
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
        swrBundleMiddleware: swr_dist__internal.Middleware;
    };
    useComponentsCart: (sdk: any, mutate: swr_dist__internal.KeyedMutator<_commercetools_frontend_domain_types_cart.Cart>, businessUnitKey?: string | undefined, storeKey?: string | undefined) => {
        addComponents: (lineItems: {
            sku: string;
            count: number;
        }[]) => Promise<_commercetools_frontend_sdk_lib_types_SDKResponse.SDKResponse<unknown>>;
    };
};

declare namespace index$2 {
  export { COMPONENTS$2 as COMPONENTS, PROVIDERS$1 as PROVIDERS, hooks$1 as hooks };
}

interface SuperuserStatus {
    isSuperuser?: boolean;
    carts: Cart$1[];
}

interface SuperuserContextShape {
    superuserStatus?: SuperuserStatus;
    setSuperuserCarts: (carts: SuperuserStatus['carts']) => void;
}

type Permission = 'AcceptMyQuotes' | 'AcceptOthersQuotes' | 'AddChildUnits' | 'CreateApprovalRules' | 'CreateMyCarts' | 'CreateMyOrdersFromMyCarts' | 'CreateMyOrdersFromMyQuotes' | 'CreateMyQuoteRequestsFromMyCarts' | 'CreateOrdersFromOthersCarts' | 'CreateOrdersFromOthersQuotes' | 'CreateOthersCarts' | 'CreateQuoteRequestsFromOthersCarts' | 'DeclineMyQuotes' | 'DeclineOthersQuotes' | 'DeleteMyCarts' | 'DeleteOthersCarts' | 'ReassignMyQuotes' | 'ReassignOthersQuotes' | 'RenegotiateMyQuotes' | 'RenegotiateOthersQuotes' | 'UpdateApprovalFlows' | 'UpdateApprovalRules' | 'UpdateAssociates' | 'UpdateBusinessUnitDetails' | 'UpdateMyCarts' | 'UpdateMyOrders' | 'UpdateMyQuoteRequests' | 'UpdateOthersCarts' | 'UpdateOthersOrders' | 'UpdateOthersQuoteRequests' | 'UpdateParentUnit' | 'ViewMyCarts' | 'ViewMyOrders' | 'ViewMyQuoteRequests' | 'ViewMyQuotes' | 'ViewOthersCarts' | 'ViewOthersOrders' | 'ViewOthersQuoteRequests' | 'ViewOthersQuotes';
interface AssociateRole {
    key?: string;
    name?: string;
    permissions?: Permission[];
}
interface Associate extends Account {
    roles?: AssociateRole[];
}
interface BusinessUnit {
    businessUnitId?: string;
    key?: string;
    name?: string;
    contactEmail?: string;
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
    associates?: Associate[];
    parentUnit?: BusinessUnit;
    topLevelUnit?: BusinessUnit;
    version?: number;
}

declare const COMPONENTS$1: {
    CartBrowser: react.FC<{
        setCart: (cartId: string, email?: string | undefined) => void;
        createSuperuserCart: () => void;
        cartId: string;
        className?: string | undefined;
        associates?: Associate[] | undefined;
        translate: (translationKey: string) => string;
    }>;
    CartReassignButton: react.FC<{
        activeBusinessUnit?: BusinessUnit | undefined;
        translate: (translationKey: string) => string;
        reassignCart: (accountId?: string | undefined, email?: string | undefined) => void;
        Dropdown: react.FC<any> & {
            Button: react.FC<any>;
            Options: react.FC<any>;
            Option: react.FC<any>;
        };
        className?: string | undefined;
        accountId?: string | undefined;
        cartAccountId?: string | undefined;
    }>;
};
declare const PROVIDERS: {
    SuperuserProvider: ({ children, sdk }: {
        children?: react.ReactNode;
    } & {
        sdk: any;
    }) => react.JSX.Element;
    useSuperuserContext: () => SuperuserContextShape;
};
declare const hooks: {
    useSuperuserCarts: (sdk: any, mutate: swr_dist__internal.KeyedMutator<_commercetools_frontend_domain_types_cart.Cart>) => {
        setCart: (id: string, email?: string | undefined) => Promise<Partial<_commercetools_frontend_domain_types_cart.Cart>>;
        createSuperuserCart: () => Promise<Partial<_commercetools_frontend_domain_types_cart.Cart>>;
        reassignCart: (accountId?: string | undefined, email?: string | undefined) => Promise<Partial<_commercetools_frontend_domain_types_cart.Cart>>;
    };
};

declare const index$1_PROVIDERS: typeof PROVIDERS;
type index$1_SuperuserStatus = SuperuserStatus;
declare const index$1_hooks: typeof hooks;
declare namespace index$1 {
  export { COMPONENTS$1 as COMPONENTS, index$1_PROVIDERS as PROVIDERS, type index$1_SuperuserStatus as SuperuserStatus, index$1_hooks as hooks };
}

interface PaginatedResult<T> {
    total?: number;
    previousCursor?: string;
    nextCursor?: string;
    count: number;
    items: T[];
}

type ApprovalFlow = ApprovalFlow$1 & {
    order: Order & {
        orderNumber?: string;
    };
};

type ApprovalRule = ApprovalRule$1;

interface Options {
    cursor?: string;
    limit?: number;
    ids?: string[];
    states?: string[];
    createdFrom?: string;
    createdTo?: string;
    predicate?: string;
}

interface UseApprovals {
    getApprovalRules: (options: Options) => Promise<PaginatedResult<ApprovalRule>>;
    activateRule: (id: string) => Promise<ApprovalRule>;
    deactivateRule: (id: string) => Promise<ApprovalRule>;
    createRule: (payload: ApprovalRuleDraft) => Promise<ApprovalRule>;
    duplicateRule: (approvalRuleId: string, businessUnitKeys: string[]) => Promise<any>;
    updateRule: (approvalRuleId: string, payload: Partial<ApprovalRuleDraft>) => Promise<ApprovalRule>;
    getApprovalFlowByOrderId: (orderId: string) => Promise<ApprovalFlow>;
    getApprovalFlowById: (approvalFlowId: string) => Promise<ApprovalFlow>;
    getApprovalFlows: (options: Options) => Promise<PaginatedResult<ApprovalFlow>>;
    approveFlow: (approvalFlowId: string) => Promise<ApprovalFlow>;
    rejectFlow: (approvalFlowId: string, reason?: string) => Promise<ApprovalFlow>;
}

type RuleComponents$1 = {
    Select: any;
    Button: any;
    InfoBanner: any;
    PreviousPageLink: any;
    Input: any;
    Tag: any;
    RefinementDropdown: any;
    Label: any;
    Checkbox: any;
};

interface Transaction {
    subtotal: {
        centAmount: number;
        currencyCode: Currency;
        fractionDigits: number;
    };
    discount: {
        centAmount: number;
        currencyCode: Currency;
        fractionDigits: number;
    };
    tax: {
        centAmount: number;
        currencyCode: Currency;
        fractionDigits: number;
    };
    shipping: {
        centAmount: number;
        currencyCode: Currency;
        fractionDigits: number;
        isEstimated?: boolean;
    };
    total: {
        centAmount: number;
        currencyCode: Currency;
        fractionDigits: number;
    };
}

type RuleComponents = {
    SearchInput: any;
    Dropdown: any;
    DatePicker: any;
    RefinementDropdown: any;
    Drawer: any;
    Button: any;
    Accordion: any;
    Radio: any;
    Checkbox: any;
    Table: any;
    Link: any;
    Tag: any;
};

interface FlowComponents {
    SearchInput: any;
    Dropdown: any;
    DatePicker: any;
    RefinementDropdown: any;
    Drawer: any;
    Button: any;
    Accordion: any;
    Radio: any;
    Checkbox: any;
    Table: any;
    Link: any;
    Tag: any;
}

declare const COMPONENTS: {
    ApprovalFlowsPanel: ({ businessUnitKey, storeKey, sdk, components, translate, }: {
        businessUnitKey?: string | undefined;
        storeKey?: string | undefined;
        sdk: any;
        translate: (key: string) => string;
        components: FlowComponents;
    }) => react.JSX.Element | null;
    ApprovalRulesPanel: ({ businessUnitKey, storeKey, sdk, components, permissions, translate, }: {
        businessUnitKey?: string | undefined;
        storeKey?: string | undefined;
        sdk: any;
        translate: (key: string) => string;
        permissions?: Record<string, boolean> | undefined;
        components: RuleComponents;
    }) => react.JSX.Element | null;
    ApprovalFlowsDetails: ({ sdk, activeBusinessUnit, storeKey, flow, translate, calculateTransaction, components, accountId, permissions, }: {
        sdk: any;
        activeBusinessUnit?: any;
        storeKey?: string | undefined;
        translate: (translationKey: string) => string;
        calculateTransaction: (cart: Partial<_commercetools_frontend_domain_types_cart.Cart>) => Transaction;
        flow: ApprovalFlow;
        components: {
            Button: any;
            InfoBanner: any;
            PreviousPageLink: any;
            Input: any;
            Tag: any;
        };
        accountId?: string | undefined;
        permissions?: Record<string, boolean> | undefined;
    }) => react.JSX.Element | null;
    ApprovalRulesDetails: ({ components, sdk, rule, translate, roleOptions, activeBusinessUnit, permissions, storeKey, isEditing, }: {
        isEditing?: boolean | undefined;
        sdk: any;
        activeBusinessUnit?: any;
        storeKey?: string | undefined;
        translate: (translationKey: string) => string;
        rule: _commercetools_platform_sdk.ApprovalRule;
        roleOptions?: {
            value: string;
            name: string;
        }[] | undefined;
        components: RuleComponents$1;
        permissions?: Record<string, boolean> | undefined;
    }) => react.JSX.Element;
};
declare const HOOKS: {
    useApprovals: (sdk: any, businessUnitKey?: string | undefined, storeKey?: string | undefined) => UseApprovals;
};

type index_ApprovalFlow = ApprovalFlow;
type index_ApprovalRule = ApprovalRule;
declare const index_COMPONENTS: typeof COMPONENTS;
declare const index_HOOKS: typeof HOOKS;
declare namespace index {
  export { type index_ApprovalFlow as ApprovalFlow, type index_ApprovalRule as ApprovalRule, index_COMPONENTS as COMPONENTS, index_HOOKS as HOOKS };
}

export { index as ApprovalWorkflows, index$2 as ConfigurableProducts, index$1 as SuperuserB2BFrontend, index$3 as SuperuserFrontend };
