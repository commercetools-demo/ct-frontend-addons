import { Cart as CommercetoolsCart, LineItem } from '@commercetools/platform-sdk';
import { Cart } from '../../../shared/types';
import { Configuration } from '../../types';
export declare class CartMapper {
    static mergeParentIdToCart: (cart: Cart, comCart: CommercetoolsCart, config?: Configuration) => Cart;
    static mergeParentIdToLineItem: (cartLineItems: Cart['lineItems'], commercetoolsLineItem: LineItem[], config?: Configuration) => Cart['lineItems'];
}
//# sourceMappingURL=CartMapper.d.ts.map