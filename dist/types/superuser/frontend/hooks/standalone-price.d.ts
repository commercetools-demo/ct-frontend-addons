import { Money } from '../types';
export type UseStandalonePrice = {
    changePrice: (lineItemId: string, price: Money) => Promise<void>;
};
export declare const useStandalonePrice: ({ sdk, mutatePath, }: {
    sdk: any;
    mutatePath?: string | undefined;
}) => UseStandalonePrice;
//# sourceMappingURL=standalone-price.d.ts.map