import useSWR, { mutate } from 'swr';
import { revalidateOptions } from '../../../shared/helpers/sdk';
import { useCallback, useMemo } from 'react';
import { Account } from '../../../shared/types';
import { GetAccountResult } from '../types';

export const useStore = (sdk: any) => {
  const extensions = sdk.composableCommerce;

  const result = useSWR('/action/account/getAccount', extensions.account.getAccount, {
    ...revalidateOptions,
    revalidateOnMount: true,
  });

  const data = useMemo(() => {
    if (!result.data?.isError) {
      const account = (result.data?.data as GetAccountResult)?.account as Account;

      const storeContext = {
        storeKey: result.data.data.storeKey as string,
        storeId: result.data.data.storeId as string,
        distributionChannelId: result.data.data.distributionChannelId as string,
        supplyChannelId: result.data.data.supplyChannelId as string,
        storeName: result.data.data.storeName as string,
        persisted: result.data.data.persisted as boolean,
      };

      if (account?.accountId) return { account, storeContext, loggedIn: true, accountLoading: false };

      return {
        storeContext,
      };
    }

    return { loggedIn: false, accountLoading: false, error: result.error };
  }, [result]);

  const assignToStore = useCallback(async (storeId: string): Promise<void> => {
    const res = await sdk.callAction({ actionName: 'cart/assignToStore', payload: { storeId } });
    mutate('/action/cart/getCart', res);
  }, []);

  return {
    storeContext: data.storeContext,
    assignToStore,
  };
};
