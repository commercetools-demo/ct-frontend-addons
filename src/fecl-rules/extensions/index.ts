import { MergableAction, DynamicPageHandlerAddOn, MergableDynamicHandlers } from '../../utils/types';
import { accountFilters } from './actionControllers/AccountController';
import { categoryFilters, productFilters } from './actionControllers/ProductController';
import { injectCategoryPageHandler, injectProductPageHandler } from './dynamicPageHandlers';
import { Configuration } from './types';

const productSearch: {
  actions: MergableAction<Configuration>[];
  dynamicPageHandlers: Record<string, DynamicPageHandlerAddOn<Configuration>>;
} = {
  actions: [
    {
      action: 'accountFilters',
      actionNamespace: 'account',
      hook: accountFilters,
      create: true,
    },
    {
      action: 'categoryFilters',
      actionNamespace: 'product',
      hook: categoryFilters,
      create: true,
    },
    {
      action: 'productFilters',
      actionNamespace: 'product',
      hook: productFilters,
      create: true,
    },
  ],
  dynamicPageHandlers: {
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
