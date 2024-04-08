import { ActionCreator, ActionWrapper, DataSources as DataSourcesType, MergableAction } from '../../utils/types';
import { loginCSR, loginHookWithCSRCheck, logoutWithCSRCheck } from './actionControllers/AccountController';
import { Configuration } from '../types';
import dataSources from './dataSources';
import { changePrice, checkoutWithCSR, getOrders } from './actionControllers/CartController';

const superuser: {
  actions: MergableAction<Configuration>[];
  dataSources: DataSourcesType<Configuration>;
} = {
  actions: [
    {
      action: 'login',
      actionNamespace: 'account',
      hook: loginHookWithCSRCheck as ActionWrapper<Configuration>,
    },
    {
      action: 'logout',
      actionNamespace: 'account',
      hook: logoutWithCSRCheck as ActionWrapper<Configuration>,
    },
    {
      action: 'loginCSR',
      actionNamespace: 'account',
      hook: loginCSR as ActionCreator<Configuration>,
      create: true,
    },
    {
      action: 'checkout',
      actionNamespace: 'cart',
      hook: checkoutWithCSR as ActionWrapper<Configuration>,
    },
    {
      action: 'getOrders',
      actionNamespace: 'cart',
      hook: getOrders as ActionWrapper<Configuration>,
    },
    {
      action: 'changePrice',
      actionNamespace: 'cart',
      hook: changePrice as ActionCreator<Configuration>,
      create: true,
    },
  ],
  dataSources,
};

export default superuser;
