import { ClientResponse, CustomerPagedQueryResponse } from "@commercetools/platform-sdk";
import { ExternalError } from "../../../utils/Errors";
import { Account } from "../../../shared/types";

export const injectAccountApi = (BaseAccountApi: any, AccountMapper: any): typeof BaseAccountApi => {
  return class AccountApi extends BaseAccountApi {
    
  };
};
