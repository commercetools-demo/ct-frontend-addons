import { MergableAction } from '../../utils/types';
import { Configuration } from '../types';
import { getAccount, login } from './actionControllers/AccountController';
import { addToCart, assignToStore, checkout } from './actionControllers/CartController';
import { getApiKey, getlocation, getStores } from './actionControllers/LocationController';

const storeContext: {
  actions: MergableAction<Configuration>[];
} = {
  actions: [
    {
      action: 'assignToStore',
      actionNamespace: 'cart',
      hook: assignToStore,
      create: true,
    },
    {
      action: 'getAccount',
      actionNamespace: 'account',
      hook: getAccount,
    },
    {
      action: 'login',
      actionNamespace: 'account',
      hook: login,
    },
    {
      action: 'checkout',
      actionNamespace: 'cart',
      hook: checkout,
    },
    {
      action: 'addToCart',
      actionNamespace: 'cart',
      hook: addToCart,
    },
    {
      action: 'getApiKey',
      actionNamespace: 'location',
      hook: getApiKey,
      create: true,
    },
    {
      action: 'getlocation',
      actionNamespace: 'location',
      hook: getlocation,
      create: true,
    },
    {
      action: 'getStores',
      actionNamespace: 'location',
      hook: getStores,
      create: true,
    },
  ],
};

export default storeContext;
