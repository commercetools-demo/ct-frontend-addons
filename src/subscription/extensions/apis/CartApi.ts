import { CartAddLineItemAction, CartUpdate } from '@commercetools/platform-sdk';
import { Cart, LineItem, Writeable } from '../../../shared/types';

export const injectCartApi = (BaseCartApi: any): typeof BaseCartApi => {
  return class CartApi extends BaseCartApi {
    async getById(cartId: string): Promise<Cart> {
      const locale = await this.getCommercetoolsLocal();

      return await this.requestBuilder()
        .carts()
        .withId({
          ID: cartId,
        })
        .get({
          queryArgs: {
            limit: 1,
            expand: [
              'lineItems[*].discountedPrice.includedDiscounts[*].discount',
              'discountCodes[*].discountCode',
              'paymentInfo.payments[*]',
            ],
          },
        })
        .execute()
        .then((response: any) => {
          return this.buildCartWithAvailableShippingMethods(response.body, locale);
        })
        .catch((error: any) => {
          throw new Error(error.message);
        });
    }


  addLinkedLineitemsToCart: (cart: Cart, lineItems: LineItem[]) => Promise<Cart> = async (
    cart: Cart,
    lineItems: LineItem[],
  ) => {
    try {
      const locale = await this.getCommercetoolsLocal();

      const cartUpdate = {
        version: +cart.cartVersion!,
        actions: lineItems.map((subscription) => {
          const action = {
            action: 'addLineItem',
            sku: subscription.variant.sku,
            quantity: +subscription.count,
            custom: subscription.custom,
          } as Writeable<CartAddLineItemAction>;
          if (this.distributionChannelId) {
            action.distributionChannel = {
              id: this.distributionChannelId,
              typeId: 'channel',
            };
          }
          if (this.supplyChannelId) {
            action.supplyChannel = {
              id: this.supplyChannelId,
              typeId: 'channel',
            };
          }
          return action;
        }),
      };

      // TODO: make it into one api call
      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);

      return (await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale)) as Cart;
    } catch (error) {
      //TODO: better error, get status code etc...
      throw new Error(`addToCart failed. ${error}`);
    }
  };

    freezeCart: (cart: Cart) => Promise<Cart> = async (cart: Cart) => {
      try {
        const locale = await this.getCommercetoolsLocal();
  
        const cartUpdate: CartUpdate = {
          version: +cart.cartVersion!,
          actions: [
            {
              action: 'freezeCart',
            } as any,
          ],
        };
  
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
  
        return (await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale)) as Cart;
      } catch (error) {
        //TODO: better error, get status code etc...
        throw new Error(`freeze error failed. ${error}`);
      }
    };
  
    unfreezeCart: (cart: Cart) => Promise<Cart> = async (cart: Cart) => {
      try {
        const locale = await this.getCommercetoolsLocal();
  
        const cartUpdate: CartUpdate = {
          version: +cart.cartVersion!,
          actions: [
            {
              action: 'unfreezeCart',
            } as any,
          ],
        };
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
  
        return (await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale)) as Cart;
      } catch (error) {
        //TODO: better error, get status code etc...
        throw new Error(`freeze error failed. ${error}`);
      }
    };
  
    setCartExpirationDays: (cart: Cart, deleteDaysAfterLastModification: number) => Promise<Cart> = async (
      cart: Cart,
      deleteDaysAfterLastModification: number,
    ) => {
      try {
        const locale = await this.getCommercetoolsLocal();
  
        const cartUpdate: CartUpdate = {
          version: +cart.cartVersion!,
          actions: [
            {
              action: 'setDeleteDaysAfterLastModification',
              deleteDaysAfterLastModification,
            } as any,
          ],
        };
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
  
        return (await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale)) as Cart;
      } catch (error) {
        //TODO: better error, get status code etc...
        throw new Error(`freeze error failed. ${error}`);
      }
    };
  
    setCustomType: (cart: Cart, type: string, fields: any) => Promise<Cart> = async (
      cart: Cart,
      type: string,
      fields: any,
    ) => {
      try {
        const locale = await this.getCommercetoolsLocal();
  
        const cartUpdate: CartUpdate = {
          version: +cart.cartVersion!,
          actions: [
            {
              action: 'setCustomType',
              type: {
                typeId: 'type',
                key: type,
              },
              fields,
            } as any,
          ],
        };
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
  
        return (await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale)) as Cart;
      } catch (error) {
        //TODO: better error, get status code etc...
        throw new Error(`freeze error failed. ${error}`);
      }
    };
    removeAllLineItems: (cart: Cart) => Promise<Cart> = async (cart: Cart) => {
      try {
        const locale = await this.getCommercetoolsLocal();
  
        const cartUpdate: CartUpdate = {
          version: +cart.cartVersion!,
          actions: cart.lineItems.map((lineItem) => ({
            action: 'removeLineItem',
            lineItemId: lineItem.lineItemId,
          })),
        };
  
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
  
        return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
      } catch (error) {
        //TODO: better error, get status code etc...
        throw new Error(`removeLineItem failed. ${error}`);
      }
    };
  };
};
