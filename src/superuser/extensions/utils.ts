import { Configuration, Dependencies } from '../types';
import { injectAccountApi } from './apis/AccountApi';
import { injectCartApi } from './apis/CartApi';
import { injectAccountMapper } from './mappers/AccountMapper';
import { injectCartMapper } from './mappers/CartMapper';

export const extractDependency = (dependency: keyof Dependencies, config?: Configuration): any => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case 'CartApi':
        return injectCartApi(config?.dependencies.CartApi, extractDependency('CartMapper', config));
      case 'AccountApi':
        return injectAccountApi(config?.dependencies.AccountApi, extractDependency('AccountMapper', config));
      case 'AccountMapper':
        return injectAccountMapper(config?.dependencies.AccountMapper);
      case 'CartMapper':
        return injectCartMapper(config?.dependencies.CartMapper);
    }
  }
};
