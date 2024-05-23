import { KeyedMutator } from 'swr';
import { Cart } from '@commercetools/frontend-domain-types/cart';
declare const useSuperuserCarts: (sdk: any, mutate: KeyedMutator<Cart>) => {
    setCart: (id: string, email?: string) => Promise<Partial<Cart>>;
    createSuperuserCart: () => Promise<Partial<Cart>>;
    reassignCart: (accountId?: string, email?: string) => Promise<Partial<Cart>>;
};
export default useSuperuserCarts;
//# sourceMappingURL=useSuperuserCarts.d.ts.map