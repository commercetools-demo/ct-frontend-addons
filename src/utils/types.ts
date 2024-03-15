import { ActionHandler, DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';
import { Dependencies as MinimumQuantityDependencies } from '../minimum-quantity/types';
import { Dependencies as SuperuserDependencies } from '../superuser/types';

export type UnionDependencies = MinimumQuantityDependencies | SuperuserDependencies ;

export type ActionWrapper<T> = (originalCb: ActionHandler, config?: T) => ActionHandler;
export type ActionCreator<T> = (config?: T) => ActionHandler;

export interface MergableAction<T> {
  actionNamespace: string;
  action: string;
  hook: ActionWrapper<T> | ActionCreator<T>;
  create?: boolean;
}

export interface AddOnRegistry<T> {
  actions: MergableAction<T>[];
  dataSources?: DataSources;
}

export interface GeneralConfiguration { 
  dependencies: UnionDependencies;
  props: Record<string, any>;
}

export interface DataSources {
  [key: string]: (
    config: DataSourceConfiguration,
    context: DataSourceContext,
  ) => Promise<{
    dataSourcePayload: any;
  }>;
}