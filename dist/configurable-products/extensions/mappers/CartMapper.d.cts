import { Cart as Cart$1, LineItem } from '@commercetools/platform-sdk';
import { Cart } from '../../../shared/types.cjs';
import { Configuration } from '../../types.cjs';
import '../../../types-Cz8jhXRC.cjs';
import '@frontastic/extension-types';

declare class CartMapper {
    static mergeParentIdToCart: (cart: Cart, comCart: Cart$1, config?: Configuration) => Cart;
    static mergeParentIdToLineItem: (cartLineItems: Cart['lineItems'], commercetoolsLineItem: LineItem[], config?: Configuration) => Cart['lineItems'];
}

export { CartMapper };
