import { LineItem } from '../../shared/types.cjs';

interface AddToCartBody {
    lineItems: LineItem[];
    configurableComponents?: LineItem[];
}

export type { AddToCartBody };
