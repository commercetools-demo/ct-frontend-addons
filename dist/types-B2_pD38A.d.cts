import { ActionHandler, Request, DynamicPageContext, DynamicPageSuccessResult, DynamicPageRedirectResult, DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';

interface Dependencies$1 extends Record<string, any> {
    CartApi: any;
    AccountApi: any;
    CartMapper: any;
    AccountMapper: any;
}
interface Configuration$1 extends GeneralConfiguration {
    dependencies: Dependencies$1;
    props: {
        csrCustomerGroupId: string;
        csrCustomTypeKey: string;
        csrCustomFieldKey: string;
    };
}

type UnionDependencies = Dependencies | Dependencies$1;
type ActionWrapper<T> = (originalCb: ActionHandler, config?: T) => ActionHandler;
type ActionCreator<T> = (config?: T) => ActionHandler;
interface MergableAction<T> {
    actionNamespace: string;
    action: string;
    hook: ActionWrapper<T> | ActionCreator<T>;
    create?: boolean;
}
type MergableDynamicHandlers<T> = (request: Request, context: DynamicPageContext, originalResult: DynamicPageSuccessResult, config: T) => Promise<DynamicPageSuccessResult | DynamicPageRedirectResult | null>;
interface AddOnRegistry<T> {
    actions: MergableAction<T>[];
    dataSources?: DataSources;
    dynamicPageHandler?: Record<string, MergableDynamicHandlers<T>>;
}
interface GeneralConfiguration {
    dependencies: UnionDependencies;
    props: Record<string, any>;
}
interface DataSources {
    [key: string]: (config: DataSourceConfiguration, context: DataSourceContext) => Promise<{
        dataSourcePayload: any;
    }>;
}
type DynamicPagehandler = (request: Request, context: DynamicPageContext) => Promise<DynamicPageSuccessResult | DynamicPageRedirectResult | null>;

interface Dependencies extends Record<string, any> {
    CartApi: any;
}
interface Configuration extends GeneralConfiguration {
    dependencies: Dependencies;
    props: {
        attributeName?: string;
    };
}

export type { AddOnRegistry as A, Configuration as C, Dependencies as D, GeneralConfiguration as G, MergableAction as M, UnionDependencies as U, Configuration$1 as a, MergableDynamicHandlers as b, DataSources as c, Dependencies$1 as d, ActionWrapper as e, ActionCreator as f, DynamicPagehandler as g };
