import { Order as CommercetoolsOrder } from '@commercetools/platform-sdk';
import { Order } from '../../../shared/types';
import { Configuration } from '../../types';
export default class CartMapper {
  static mergeCommercetoolsOrderToOrder(
    commercetoolsOrder: CommercetoolsOrder,
    order: Order,
    config: Configuration,
  ): Order {
    return {
      ...order,
      ...(commercetoolsOrder?.custom?.fields?.[config.props.cart.superuserEmailFieldKey] && {
        superuserEmail: commercetoolsOrder?.custom?.fields?.[config.props.cart.superuserEmailFieldKey],
      }),
    };
  }
}
