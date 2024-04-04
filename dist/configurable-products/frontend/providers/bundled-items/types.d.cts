import { Cart } from '@commercetools/frontend-domain-types/cart';

interface ContextShape {
    cart?: Cart;
    productAttributes: string[];
}
interface ContextProps {
    cart?: Cart;
    productAttributes: string[];
}

export type { ContextProps, ContextShape };
