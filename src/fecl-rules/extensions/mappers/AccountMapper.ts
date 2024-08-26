import { Customer as commercetoolsCustomer } from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
import { Account } from '../../../shared/types';
import { Configuration } from '../types';

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
        addresses: this.commercetoolsAddressesToAddresses(
          commercetoolsCustomer.addresses,
          commercetoolsCustomer.defaultBillingAddressId,
          commercetoolsCustomer.defaultShippingAddressId,
          commercetoolsCustomer.billingAddressIds,
          commercetoolsCustomer.shippingAddressIds,
        ),
        customerGroupId: commercetoolsCustomer.customerGroup?.id,
        // @ts-ignore
        customerGroupAssignmentIds: commercetoolsCustomer.customerGroupAssignments?.map(
          (group) => group?.customerGroup?.id,
        ),
      } as Account;
    };
  };
};
