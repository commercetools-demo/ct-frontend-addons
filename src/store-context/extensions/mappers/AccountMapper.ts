import { Customer as commercetoolsCustomer } from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
import { Account } from '../../../shared/types';
import { Configuration } from '../../types';

export const injectAccountMapper = (BaseAccountMapper: any, config?: Configuration): typeof BaseAccountMapper => {
  return class AccountMapper extends BaseAccountMapper {
    static commercetoolsCustomerToAccount: (commercetoolsCustomer: commercetoolsCustomer, locale: Locale) => Account = (
      commercetoolsCustomer: commercetoolsCustomer,
      locale: Locale,
    ) => {
      return {
        accountId: commercetoolsCustomer.id,
        email: commercetoolsCustomer.email,
        salutation: commercetoolsCustomer?.salutation,
        firstName: commercetoolsCustomer?.firstName,
        lastName: commercetoolsCustomer?.lastName,
        birthday: commercetoolsCustomer?.dateOfBirth ? new Date(commercetoolsCustomer.dateOfBirth) : undefined,
        confirmed: commercetoolsCustomer.isEmailVerified,
        addresses: this.commercetoolsCustomerToAddresses(commercetoolsCustomer, locale),
        distributionChannelId: commercetoolsCustomer.custom?.fields?.distributionChannelId,
        supplyChannelId: commercetoolsCustomer.custom?.fields?.supplyChannelId,
        storeKey: commercetoolsCustomer.custom?.fields?.storeKey,
        storeId: commercetoolsCustomer.custom?.fields?.storeId,
        storeName: commercetoolsCustomer.custom?.fields?.storeName,
        persisted: commercetoolsCustomer.custom?.fields?.persisted,
      } as Account;
    };
  };
};
