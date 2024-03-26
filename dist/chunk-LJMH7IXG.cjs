"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkRJQQSQ2Gcjs = require('./chunk-RJQQSQ2G.cjs');

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
          throw new (0, _chunkRJQQSQ2Gcjs.ExternalError)({ status: error.code, message: error.message, body: error.body });
        });
        return account;
      };
    }
  };
};



exports.injectAccountApi = injectAccountApi;
