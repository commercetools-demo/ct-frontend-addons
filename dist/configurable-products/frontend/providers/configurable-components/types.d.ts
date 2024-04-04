import { Product, Variant } from '@commercetools/frontend-domain-types/product';

interface ContextShape {
    configurableComponents?: Product[];
    selectedVariants: Variant[];
    productAttributes: string[];
    setSelectedVariants: (variants: Variant[]) => void;
}
interface ContextProps {
    configurableComponents?: Product[];
    productAttributes: string[];
}

export type { ContextProps, ContextShape };
