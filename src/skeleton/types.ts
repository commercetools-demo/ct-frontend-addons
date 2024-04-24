import { GeneralConfiguration } from '../utils/types';

// Api / mapper dependencies
export interface Dependencies extends Record<string, any> {
  AccountApi: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  // props that you don't want to hardcode
  props: {};
}
