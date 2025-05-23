import { Cart } from '../../../../types/b2c/cart';

export interface ContextShape {
  cart?: Cart;
  productAttributes: string[];
}
export interface ContextProps {
  cart?: Cart;
  productAttributes: string[];
}
