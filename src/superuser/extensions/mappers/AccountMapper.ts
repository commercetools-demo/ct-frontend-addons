import { Locale } from '../../../utils/locale';
import { Account } from '../../../shared/types';
import { Customer as commercetoolsCustomer } from '@commercetools/platform-sdk';

export const injectAccountMapper = (BaseAccountMapper: any): typeof BaseAccountMapper => {
  return class AccountMapper extends BaseAccountMapper {
    static commercetoolsCustomerToAccount: (commercetoolsCustomer: commercetoolsCustomer, locale: Locale) => Account = (
      commercetoolsCustomer: commercetoolsCustomer,
      locale: Locale,
    ) => {
      return {
        ...super.commercetoolsCustomerToAccount(commercetoolsCustomer, locale),
        customerGroupId: commercetoolsCustomer.customerGroup?.id,
      } as Account;
    };
  };
};
