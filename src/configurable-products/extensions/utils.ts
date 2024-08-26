import { Configuration, Dependencies } from '../types';
import { injectCartApi } from './apis/CartApi';

export const extractDependency = (dependency: keyof Dependencies, config?: Configuration): any => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case 'CartApi':
        return injectCartApi(config?.dependencies.CartApi, config);
      case 'ProductApi':
        return config?.dependencies.ProductApi;
    }
  }
};
