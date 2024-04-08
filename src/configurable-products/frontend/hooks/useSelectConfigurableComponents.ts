import { Product } from '@commercetools/frontend-domain-types/product';
import { Variant } from '@commercetools/frontend-domain-types/wishlist';
import { useState } from 'react';

export const useSelectConfigurableComponents = (configurableComponents?: Product[]) => {
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>(Array(configurableComponents?.length).fill(null));

  const selectComponentVariant = (componentIndex: number, variantSku: string) => {
    const selectedVariant = !variantSku
      ? null
      : configurableComponents?.[componentIndex].variants.find((v) => v.sku === variantSku);
    setSelectedVariants(
      selectedVariants.map((variant, i) => {
        if (i === componentIndex) {
          return selectedVariant;
        }
        return variant;
      }) as Variant[],
    );
  };

  return {
    selectedVariants,
    setSelectedVariants,
    selectComponentVariant,
  };
};
