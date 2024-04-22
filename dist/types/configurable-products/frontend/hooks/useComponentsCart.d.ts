import { SDKResponse } from '@commercetools/frontend-sdk';
import { KeyedMutator } from 'swr';
import { Cart } from '@commercetools/frontend-domain-types/cart';
declare const useComponentsCart: (sdk: any, mutate: KeyedMutator<Cart>, businessUnitKey?: string, storeKey?: string) => {
    addComponents: (lineItems: Array<{
        sku: string;
        count: number;
    }>) => Promise<SDKResponse<unknown>>;
};
export default useComponentsCart;
//# sourceMappingURL=useComponentsCart.d.ts.map