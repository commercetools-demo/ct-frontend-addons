import { Money } from '../types.js';

type UseStandalonePrice = {
    changePrice: (lineItemId: string, price: Money) => Promise<void>;
};
declare const useStandalonePrice: ({ sdk, mutatePath, }: {
    sdk: any;
    mutatePath?: string | undefined;
}) => UseStandalonePrice;

export { type UseStandalonePrice, useStandalonePrice };
