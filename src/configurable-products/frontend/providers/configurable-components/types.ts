import { Product, Variant } from '../../../../types/b2c/product';

export interface ContextShape {
  configurableComponents?: Product[];
  selectedVariants: Variant[];
  productAttributes: string[];
  setSelectedVariants: (variants: Variant[]) => void;
}

export interface ContextProps {
  configurableComponents?: Product[];
  productAttributes: string[];
}
