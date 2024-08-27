import { GeneralConfiguration } from '../../utils/types';

export interface Dependencies extends Record<string, any> {
  ProductApi: any;
  ProductMapper: any;
  AccountApi: any;
  AccountMapper: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  props: {
    vipCustomerGroupId?: string;
  };
}
