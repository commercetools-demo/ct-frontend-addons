import {
  ExternalError
} from "./chunk-AIH233S2.js";

// src/superuser/extensions/apis/AccountApi.ts
var injectAccountApi = (BaseAccountApi, AccountMapper) => {
  return class AccountApi extends BaseAccountApi {
    constructor() {
      super(...arguments);
      this.getCustomerByEmail = async (customerEmail) => {
        const locale = await this.getCommercetoolsLocal();
        const account = await this.requestBuilder().customers().get({
          queryArgs: {
            where: `email="${customerEmail}"`
          }
        }).execute().then(async (response) => {
          if (response.body.results.length === 1) {
            const customer = response.body.results[0];
            return AccountMapper.commercetoolsCustomerToAccount(customer, locale);
          }
          throw new Error("Too many customers");
        }).catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
        return account;
      };
    }
  };
};

export {
  injectAccountApi
};
