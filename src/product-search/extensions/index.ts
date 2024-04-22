import {
  MergableAction,
  DataSources as DataSourcesType,
  DynamicPageHandlerAddOn,
  MergableDynamicHandlers,
} from '../../utils/types';
import { getProduct, query, queryCategories, searchableAttributes } from './actionControllers/productController';
import { Configuration } from '../types';
import { injectCategoryPageHandler, injectProductPageHandler, injectProductSearchHandler } from './dynamicPageHandlers';

const productSearch: {
  actions: MergableAction<Configuration>[];
  dynamicPageHandlers: Record<string, DynamicPageHandlerAddOn<Configuration>>;
} = {
  actions: [
    {
      action: 'getProduct',
      actionNamespace: 'product',
      hook: getProduct,
    },
    {
      action: 'query',
      actionNamespace: 'product',
      hook: query,
    },
    {
      action: 'queryCategories',
      actionNamespace: 'product',
      hook: queryCategories,
    },
    {
      action: 'searchableAttributes',
      actionNamespace: 'product',
      hook: searchableAttributes,
    },
  ],
  // dataSources: dataSources,
  dynamicPageHandlers: {
    'frontastic/search': {
      hook: injectProductSearchHandler as MergableDynamicHandlers<Configuration>,
      create: false,
    },
    'frontastic/category': {
      hook: injectCategoryPageHandler as MergableDynamicHandlers<Configuration>,
      create: false,
    },
    'frontastic/product-detail-page': {
      hook: injectProductPageHandler as MergableDynamicHandlers<Configuration>,
      create: false,
    },
  },
};

export default productSearch;
