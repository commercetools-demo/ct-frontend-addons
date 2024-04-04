import { LineItem } from '../../shared/types.js';

interface AddToCartBody {
    lineItems: LineItem[];
    configurableComponents?: LineItem[];
}

export type { AddToCartBody };
