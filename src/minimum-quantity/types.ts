import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  CartApi: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  props: {
    attributeName?: string;
  };
}
