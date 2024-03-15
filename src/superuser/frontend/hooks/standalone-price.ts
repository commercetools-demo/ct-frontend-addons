import { useCallback } from 'react';
import { mutate } from 'swr';
import { Money } from '../types';

export type UseStandalonePrice = {
  changePrice: (lineItemId: string, price: Money) => Promise<void>;
};

export const useStandalonePrice = ({
  sdk,
  mutatePath = '/action/cart/getCart',
}: {
  sdk: any;
  mutatePath?: string;
}): UseStandalonePrice => {
  const changePrice = useCallback(async (lineItemId: string, price: Money) => {
    const payload = {
      lineItemId,
      price,
    };
    const res = await sdk.callAction({ actionName: `cart/changePrice`, payload });
    mutate(mutatePath, res);
  }, []);

  return { changePrice };
};
