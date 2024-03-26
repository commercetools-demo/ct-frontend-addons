import { ActionHandler, DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';

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
interface AddOnRegistry<T> {
    actions: MergableAction<T>[];
    dataSources?: DataSources;
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

interface Dependencies extends Record<string, any> {
    CartApi: any;
}
interface Configuration extends GeneralConfiguration {
    dependencies: Dependencies;
    props: {
        attributeName?: string;
    };
}

export type { AddOnRegistry as A, Configuration as C, Dependencies as D, GeneralConfiguration as G, MergableAction as M, UnionDependencies as U, Configuration$1 as a, DataSources as b, Dependencies$1 as c, ActionWrapper as d, ActionCreator as e };
