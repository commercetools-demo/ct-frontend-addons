import { Configuration } from './types';
import { injectAccountApi } from './apis/AccountApi';
import { injectAccountMapper } from './mappers/AccountMapper';
import { injectProductMapper } from './mappers/ProductMapper';
import { injectProductApi } from './apis/ProductApi.ts';

export const extractDependency = (dependency: string, config?: Configuration): any => {
  if (config) {
    switch (dependency) {
      case 'AccountApi':
        return injectAccountApi(config?.dependencies.AccountApi, config);
      case 'ProductApi':
        return injectProductApi(config?.dependencies.ProductApi, config);
      case 'AccountMapper':
        return injectAccountMapper(config?.dependencies.AccountMapper, config);
      case 'ProductMapper':
        return injectProductMapper(config?.dependencies.ProductMapper, config);
    }
  }
};
