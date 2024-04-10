import { Configuration, Dependencies } from '../types';
import { injectCartApi } from './apis/CartApi';

export const extractDependency = (dependency: keyof Dependencies, config?: Configuration): any => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case 'BusinessUnitApi':
        return config?.dependencies.BusinessUnitApi
      case 'CartApi':
        return injectCartApi(config.dependencies.CartApi);
      case 'CartMapper':
        return config?.dependencies.CartMapper
      case 'EmailApiFactory':
        return config?.dependencies.EmailApiFactory
    }
  }
};


