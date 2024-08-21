import { Dependencies } from '../types';
import { injectBaseApi } from './apis/BaseApi';
import { injectProductApi } from './apis/ProductApi';
import { injectProductMapper } from './mappers/ProductMapper';

export const extractDependency = (dependency: string, dependencies?: Dependencies): any => {
  if (dependencies?.[dependency]) {
    switch (dependency) {
      case 'ProductApi':
        return injectProductApi(dependencies.ProductApi, dependencies);
      case 'BaseApi':
        return injectBaseApi(dependencies.BaseApi);
      case 'ProductMapper':
        return injectProductMapper(dependencies.ProductMapper);
    }
  }
};
