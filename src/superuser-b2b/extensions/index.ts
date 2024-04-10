import { MergableAction, MergableDynamicHandlers } from '../../utils/types';
import { Configuration } from '../types';
import { getSuperuser, login, logout } from './actionControllers/AccountController';
import {
  checkout,
  createSuperuserCart,
  getAllSuperuserCartsInStore,
  reassignCart,
  setCart,
} from './actionControllers/CartController';
import { createQuoteRequest } from './actionControllers/QuoteController';
import { injectOrderPageHandler, injectThankYouPageHandler } from './dynamic-page-handlers';

const superUserB2B: {
  actions: MergableAction<Configuration>[];
  dynamicPageHandlers: Record<string, MergableDynamicHandlers<Configuration>>;
} = {
  dynamicPageHandlers: {
    'frontastic/thank-you-page': injectThankYouPageHandler,
    'frontastic/order-page': injectOrderPageHandler,
  },
  actions: [
    {
      action: 'login',
      actionNamespace: 'account',
      hook: login,
    },
    {
      action: 'getAllSuperuserCartsInStore',
      actionNamespace: 'cart',
      hook: getAllSuperuserCartsInStore,
      create: true,
    },
    {
      action: 'getSuperuser',
      actionNamespace: 'account',
      hook: getSuperuser,
      create: true,
    },
    {
      action: 'logout',
      actionNamespace: 'account',
      hook: logout,
    },
    {
      action: 'setCart',
      actionNamespace: 'cart',
      hook: setCart,
      create: true,
    },
    {
      action: 'createSuperuserCart',
      actionNamespace: 'cart',
      hook: createSuperuserCart,
      create: true,
    },
    {
      action: 'checkout',
      actionNamespace: 'cart',
      hook: checkout,
    },
    {
      action: 'reassignCart',
      actionNamespace: 'cart',
      hook: reassignCart,
    },
    {
      action: 'createQuoteRequest',
      actionNamespace: 'quote',
      hook: createQuoteRequest,
    },
  ],
};

export default superUserB2B;
