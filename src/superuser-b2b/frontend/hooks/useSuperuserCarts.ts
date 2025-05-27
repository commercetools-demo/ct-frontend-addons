import { KeyedMutator } from 'swr';
import { useSuperuserContext } from '../provider';
import { SDKResponse } from '@commercetools/frontend-sdk';
import { Cart } from '../../../types/b2b/cart';
import { Cart as CommercetoolsCart } from '@commercetools/platform-sdk';
import { useCallback } from 'react';

const useSuperuserCarts = (sdk: any, mutate: KeyedMutator<Cart>, businessUnitKey?: string, storeKey?: string) => {
  const { setSuperuserCarts } = useSuperuserContext();
  const setCart = useCallback(async (id: string, email?: string) => {
    const result: SDKResponse<Cart> = await sdk.callAction({
      actionName: `cart/setCart`,
      payload: {
        email,
      },
      query:{
        businessUnitKey,
        storeKey,
        id,
      }
    });

    if (!result.isError) mutate(result.data, { revalidate: false });

    window.location.replace('/');
    return result.isError ? ({} as Partial<Cart>) : result.data;
  }, [businessUnitKey, storeKey]);

  const createSuperuserCart = useCallback(async () => {
    const result: SDKResponse<Cart> = await sdk.callAction({
      actionName: `cart/createSuperuserCart`,
      query:{
        businessUnitKey,
        storeKey,
      }
    });
    getAllSuperUserCarts();
    if (!result.isError) mutate(result.data, { revalidate: false });

    return result.isError ? ({} as Partial<Cart>) : result.data;
  }, [businessUnitKey, storeKey]);

  const reassignCart = useCallback(async (accountId?: string, email?: string) => {
    const result: SDKResponse<Cart> = await sdk.callAction({
      actionName: `cart/reassignCart`,
      payload: {
        accountId,
        email,
      },
      query:{
        businessUnitKey,
        storeKey,
      }
    });
    if (!result.isError) mutate(result.data, { revalidate: false });

    return result.isError ? ({} as Partial<Cart>) : result.data;
  }, [businessUnitKey, storeKey]);

  const getAllSuperUserCarts = useCallback(async () => {
    const result: SDKResponse<CommercetoolsCart[]> = await sdk.callAction({
      actionName: `cart/getAllSuperuserCartsInStore`,
      query:{
        businessUnitKey,
        storeKey,
      }
    });
    if (!result.isError) {
      setSuperuserCarts(result.data);
    }
  }, [businessUnitKey, storeKey]);

  return { setCart, createSuperuserCart, reassignCart };
};

export default useSuperuserCarts;
