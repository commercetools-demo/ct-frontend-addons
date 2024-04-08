import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  BusinessUnitApi: any;
  CartApi: any;
  EmailApiFactory: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  props: {
    superuserRoleKey: string;
    cart: {
      customTypeKey: string;
      superuserEmailFieldKey: string;
      originalEmailFieldKey: string;
    };
  };
}
