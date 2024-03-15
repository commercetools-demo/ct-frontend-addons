import {
  CartSetLineItemPriceAction,
  CartUpdate,
  ClientResponse,
  Cart as CommercetoolsCart,
  Order as CommercetoolsOrder,
  OrderPagedQueryResponse,
  OrderSetCustomTypeAction,
  OrderUpdate,
} from '@commercetools/platform-sdk';
import { Cart, Order, Money, Account } from '../../../shared/types';
import { ExternalError } from '../../../utils/Errors';

export const injectCartApi = (BaseCartApi: any, CartMapper: any): typeof BaseCartApi => {
  return class CartApi extends BaseCartApi {
    public changeLineItemPrice: (cart: Cart, lineItemId: string, externalPrice?: Money) => Promise<Cart> = async (
      cart: Cart,
      lineItemId: string,
      externalPrice?: Money,
    ) => {
      const locale = await this.getCommercetoolsLocal();

      const cartUpdate: CartUpdate = {
        version: +cart.cartVersion,
        actions: [
          {
            action: 'setLineItemPrice',
            lineItemId: lineItemId,
            externalPrice: externalPrice,
          } as CartSetLineItemPriceAction,
        ],
      };

      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);

      return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    };

    public getOrderByID: (id: string) => Promise<CommercetoolsOrder> = async (id: string) => {
      const commercetoolsOrder = await this.requestBuilder()
        .orders()
        .withId({ ID: id })
        .get({
          queryArgs: {
            expand: 'custom.type',
          },
        })
        .execute()
        .then((response: ClientResponse<CommercetoolsOrder>) => response.body)
        .catch((error: any) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });

      return commercetoolsOrder;
    };

    public getOrders: (account: Account) => Promise<Order[]> = async (account: Account) => {
      const locale = await this.getCommercetoolsLocal();

      return await this.requestBuilder()
        .orders()
        .get({
          queryArgs: {
            expand: [
              'lineItems[*].discountedPrice.includedDiscounts[*].discount',
              'discountCodes[*].discountCode',
              'paymentInfo.payments[*]',
            ],
            where: `customerId="${account.accountId}"`,
            sort: 'createdAt desc',
          },
        })
        .execute()
        .then((response: ClientResponse<OrderPagedQueryResponse>) => {
          return response.body.results.map((order) => CartMapper.commercetoolsOrderToOrder(order, locale));
        })
        .catch((error: any) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    };

    public setSuperUserEmailOnOrder: (
      order: Order,
      superUserEmail: string,
      customType: string,
      customField: string,
    ) => Promise<Cart> = async (order: Order, superUserEmail: string, customType: string, customField: string) => {
      const locale = await this.getCommercetoolsLocal();

      const orderObj = await this.getOrderByID(order.cartId);

      let fields = {};
      if (orderObj.custom?.type?.obj?.key === customType) {
        fields = {
          ...orderObj.custom?.fields,
        };
      }

      const orderUpdate: OrderUpdate = {
        version: +order.orderVersion,
        actions: [
          {
            action: 'setCustomType',
            type: {
              typeId: 'type',
              key: customType,
            },
            fields: {
              ...fields,
              [customField]: superUserEmail,
            },
          } as OrderSetCustomTypeAction,
        ],
      };

      order = await this.requestBuilder()
        .orders()
        .withId({ ID: order.cartId })
        .post({ body: orderUpdate })
        .execute()
        .then((response: ClientResponse<Order>) => CartMapper.commercetoolsOrderToOrder(response.body, locale))
        .catch((error: any) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });

      return order;
    };
    getActiveCartById: (cartId: string) => Promise<Cart> = async (cartId: string) => {
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
        .then((response: ClientResponse<CommercetoolsCart>) => {
          if (response.body.cartState !== 'Active') {
            throw new Error(`Cart ${cartId} is not active.`);
          }
          return this.buildCartWithAvailableShippingMethods(response.body, locale);
        })
        .catch((error: any) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    };
  };
};
