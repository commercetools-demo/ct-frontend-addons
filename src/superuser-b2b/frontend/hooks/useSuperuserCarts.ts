import { KeyedMutator } from 'swr';
import { useSuperuserContext } from '../provider';
import { SDKResponse } from '@commercetools/frontend-sdk';
import { Cart } from '../../../types/b2b/cart';
import { Cart as CommercetoolsCart } from '@commercetools/platform-sdk';

const useSuperuserCarts = (sdk: any, mutate: KeyedMutator<Cart>) => {
  const { setSuperuserCarts } = useSuperuserContext();
  const setCart = async (id: string, email?: string) => {
    const result: SDKResponse<Cart> = await sdk.callAction({
      actionName: `cart/setCart?id=${id}`,
      payload: {
        email,
      },
    });

    if (!result.isError) mutate(result.data, { revalidate: false });

    window.location.replace('/');
    return result.isError ? ({} as Partial<Cart>) : result.data;
  };

  const createSuperuserCart = async () => {
    const result: SDKResponse<Cart> = await sdk.callAction({
      actionName: `cart/createSuperuserCart`,
    });
    getAllSuperUserCarts();
    if (!result.isError) mutate(result.data, { revalidate: false });

    return result.isError ? ({} as Partial<Cart>) : result.data;
  };

  const reassignCart = async (accountId?: string, email?: string) => {
    const result: SDKResponse<Cart> = await sdk.callAction({
      actionName: `cart/reassignCart`,
      payload: {
        accountId,
        email,
      },
    });
    if (!result.isError) mutate(result.data, { revalidate: false });

    return result.isError ? ({} as Partial<Cart>) : result.data;
  };

  const getAllSuperUserCarts = async () => {
    const result: SDKResponse<CommercetoolsCart[]> = await sdk.callAction({
      actionName: `cart/getAllSuperuserCartsInStore`,
    });
    if (!result.isError) {
      setSuperuserCarts(result.data);
    }
  };

  return { setCart, createSuperuserCart, reassignCart };
};

export default useSuperuserCarts;
