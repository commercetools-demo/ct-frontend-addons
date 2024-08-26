import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  BaseApi: any;
  CartMapper: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
}
