import { useCallback } from 'react';
import { useConfigurableComponentsContext } from '../providers/configurable-components';
import { SDKResponse } from '@commercetools/frontend-sdk';
import { KeyedMutator } from 'swr';
import { Cart } from '../../../types/b2c/cart';

const useComponentsCart = (sdk: any, mutate: KeyedMutator<Cart>, businessUnitKey?: string, storeKey?: string) => {
  const { selectedVariants } = useConfigurableComponentsContext();

  const addComponents = useCallback(
    async (lineItems: Array<{ sku: string; count: number }>): Promise<SDKResponse<unknown>> => {
      if (selectedVariants.length === 0) return Promise.resolve({} as SDKResponse<unknown>);
      const payload = {
        lineItems: lineItems.map(({ sku, count }) => ({ variant: { sku }, count })),
        businessUnitKey,
        configurableComponents: selectedVariants?.filter(Boolean)?.map((variant) => ({
          variant,
          count: 1,
        })),
      };

      const result = await sdk.callAction({
        actionName: 'cart/addComponentsToCart',
        payload,
        query: {
          businessUnitKey: businessUnitKey as string,
          storeKey: storeKey as string,
        },
      });
      if (!result.isError) mutate(result.data, { revalidate: false });
      return result.isError ? { success: false, message: result.error.message } : { ...result.data, success: true };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedVariants, businessUnitKey, storeKey],
  );

  return {
    addComponents,
  };
};

export default useComponentsCart;
