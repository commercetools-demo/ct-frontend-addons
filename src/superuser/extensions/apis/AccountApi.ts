import { ClientResponse, CustomerPagedQueryResponse } from "@commercetools/platform-sdk";
import { ExternalError } from "../../../utils/Errors";
import { Account } from "../../../shared/types";

export const injectAccountApi = (BaseAccountApi: any, AccountMapper: any): typeof BaseAccountApi => {
  return class AccountApi extends BaseAccountApi {
    getCustomerByEmail: (customerEmail: string) => Promise<Account> = async (customerEmail: string) => {
      const account = await this.requestBuilder()
        .customers()
        .get({
          queryArgs: {
            where: `email="${customerEmail}"`,
          },
        })
        .execute()
        .then(async (response: ClientResponse<CustomerPagedQueryResponse>) => {
          if (response.body.results.length === 1) {
            const customer = response.body.results[0];
            return AccountMapper.commercetoolsCustomerToAccount(customer);
          }
          throw new Error('Too many customers');
        })
        .catch((error: any) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
  
      return account;
    };
  };
};
