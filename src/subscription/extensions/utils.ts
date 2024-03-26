import { Configuration, Dependencies } from '../types';
import { injectCartApi } from './apis/CartApi';
import { createSubscriptionApi } from './apis/SubscriptionApi';

export const extractDependency = (dependency: keyof Dependencies, configuration: Configuration): any => {
  if (configuration.dependencies?.[dependency]) {
    switch (dependency) {
      case 'CartApi':
        return injectCartApi(configuration.dependencies.CartApi);
      case 'ProductApi':
        return configuration.dependencies.ProductApi;
      case 'SubscriptionApi':
        return createSubscriptionApi(configuration.dependencies.BaseApi, configuration);
      case 'CaerMapper':
        return configuration.dependencies.CartMapper;
      case 'ProductMapper':
        return configuration.dependencies.ProductMapper;
    }
  }
};
