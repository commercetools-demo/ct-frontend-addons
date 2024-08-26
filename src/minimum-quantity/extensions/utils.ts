import { Dependencies } from '../types';
import { injectCartApi } from './apis/CartApi';

export const extractDependency = (dependency: string, dependencies?: Dependencies): any => {
  if (dependencies?.[dependency]) {
    return injectCartApi(dependencies[dependency]);
  }
};
