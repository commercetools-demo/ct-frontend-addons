import { Cart } from '../../../types/b2b/cart';
import {
  CartDraft,
  CartPagedQueryResponse,
  CartSetCustomTypeAction,
  CartSetCustomerEmailAction,
  CartUpdate,
  ClientResponse,
  Cart as CommercetoolsCart,
  Order as CommercetoolsOrder,
  OrderSetCustomTypeAction,
  OrderSetCustomerEmailAction,
  OrderUpdate,
} from '@commercetools/platform-sdk';
import { Writeable } from '../../../utils/types';

export const injectCartApi = (BaseCartApi: any): typeof BaseCartApi => {
  return class CartApi extends BaseCartApi {
    async getByPureId(cartId: string): Promise<Cart> {
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
          return this.buildCartWithAvailableShippingMethods(response.body, locale);
        })
        .catch((error: any) => {
          throw new Error(error.message);
        });
    }

    async getCommercetoolsCartById(cartId: string): Promise<CommercetoolsCart> {
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
          return response.body;
        });
    }

    async getCommercetoolsOrderById(orderId: string): Promise<CommercetoolsCart> {
      return await this.requestBuilder()
        .orders()
        .withId({
          ID: orderId,
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
        .then((response: ClientResponse<CommercetoolsOrder>) => {
          return response.body;
        });
    }

    async getAllSuperuserCartsInStore(storeKey: string): Promise<CommercetoolsCart[]> {
      const where = [`cartState="Active"`, `store(key="${storeKey}")`, `businessUnit(key="${this.businessUnitKey}")`];

      return await this.requestBuilder()
        .carts()
        .get({
          queryArgs: {
            limit: 15,
            expand: [
              'lineItems[*].discountedPrice.includedDiscounts[*].discount',
              'discountCodes[*].discountCode',
              'paymentInfo.payments[*]',
              'createdBy.associate',
            ],
            where,
            sort: 'createdAt desc',
          },
        })
        .execute()
        .then((response: ClientResponse<CartPagedQueryResponse>) => {
          if (response.body.count >= 1) {
            return response.body.results;
          }
          return [];
        })
        .catch((error: any) => {
          throw new Error(error.message);
        });
    }

    createSuperuserCart: (storeKey: string, superuser?: boolean) => Promise<Cart> = async (
      storeKey: string,
      superuser?: boolean,
    ) => {
      const locale = await this.getCommercetoolsLocal();

      const cartDraft: Writeable<CartDraft> = {
        currency: locale.currency,
        country: locale.country,
        locale: locale.language,
        store: {
          key: storeKey,
          typeId: 'store',
        },
        inventoryMode: 'ReserveOnOrder',
      };

      if (!superuser) {
        cartDraft.customerId = this.accountId;
      } else {
        cartDraft.origin = 'Merchant';
      }

      return await this.associateEndpoints(this.accountId, this.businessUnitKey)
        .carts()
        .post({
          queryArgs: {
            expand: [
              'lineItems[*].discountedPrice.includedDiscounts[*].discount',
              'discountCodes[*].discountCode',
              'paymentInfo.payments[*]',
            ],
          },
          body: cartDraft,
        })
        .execute()
        .then(
          async (response: ClientResponse<CommercetoolsCart>) =>
            await this.buildCartWithAvailableShippingMethods(response.body, locale),
        )
        .catch((error: any) => {
          throw new Error(error.message);
        });
    };

    public setOriginalCustomerData: (
      commercetoolsCart: CommercetoolsCart,
      email: string,
      customType: string,
      originalEmailFieldKey: string,
    ) => Promise<CommercetoolsCart> = async (
      comercetoolsCart: CommercetoolsCart,
      email: string,
      customType: string,
      originalEmailFieldKey: string,
    ) => {
      const cartUpdate: CartUpdate = {
        version: +comercetoolsCart.version,
        actions: [
          {
            action: 'setCustomType',
            type: {
              typeId: 'type',
              key: customType,
            },
            fields: {
              [originalEmailFieldKey]: email,
            },
          } as CartSetCustomTypeAction,
        ],
      };

      return this.requestBuilder()
        .carts()
        .withId({ ID: comercetoolsCart.id })
        .post({ body: cartUpdate })
        .execute()
        .then((response: ClientResponse<CommercetoolsCart>) => response.body)
        .catch((error: any) => {
          throw new Error(error.message);
        });
    };

    public setSuperUserEmailOnOrder: (
      orderId: string,
      orderVersion: string,
      originalOwnerEmail: string,
      superUserEmail: string,
      customType: string,
      customField: string,
    ) => Promise<CommercetoolsCart> = async (
      orderId: string,
      orderVersion: string,
      originalOwnerEmail: string,
      superUserEmail: string,
      customType: string,
      customField: string,
    ) => {
      const orderUpdate: Writeable<OrderUpdate> = {
        version: +orderVersion,
        actions: [
          {
            action: 'setCustomType',
            type: {
              typeId: 'type',
              key: customType,
            },
            fields: {
              [customField]: superUserEmail,
            },
          } as OrderSetCustomTypeAction,
        ],
      };

      if (originalOwnerEmail) {
        orderUpdate.actions.push({
          action: 'setCustomerEmail',
          email: originalOwnerEmail,
        } as OrderSetCustomerEmailAction);
      }

      return this.requestBuilder()
        .orders()
        .withId({ ID: orderId })
        .post({ body: orderUpdate })
        .execute()
        .then((response: ClientResponse<CommercetoolsOrder>) => response.body)
        .catch((error: any) => {
          throw new Error(error.message);
        });
    };
    public setOriginalCustomerDataOnCart: (
      cartId: string,
      cartversion: string,
      originalOwnerEmail: string,
    ) => Promise<CommercetoolsCart> = async (cartId: string, cartversion: string, originalOwnerEmail: string) => {
      const cartUpdate: CartUpdate = {
        version: +cartversion,
        actions: [
          {
            action: 'setCustomerEmail',
            email: originalOwnerEmail,
          } as CartSetCustomerEmailAction,
        ],
      };

      return this.requestBuilder()
        .carts()
        .withId({ ID: cartId })
        .post({ body: cartUpdate })
        .execute()
        .then((response: ClientResponse<CommercetoolsOrder>) => response.body)
        .catch((error: any) => {
          throw new Error(error.message);
        });
    };
  };
};
