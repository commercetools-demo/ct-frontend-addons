import { Account } from '@commercetools/frontend-domain-types/account';

export interface GetAccountResult {
  loggedIn: boolean;
  accountLoading: boolean;
  account?: Account;
  distributionChannelId?: string;
  supplyChannelId?: string;
  storeKey?: string;
  storeId?: string;
  storeName?: string;
  persisted?: boolean;
}
