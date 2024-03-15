import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  CartApi: any;
  AccountApi: any;
  CartMapper: any;
  AccountMapper: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  props: {
    csrCustomerGroupId: string;
    csrCustomTypeKey: string;
    csrCustomFieldKey: string;
  }
}
