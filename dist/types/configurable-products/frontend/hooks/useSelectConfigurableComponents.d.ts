/// <reference types="react" />
import { Product } from '@commercetools/frontend-domain-types/product';
import { Variant } from '@commercetools/frontend-domain-types/wishlist';
export declare const useSelectConfigurableComponents: (configurableComponents?: Product[]) => {
    selectedVariants: Variant[];
    setSelectedVariants: import("react").Dispatch<import("react").SetStateAction<Variant[]>>;
    selectComponentVariant: (componentIndex: number, variantSku: string) => void;
};
//# sourceMappingURL=useSelectConfigurableComponents.d.ts.map