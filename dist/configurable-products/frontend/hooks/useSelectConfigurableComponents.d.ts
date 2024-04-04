import * as react from 'react';
import { Product } from '@commercetools/frontend-domain-types/product';
import { Variant } from '@commercetools/frontend-domain-types/wishlist';

declare const useSelectConfigurableComponents: (configurableComponents?: Product[]) => {
    selectedVariants: Variant[];
    setSelectedVariants: react.Dispatch<react.SetStateAction<Variant[]>>;
    selectComponentVariant: (componentIndex: number, variantSku: string) => void;
};

export { useSelectConfigurableComponents };
