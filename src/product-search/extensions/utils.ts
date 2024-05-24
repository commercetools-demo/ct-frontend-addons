import { Dependencies } from '../types';
import { injectProductApi } from './apis/ProductApi';

export const extractDependency = (dependency: string, dependencies?: Dependencies): any => {
  if (dependencies?.[dependency]) {
    switch (dependency) {
      case 'ProductApi':
        return injectProductApi(dependencies.ProductApi);
      case 'BaseApi':
        return injectBaseApi(dependencies.BaseApi);
    }
  }
};
