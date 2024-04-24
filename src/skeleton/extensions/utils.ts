import { Configuration, Dependencies } from '../types';
import { injectAccountApi } from './apis/AccountApi';

export const extractDependency = (dependency: keyof Dependencies, config?: Configuration): any => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case 'AccountApi':
        return injectAccountApi(config.dependencies.AccountApi);
      // add more cases here
    }
  }
};
