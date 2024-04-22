import { ExtensionRegistry } from '@frontastic/extension-types';

interface Dependencies$4 extends Record<string, any> {
    CartApi: any;
    AccountApi: any;
    CartMapper: any;
    AccountMapper: any;
}
interface Configuration$4 extends GeneralConfiguration {
    dependencies: Dependencies$4;
    props: {
        csrCustomerGroupId: string;
        csrCustomTypeKey: string;
        csrCustomFieldKey: string;
    };
}

interface Dependencies$3 extends Record<string, any> {
    BusinessUnitApi: any;
    CartApi: any;
    EmailApiFactory: any;
}
interface Configuration$3 extends GeneralConfiguration {
    dependencies: Dependencies$3;
    props: {
        superuserRoleKey: string;
        cart: {
            customTypeKey: string;
            superuserEmailFieldKey: string;
            originalEmailFieldKey: string;
        };
    };
}

interface Dependencies$2 extends Record<string, any> {
    CartApi: any;
    ProductApi: any;
}
interface Configuration$2 extends GeneralConfiguration {
    dependencies: Dependencies$2;
    props: {
        lineItem: {
            customTypeKey: string;
            parentIdCustomFieldKey: string;
        };
        product: {
            attributeName: string;
            productDetailsPageRegex: RegExp;
        };
    };
}

interface Dependencies$1 extends Record<string, any> {
    BaseApi: any;
    CartMapper: any;
}
interface Configuration$1 extends GeneralConfiguration {
    dependencies: Dependencies$1;
}

type UnionDependencies = Dependencies | Dependencies$4 | Dependencies$3 | Dependencies$2 | Dependencies$1;
interface GeneralConfiguration {
    dependencies: UnionDependencies;
    props: Record<string, any>;
}

interface Dependencies extends Record<string, any> {
    CartApi: any;
}
interface Configuration extends GeneralConfiguration {
    dependencies: Dependencies;
    props: {
        attributeName?: string;
    };
}

declare enum Module {
    MinimumQuantity = "minimum-quantity",
    Superuser = "superuser",
    SuperuserB2B = "superuser-b2b",
    ConfigurableProducts = "configurable-products",
    ApprovalWorkflows = "approval-workflows"
}
interface ModuleConfiguration {
    modules: {
        [Module.MinimumQuantity]?: Configuration;
        [Module.Superuser]?: Configuration$4;
        [Module.SuperuserB2B]?: Configuration$3;
        [Module.ConfigurableProducts]?: Configuration$2;
        [Module.ApprovalWorkflows]?: Configuration$1;
    };
}

declare const injectExtensionsRegistry: (extensionRegirstry: ExtensionRegistry, configuration?: ModuleConfiguration) => ExtensionRegistry;

export { injectExtensionsRegistry };
