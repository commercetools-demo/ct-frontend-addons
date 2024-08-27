import { ExternalError } from '../../../utils/Errors';
import { FilterField, Product } from '@commercetools/frontend-domain-types/product';
import { extractDependency } from '../utils';
import { Configuration } from '../types';
import { Account } from '@commercetools/frontend-domain-types/account';
import { AccountPayload } from '../../types/AccountPayload';

export const injectAccountApi = (BaseAccountApi: any, config?: Configuration): typeof BaseAccountApi => {
  const AccountMapper = extractDependency('AccountMapper', config);

  return class AccountApi extends BaseAccountApi {
    protected async getAccountPayload(account: Account): Promise<AccountPayload> {
      if (!account || !account.accountId) {
        return {
          city: false,
          country: false,
          zipCode: false,
          state: false,
          customerGroupId: false,
          customerGroupAssignmentIds: false,
        };
      }
      const locale = await this.getCommercetoolsLocal();

      account = (await this.requestBuilder()
        .customers()
        .withId({ ID: account.accountId })
        .get()
        .execute()
        .then((response) => {
          return AccountMapper.commercetoolsCustomerToAccount(response.body, locale);
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        })) as Account;

      const accountPayload = {
        // @ts-ignore
        customerGroupId: account?.customerGroupId || false,
        // @ts-ignore
        customerGroupAssignmentIds: account?.customerGroupAssignmentIds || false,
        city: account?.addresses?.[0]?.city || false,
        country: account?.addresses?.[0]?.country || false,
        zipCode: account?.addresses?.[0]?.postalCode || false,
        state: account?.addresses?.[0]?.state || false,
      };

      return accountPayload;
    }

    async getAccountFilters(): Promise<FilterField[]> {
      const response = await this.requestBuilder()
        .customerGroups()
        .get()
        .execute()
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
      const fields: FilterField[] = [
        {
          field: 'city',
          type: 'text',
          label: "Customer's city",
        },
        {
          field: 'country',
          type: 'text',
          label: "Customer's country",
        },
        {
          field: 'zipCode',
          type: 'text',
          label: "Customer's zip code",
        },
        {
          field: 'state',
          type: 'text',
          label: "Customer's state",
        },
      ];

      fields.push({
        field: 'customerGroupId',
        type: 'enum',
        label: 'Customer Group',
        values: response.body.results.map((item) => {
          return {
            value: item.id,
            name: item?.name,
          };
        }),
      });

      fields.push({
        field: 'customerGroupAssignmentIds',
        type: 'enum',
        label: 'Customer Group Assignments',
        values: response.body.results.map((item) => {
          return {
            value: item.id,
            name: item?.name,
          };
        }),
      });

      return fields;
    }
  };
};
