import { MergableAction, MergableDynamicHandlers, DataSources as DataSourcesType } from '../../utils/types';
import { Configuration } from '../types';
import { login, aNewAction } from './actionControllers/AccountController';
import { injectSampleHandlerHere } from './dynamic-page-handlers';
import dataSources from './dataSources';

const sampleModule: {
  actions: MergableAction<Configuration>[];
  dynamicPageHandlers: Record<string, MergableDynamicHandlers<Configuration>>;
  dataSources: DataSourcesType<Configuration>;
} = {
  dynamicPageHandlers: {
    'frontastic/name-of-the-hanler': injectSampleHandlerHere,
  },
  actions: [
    {
      action: 'login',
      actionNamespace: 'account',
      hook: login,
    },
    {
      action: 'aNewAction',
      actionNamespace: 'cart',
      hook: aNewAction,
      create: true,
    },
  ],
  dataSources: dataSources,
};

export default sampleModule;
