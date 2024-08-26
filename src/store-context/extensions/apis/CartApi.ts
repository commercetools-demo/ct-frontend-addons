import { Account } from '@commercetools/frontend-domain-types/account';
import { Cart } from '../types/Cart';
import { ExternalError } from '../../../utils/Errors';
import { CartDraft, CartSetCountryAction, CartSetLocaleAction, CartUpdate } from '@commercetools/platform-sdk';
import { Cart as CommercetoolsCart } from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
import { extractDependency } from '../utils';
import { LineItem } from '@commercetools/frontend-domain-types/wishlist';
export const injectCartApi = (BaseCartApi: any, config?: any): typeof BaseCartApi => {
  const CartMapper = extractDependency('CartMapper', config);
  return class CartApi extends BaseCartApi {
    protected async getForUser(account: Account, params: { storeKey?: string }): Promise<Cart> {
      const locale = await this.getCommercetoolsLocal();

      const where = [`customerId="${account.accountId}"`, `cartState="Active"`];
      if (params.storeKey) {
        where.push(`store(key="${params.storeKey}")`);
      }
      const response = await this.requestBuilder()
        .carts()
        .get({
          queryArgs: {
            limit: 1,
            expand: [
              'lineItems[*].discountedPrice.includedDiscounts[*].discount',
              'discountCodes[*].discountCode',
              'paymentInfo.payments[*]',
            ],
            where,
            sort: 'lastModifiedAt desc',
          },
        })
        .execute()
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });

      if (response.body.count >= 1) {
        return this.buildCartWithAvailableShippingMethods(response.body.results[0], locale);
      }

      const cartDraft: CartDraft = {
        currency: locale.currency,
        country: locale.country,
        locale: locale.language,
        customerId: account.accountId,
        inventoryMode: 'ReserveOnOrder',
        ...(params.storeKey && {
          store: {
            typeId: 'store',
            key: params.storeKey,
          },
        }),
      };

      return await this.requestBuilder()
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
        .then((response) => {
          return this.buildCartWithAvailableShippingMethods(response.body, locale);
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }
    protected async getAnonymous(params: { storeKey?: string }): Promise<Cart> {
      const locale = await this.getCommercetoolsLocal();
      const where = [`anonymousId="${this.getAnonymousIdFromSessionData()}"`, `cartState="Active"`];
      if (params.storeKey) {
        where.push(`store(key="${params.storeKey}")`);
      }

      const response = await this.requestBuilder()
        .carts()
        .get({
          queryArgs: {
            limit: 1,
            expand: [
              'lineItems[*].discountedPrice.includedDiscounts[*].discount',
              'discountCodes[*].discountCode',
              'paymentInfo.payments[*]',
            ],
            where,
            sort: 'createdAt desc',
          },
        })
        .execute()
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });

      if (response.body.count >= 1) {
        return this.buildCartWithAvailableShippingMethods(response.body.results[0], locale);
      }

      // If there is no active cart, we create one with new anonymousId and checkout token
      this.invalidateSessionAnonymousId();
      const anonymousId = this.getAnonymousIdFromSessionData();

      const cartDraft: CartDraft = {
        currency: locale.currency,
        country: locale.country,
        locale: locale.language,
        anonymousId: anonymousId,
        inventoryMode: 'ReserveOnOrder',
        ...(params.storeKey && {
          store: {
            typeId: 'store',
            key: params.storeKey,
          },
        }),
      };

      return await this.requestBuilder()
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
        .then((response) => {
          return this.buildCartWithAvailableShippingMethods(response.body, locale);
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    protected buildCartWithAvailableShippingMethods: (
      commercetoolsCart: CommercetoolsCart,
      locale: Locale,
    ) => Promise<Cart> = async (commercetoolsCart: CommercetoolsCart, locale: Locale) => {
      const cart = await this.assertCorrectLocale(commercetoolsCart, locale);

      // It would not be possible to get available shipping method
      // if the shipping address has not been set.
      if (cart.shippingAddress !== undefined && cart.shippingAddress.country !== undefined) {
        cart.availableShippingMethods = await this.getAvailableShippingMethods(cart);
      }

      return cart;
    };
    protected async assertCorrectLocale(commercetoolsCart: CommercetoolsCart, locale: Locale): Promise<Cart> {
      const storeKey = this.getSessionData()?.storeKey;
      const supplyChannelId = this.getSessionData()?.supplyChannelId;

      if (
        commercetoolsCart.totalPrice.currencyCode !== locale.currency.toLocaleUpperCase() ||
        (storeKey && commercetoolsCart.store?.key !== storeKey)
      ) {
        return this.recreate(commercetoolsCart, locale);
      }

      if (this.doesCartNeedLocaleUpdate(commercetoolsCart, locale)) {
        const cartUpdate: CartUpdate = {
          version: commercetoolsCart.version,
          actions: [
            {
              action: 'setCountry',
              country: locale.country,
            } as CartSetCountryAction,
            {
              action: 'setLocale',
              country: locale.language,
            } as CartSetLocaleAction,
          ],
        };

        commercetoolsCart = await this.updateCart(commercetoolsCart.id, cartUpdate, locale);

        return CartMapper.commercetoolsCartToCart(commercetoolsCart, locale, this.defaultLocale, supplyChannelId);
      }

      return CartMapper.commercetoolsCartToCart(commercetoolsCart, locale, this.defaultLocale, supplyChannelId);
    }

    protected async addToCart(
      cart: Cart,
      lineItem: LineItem,
      distributionChannelId?: string,
      supplyChannelId?: string,
    ): Promise<Cart> {
      const locale = await this.getCommercetoolsLocal();

      const cartUpdate: CartUpdate = {
        version: +cart.cartVersion,
        actions: [],
      };

      cartUpdate.actions.push({
        action: 'addLineItem',
        ...(distributionChannelId && {
          distributionChannel: { typeId: 'channel', id: distributionChannelId },
        }),
        ...(supplyChannelId && {
          supplyChannel: { typeId: 'channel', id: supplyChannelId },
        }),
        sku: lineItem.variant.sku,
        quantity: +lineItem.count,
      });

      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);

      return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
  };
};
