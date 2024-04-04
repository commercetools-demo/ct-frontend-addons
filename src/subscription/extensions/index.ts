import { ActionCreator, MergableAction, MergableDynamicHandlers } from '../../utils/types';
import { Configuration } from '../types';
// import { addToCart } from './actionControllers/CartController';
import { getAllSubscriptions } from './actionControllers/SubscriptionController';
import { injectProductDetailPageHandler } from './dynamic-page-handlers';

const subscription: {
  actions: MergableAction<Configuration>[];
  dynamicPageHandler: Record<string, MergableDynamicHandlers<Configuration>>;
} = {
  actions: [
    // {
    //   action: 'addToCart',
    //   actionNamespace: 'cart',
    //   hook: addToCart as ActionWrapper<Configuration>,
    // },
    {
      action: 'getAllSubscriptions',
      actionNamespace: 'subscription',
      hook: getAllSubscriptions as ActionCreator<Configuration>,
      create: true,
    },
  ],
  dynamicPageHandler: {
    'frontastic/product-page': injectProductDetailPageHandler
  },
};

export default subscription;
