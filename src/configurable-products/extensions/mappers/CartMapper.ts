import { Cart as CommercetoolsCart, LineItem } from '@commercetools/platform-sdk';
import { Cart } from '../../../shared/types';
import { Configuration } from '../../types';

export class CartMapper {
  static mergeParentIdToCart = (cart: Cart, comCart: CommercetoolsCart, config?: Configuration): Cart => {
    return {
      ...cart,
      lineItems: CartMapper.mergeParentIdToLineItem(cart.lineItems, comCart.lineItems, config),
    };
  };
  static mergeParentIdToLineItem = (
    cartLineItems: Cart['lineItems'],
    commercetoolsLineItem: LineItem[],
    config?: Configuration,
  ): Cart['lineItems'] => {
    return cartLineItems.map((item) => ({
      ...item,
      ...(config?.props.lineItem.parentIdCustomFieldKey && {
        parentId: commercetoolsLineItem.find((commItem) => commItem.id === item.lineItemId)?.custom?.fields?.[
          config.props.lineItem.parentIdCustomFieldKey
        ],
      }),
    }));
  };
}
