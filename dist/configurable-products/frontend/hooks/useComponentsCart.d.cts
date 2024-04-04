import { KeyedMutator } from 'swr';
import { Cart } from '@commercetools/frontend-domain-types/cart';

declare const useComponentsCart: (sdk: any, businessUnitKey?: string, storeKey?: string) => {
    addComponents: (lineItems: Array<{
        sku: string;
        count: number;
    }>, mutate: KeyedMutator<Cart | undefined>) => Promise<void>;
};

export { useComponentsCart as default };
