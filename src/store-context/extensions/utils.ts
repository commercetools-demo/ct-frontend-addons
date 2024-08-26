import { Configuration } from '../types';
import { injectAccountApi } from './apis/AccountApi';
import { injectCartApi } from './apis/CartApi';
import { injectStoreApi } from './apis/StoreApi';
import { injectAccountMapper } from './mappers/AccountMapper';

export const extractDependency = (dependency: string, config?: Configuration): any => {
  if (config) {
    switch (dependency) {
      case 'StoreApi':
        return injectStoreApi(config?.dependencies.BaseApi, config);
      case 'CartApi':
        return injectCartApi(config?.dependencies.CartApi, config);
      case 'ProductMapper':
        return config?.dependencies.ProductMapper;
      case 'AccountApi':
        return injectAccountApi(config?.dependencies.AccountApi, config);
      case 'AccountMapper':
        return injectAccountMapper(config?.dependencies.AccountMapper, config);
    }
  }
};
