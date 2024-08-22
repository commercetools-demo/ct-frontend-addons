import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  AccountApi: any;
  BaseApi: any;
  CartApi: any;
  AccountMapper: any;
  ProductMapper: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  props: {
    customerCustomTypeKey: string;
  };
}
