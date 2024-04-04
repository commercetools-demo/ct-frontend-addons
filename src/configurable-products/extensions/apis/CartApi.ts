import {
  Cart as CommercetoolsCart,
  CartAddLineItemAction,
  CartUpdate,
  ClientResponse,
  CartRemoveLineItemAction,
  CartChangeLineItemQuantityAction,
} from '@commercetools/platform-sdk';
import { Cart, LineItem } from '../../../shared/types';
import { Configuration } from '../../types';

export const injectCartApi = (BaseCartApi: any, config?: Configuration): typeof BaseCartApi => {
  return class CartApi extends BaseCartApi {
    async getCommercetoolsCartById(cartId: string): Promise<CommercetoolsCart> {
      return await this.associateEndpoints(this.accountId, this.businessUnitKey)
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
        .then((response: ClientResponse<CommercetoolsCart>) => {
          return response.body;
        });
    }
    async addLinkedLineitemsToCart(cartId: string, cartVersion: number, lineItemId: string, configurableComponents: LineItem[]): Promise<Cart> {
      const locale = await this.getCommercetoolsLocal();

      const cartUpdate: CartUpdate = {
        version: cartVersion,
        actions: [],
      };

      configurableComponents?.forEach((field) => {
        const addLineItemActions: CartAddLineItemAction = {
          action: 'addLineItem',
          sku: field.variant.sku,
          quantity: +field.count || 1,
          ...(this.distributionChannelId && {
            distributionChannel: { typeId: 'channel', id: this.distributionChannelId },
          }),
          ...(this.supplyChannelId && {
            supplyChannel: { typeId: 'channel', id: this.supplyChannelId },
          }),
          custom: {
            type: {
              key: config?.props.lineItem.customTypeKey,
              typeId: 'type',
            },
            fields: {
              [config!.props.lineItem.parentIdCustomFieldKey]: lineItemId,
            },
          },
        };

        cartUpdate.actions.push(addLineItemActions);
      });

      const commercetoolsCart = await this.updateCart(cartId, cartUpdate);

      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
    async removeLinkedLineitemsFromCart(cart: Cart, lineItemId: string): Promise<Cart> {
      const locale = await this.getCommercetoolsLocal();

      const linkedLineItems = cart.lineItems.filter((lineitem: LineItem & { parentId?: string }) => {
        return lineitem.parentId === lineItemId;
      });

      const cartUpdate: CartUpdate = {
        version: +cart.cartVersion,
        actions: [],
      };

      linkedLineItems?.forEach((field) => {
        const addLineItemActions: CartRemoveLineItemAction = {
          action: 'removeLineItem',
          lineItemId: field.lineItemId,
        };

        cartUpdate.actions.push(addLineItemActions);
      });

      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate);

      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
    async updateLinkedLineitemsInCart(cart: Cart, lineItem: { id: string , count: number}): Promise<Cart> {
      const locale = await this.getCommercetoolsLocal();

      const linkedLineItems = cart.lineItems.filter((lineitem: LineItem & { parentId?: string }) => {
        return lineitem.parentId === lineItem.id;
      });

      const cartUpdate: CartUpdate = {
        version: +cart.cartVersion,
        actions: [],
      };

      linkedLineItems?.forEach((field) => {
        const addLineItemActions: CartChangeLineItemQuantityAction = {
          action: 'changeLineItemQuantity',
          lineItemId: field.lineItemId,
          quantity: lineItem.count,
        };

        cartUpdate.actions.push(addLineItemActions);
      });

      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate);

      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
  };
};
