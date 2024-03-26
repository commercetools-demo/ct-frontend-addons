import { Product } from '@commercetools/frontend-domain-types/product';
import { ProductQuery } from '@commercetools/frontend-domain-types/query/ProductQuery';
import { Cart as CommercetoolsCart } from '@commercetools/platform-sdk';
import { Cart, Order } from '../../../shared/types';
import { createSubscriptionMapper } from '../mappers/SubscriptionMapper';
import { calculateNextDeliveryDate, getSubscriptionGroups } from '../utils/subscription';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';

export const createSubscriptionApi = (BaseApi: any, configuration: Configuration): typeof BaseApi => {
  const CartApi = extractDependency('CartApi', configuration);
  const ProductApi = extractDependency('ProductApi', configuration);
  const SubscriptionMapper = createSubscriptionMapper(configuration);
  
  return class SubscriptionApi extends BaseApi {
    private validateCustomFields = (configuration: Configuration) => {
      if (
        configuration.props.orderCustomType.originalOrderFieldKey &&
        configuration.props.orderCustomType.subscriptionProductFieldKey &&
        configuration.props.orderCustomType.subscriptionSKUFieldKey &&
        configuration.props.orderCustomType.isActiveFieldKey &&
        configuration.props.orderCustomType.isSubscriptionCustomFieldKey &&
        configuration.props.orderCustomType.nextRecurrenceFieldKey &&
        configuration.props.orderCustomType.lastRecurrenceFieldKey &&
        configuration.props.lineItemCustomType.customTypeKey &&
        configuration.props.lineItemCustomType.parentLineItemCustomFieldKey &&
        configuration.props.lineItemCustomType.isSubscriptionCustomFieldKey &&
        configuration.props.product.attributeNameOnSubscriptionProduct
      ) {
        return true;
      } else {
        return false;
      }
    };

    getSubscriptionsForAccount = async (accountId: string): Promise<Cart[]> => {
      try {
        const locale = await this.getCommercetoolsLocal();

        if (this.validateCustomFields(configuration)) {
          const {
            isActiveFieldKey,
            nextRecurrenceFieldKey,
            originalOrderFieldKey,
            subscriptionProductFieldKey,
            subscriptionSKUFieldKey,
          } = configuration.props.orderCustomType;
          const response = await this.requestBuilder()
            .carts()
            .get({
              queryArgs: {
                where: [`customerId="${accountId}"`, `custom(fields(${originalOrderFieldKey} is defined))`],
                expand: [
                  'lineItems[*].variant',
                  'store',
                  `custom.fields.${originalOrderFieldKey}`,
                  `custom.fields.${subscriptionProductFieldKey}`,
                ],
              },
            })
            .execute();

          return response.body.results.map((commercetoolsCart: CommercetoolsCart) =>
            SubscriptionMapper.commercetoolsCartToCart(
              commercetoolsCart,
              locale,
              originalOrderFieldKey,
              subscriptionSKUFieldKey,
              subscriptionProductFieldKey,
              nextRecurrenceFieldKey,
              isActiveFieldKey,
            ),
          );
        }
        console.error('config for subscriptions is not in place');
        return [];
      } catch (error) {
        throw new Error(`Get subscriptions for account failed: ${error}`);
      }
    };

    handleSubscriptionsOnOrder = async (cart: Cart, order: Order): Promise<void> => {
      if (this.validateCustomFields(configuration)) {
        const {
          originalOrderFieldKey,
          subscriptionProductFieldKey,
          subscriptionSKUFieldKey,
          nextRecurrenceFieldKey,
          isSubscriptionCustomFieldKey,
          isActiveFieldKey,
        } = configuration.props.orderCustomType;
        const {
          isSubscriptionCustomFieldKey: lineItemIsSubscriptionCustomFieldKey,
          parentLineItemCustomFieldKey,
          customTypeKey,
        } = configuration.props.lineItemCustomType;
        const { attributeNameOnSubscriptionProduct } = configuration.props.product;

        const subscriptionGroups = getSubscriptionGroups(
          cart,
          parentLineItemCustomFieldKey,
          lineItemIsSubscriptionCustomFieldKey,
        );

        if (subscriptionGroups) {
          const productApi = new ProductApi(this.frontasticContext, this.locale, this.currency);
          const cartApi = new CartApi(this.frontasticContext, this.locale, this.currency);

          for await (const sku of Object.keys(subscriptionGroups)) {
            const interval = attributeNameOnSubscriptionProduct
              ? parseInt(subscriptionGroups[sku].variant?.attributes?.[attributeNameOnSubscriptionProduct]?.key)
              : 0;
            const nextDeliveryDate = calculateNextDeliveryDate(subscriptionGroups[sku].variant, interval);
            const productQuery: ProductQuery = {
              skus: [sku],
            };
            const subscriptionProduct: Product = await productApi.getProduct(productQuery);

            //create cart
            let nextCart: Cart = (await cartApi.replicateCart(order.cartId)) as Cart;
            nextCart = (await cartApi.setCartExpirationDays(nextCart, interval + 1)) as Cart;
            nextCart = (await cartApi.removeAllLineItems(nextCart)) as Cart;
            nextCart = (await cartApi.addItemsToCart(nextCart, subscriptionGroups[sku].lineItems)) as Cart;
            nextCart = (await cartApi.setCustomType(nextCart, customTypeKey, {
              [originalOrderFieldKey]: {
                typeId: 'order',
                id: order.cartId,
              },
              [subscriptionProductFieldKey]: {
                typeId: 'product',
                id: subscriptionProduct.productId,
              },
              [subscriptionSKUFieldKey]: sku,
              [nextRecurrenceFieldKey]: nextDeliveryDate,
              [isSubscriptionCustomFieldKey]: true,
              [isActiveFieldKey]: true,
            })) as Cart;
          }
        }
      }
    };
  };
};
