import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  ProductApi: any;
  BaseApi: any;
  ProductMapper: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  props: {
    useStoreProducts: boolean;
  }
}
