import { Store as CommercetoolsStore } from '@commercetools/platform-sdk';
import { Store } from '../../types/Store';
import { Channel } from '../../types/Channel';

export class StoreMapper {
  static mapCommercetoolsStoreToStore(store: CommercetoolsStore, locale: string): Store {
    return {
      name: store.name?.[locale],
      storeId: store.id,
      key: store.key,
      distributionChannels: store.distributionChannels.map((commercetoolsChannel) => {
        const channel: Channel = {
          channelId: commercetoolsChannel.id,
        };
        return channel;
      }),
      supplyChannels: store.supplyChannels.map((commercetoolsChannel) => {
        const channel: Channel = {
          channelId: commercetoolsChannel.id,
        };
        return channel;
      }),
    };
  }
}
