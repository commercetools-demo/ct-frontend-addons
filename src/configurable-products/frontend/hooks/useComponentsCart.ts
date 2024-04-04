import { useCallback } from 'react';
import { KeyedMutator } from 'swr';
import { useConfigurableComponentsContext } from '../providers/configurable-components';
import useChildComponents from './useChildComponents';
import { Cart } from '@commercetools/frontend-domain-types/cart';

const useComponentsCart = (sdk: any, businessUnitKey?: string, storeKey?: string) => {
  const { selectedVariants } = useConfigurableComponentsContext();
  const { bundleComponentsIntoLineItems } = useChildComponents();

  const addComponents = useCallback(
    async (lineItems: Array<{ sku: string; count: number }>, mutate: KeyedMutator<Cart | undefined>) => {
      if (selectedVariants.length === 0) return;
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

      if (!result.isError) mutate(bundleComponentsIntoLineItems(result.data), { revalidate: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedVariants, businessUnitKey, storeKey],
  );

  return {
    addComponents,
  };
};

export default useComponentsCart;