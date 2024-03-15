import { CartUpdate } from '@commercetools/platform-sdk';
import { Cart } from '../../../shared/types';

export const injectCartApi = (BaseCartApi: any): typeof BaseCartApi => {
  return class CartApi extends BaseCartApi {
    public addMinimumQuantityToCart: (
      cart: Cart,
      changes: { lineItemId: string; quantity: number }[],
    ) => Promise<Cart> = async (cart: Cart, changes: { lineItemId: string; quantity: number }[]) => {
      const locale = await this.getCommercetoolsLocal();

      const cartUpdate: CartUpdate = {
        version: +cart.cartVersion,
        actions: changes.map((change) => ({
          action: 'changeLineItemQuantity',
          lineItemId: change.lineItemId,
          quantity: change.quantity,
        })),
      };

      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);

      return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    };
  };
};
