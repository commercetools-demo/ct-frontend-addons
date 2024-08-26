import {
  ActionHandler,
  DataSourceConfiguration,
  DataSourceContext,
  DataSourceResult,
  DynamicPageContext,
  DynamicPageRedirectResult,
  DynamicPageSuccessResult,
  Request,
} from '@frontastic/extension-types';
import { Dependencies as MinimumQuantityDependencies } from '../minimum-quantity/types';
import { Dependencies as SuperuserDependencies } from '../superuser/types';
import { Dependencies as SuperuserB2BDependencies } from '../superuser-b2b/types';
import { Dependencies as ConfigurableProductsDependencies } from '../configurable-products/types';
import { Dependencies as ApprovalWorkflowsDependencies } from '../approval-workflows/types';
import { Dependencies as ProductSeaechDependencies } from '../product-search/types';
import { Dependencies as StoreContextDependencies } from '../store-context/types';

export type UnionDependencies =
  | MinimumQuantityDependencies
  | SuperuserDependencies
  | SuperuserB2BDependencies
  | ConfigurableProductsDependencies
  | ProductSeaechDependencies
  | StoreContextDependencies
  | ApprovalWorkflowsDependencies;

export type ActionWrapper<T> = (originalCb: ActionHandler, config?: T) => ActionHandler;
export type ActionCreator<T> = (config?: T) => ActionHandler;
export type DatasourceWrapper<T> = (originalCb: DatasourceSig, config?: T) => DatasourceSig;
export type DatasourceCreator<T> = (config?: T) => DatasourceSig;
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export interface MergableAction<T> {
  actionNamespace: string;
  action: string;
  hook: ActionWrapper<T> | ActionCreator<T>;
  create?: boolean;
}
export type MergableDynamicHandlers<T> = (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: T,
) => Promise<DynamicPageSuccessResult | DynamicPageRedirectResult | null>;

export type NewDynamicHandlers<T> = (
  request: Request,
  context: DynamicPageContext,
  config: T,
) => Promise<DynamicPageSuccessResult | DynamicPageRedirectResult | null>;

export type DynamicPageHandlerAddOn<T> = {
  create?: boolean;
  hook: MergableDynamicHandlers<T> | NewDynamicHandlers<T>;
};

export interface AddOnRegistry<T> {
  actions: MergableAction<T>[];
  dataSources?: DataSources<T>;
  dynamicPageHandlers?: Record<string, DynamicPageHandlerAddOn<T>>;
}

export interface GeneralConfiguration {
  dependencies: UnionDependencies;
  props: Record<string, any>;
}

export type DatasourceSig = (
  config: DataSourceConfiguration,
  context: DataSourceContext,
) => Promise<DataSourceResult> | DataSourceResult;

export interface DataSources<T> {
  [key: string]: {
    create?: boolean;
    hook: DatasourceWrapper<T> | DatasourceCreator<T>;
  };
}

export type DynamicPagehandler = (
  request: Request,
  context: DynamicPageContext,
) => Promise<DynamicPageSuccessResult | DynamicPageRedirectResult | null>;

export interface PaginatedResult<T> {
  total?: number;
  previousCursor?: string;
  nextCursor?: string;
  count: number;
  items: T[];
}
