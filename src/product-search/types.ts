import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  ProductApi: any;
  BaseAPi: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
}
