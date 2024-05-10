import { Account } from '../../../shared/types';
import { Customer as commercetoolsCustomer } from '@commercetools/platform-sdk';

export const injectAccountMapper = (BaseAccountMapper: any): typeof BaseAccountMapper => {
  return class AccountMapper extends BaseAccountMapper {
    static commercetoolsCustomerToAccount: (commercetoolsCustomer: commercetoolsCustomer) => Account = (
      commercetoolsCustomer: commercetoolsCustomer,
    ) => {
      return {
        ...super.commercetoolsCustomerToAccount(commercetoolsCustomer),
        customerGroupId: commercetoolsCustomer.customerGroup?.id,
      } as Account;
    };
  };
};
