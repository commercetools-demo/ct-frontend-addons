import { CustomerSetCustomTypeAction } from '@commercetools/platform-sdk';
import { Account } from '../../../shared/types';
import { ExternalError } from '../../../utils/Errors';
import { StoreContext } from '../../types/StoreContext';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';

export const injectAccountApi = (BaseAccountApi: any, config?: Configuration): typeof BaseAccountApi => {
  const AccountMapper = extractDependency('AccountMapper', config);

  return class AccountApi extends BaseAccountApi {
    protected async getAccount(account: Account): Promise<Account> {
      const locale = await this.getCommercetoolsLocal();

      account = await this.requestBuilder()
        .customers()
        .withId({ ID: account.accountId })
        .get()
        .execute()
        .then((response) => {
          return AccountMapper.commercetoolsCustomerToAccount(response.body, locale);
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });

      return account;
    }

    protected async assignToStore(account: Account, payload: StoreContext): Promise<Account> {
      const locale = await this.getCommercetoolsLocal();

      const version = await this.fetchAccountVersion(account);
      return await this.requestBuilder()
        .customers()
        .withId({ ID: account.accountId })
        .post({
          body: {
            version: version,
            actions: [
              {
                action: 'setCustomType',
                type: {
                  typeId: 'type',
                  key: config.props.customerCustomTypeKey,
                },
                fields: {
                  storeKey: payload.storeKey,
                  distributionChannelId: payload.distributionChannelId,
                  supplyChannelId: payload.supplyChannelId,
                  storeId: payload.storeId,
                  storeName: payload.storeName,
                  persisted: false,
                },
              } as CustomerSetCustomTypeAction,
            ],
          },
        })
        .execute()
        .then((response) => AccountMapper.commercetoolsCustomerToAccount(response.body, locale))
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    protected async persistStore(account: Account, payload: StoreContext): Promise<Account> {
      const locale = await this.getCommercetoolsLocal();

      const version = await this.fetchAccountVersion(account);
      return await this.requestBuilder()
        .customers()
        .withId({ ID: account.accountId })
        .post({
          body: {
            version: version,
            actions: [
              {
                action: 'setCustomType',
                type: {
                  typeId: 'type',
                  key: config?.props.customerCustomTypeKey,
                },
                fields: {
                  storeKey: payload.storeKey,
                  distributionChannelId: payload.distributionChannelId,
                  supplyChannelId: payload.supplyChannelId,
                  storeId: payload.storeId,
                  storeName: payload.storeName,
                  persisted: true,
                },
              } as CustomerSetCustomTypeAction,
            ],
          },
        })
        .execute()
        .then((response) => AccountMapper.commercetoolsCustomerToAccount(response.body, locale))
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }
    protected async fetchAccountVersion(account: Account): Promise<number | undefined> {
      const commercetoolsAccount = await this.requestBuilder()
        .customers()
        .withId({ ID: account.accountId })
        .get()
        .execute();

      return commercetoolsAccount.body?.version;
    }
  };
};
