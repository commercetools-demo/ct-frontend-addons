import { CustomFields } from '@commercetools/platform-sdk';
import { Cart as CommercetoolsCart } from '@commercetools/platform-sdk';
import { Cart, Subscription } from '../../../shared/types';
import { Locale } from '../../../utils/locale';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';

interface SubscriptionMapperType {
  commercetoolsCartToCart(
    commercetoolsCart: CommercetoolsCart,
    locale: Locale,
    originalOrderFieldKey?: string,
    subscriptionSKUFieldKey?: string,
    subscriptionProductFieldKey?: string,
    nextRecurrenceFieldKey?: string,
    isActiveFieldKey?: string,
  ): Cart;
}

export const createSubscriptionMapper = (configuration: Configuration): SubscriptionMapperType => {
  const CartMapper = extractDependency('CartMapper', configuration);
  const ProductMapper = extractDependency('ProductMapper', configuration);
  return class SubscriptionMapper {
    static commercetoolsCartToCart(
      commercetoolsCart: CommercetoolsCart,
      locale: Locale,
      originalOrderFieldKey?: string,
      subscriptionSKUFieldKey?: string,
      subscriptionProductFieldKey?: string,
      nextRecurrenceFieldKey?: string,
      isActiveFieldKey?: string,
    ): Cart {
      return {
        cartId: commercetoolsCart.id,
        customerId: commercetoolsCart.customerId,
        cartVersion: commercetoolsCart.version.toString(),
        lineItems: CartMapper.commercetoolsLineItemsToLineItems(commercetoolsCart.lineItems, locale),
        email: commercetoolsCart?.customerEmail,
        sum: ProductMapper.commercetoolsMoneyToMoney(commercetoolsCart.totalPrice),
        shippingAddress: CartMapper.commercetoolsAddressToAddress(commercetoolsCart.shippingAddress),
        billingAddress: CartMapper.commercetoolsAddressToAddress(commercetoolsCart.billingAddress),
        shippingInfo: CartMapper.commercetoolsShippingInfoToShippingInfo(commercetoolsCart.shippingInfo, locale),
        payments: CartMapper.commercetoolsPaymentInfoToPayments(commercetoolsCart.paymentInfo, locale),
        discountCodes: CartMapper.commercetoolsDiscountCodesInfoToDiscountCodes(
          commercetoolsCart.discountCodes,
          locale,
        ),
        taxed: CartMapper.commercetoolsTaxedPriceToTaxed(commercetoolsCart.taxedPrice, locale),
        discountedAmount: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsCart.discountOnTotalPrice?.discountedAmount,
        ),
        itemShippingAddresses: commercetoolsCart.itemShippingAddresses,
        origin: commercetoolsCart.origin,
        cartState: CartMapper.commercetoolsCartStateToCartState(commercetoolsCart.cartState),
        businessUnitKey: commercetoolsCart.businessUnit?.key,
        storeKey: commercetoolsCart.store?.key,
        subscription: SubscriptionMapper.commercetoolsCustomToSubscriptions(
          locale,
          commercetoolsCart.custom,
          originalOrderFieldKey,
          subscriptionSKUFieldKey,
          subscriptionProductFieldKey,
          nextRecurrenceFieldKey,
          isActiveFieldKey,
        ),
      };
    }

    private static commercetoolsCustomToSubscriptions(
      locale: Locale,
      commercetoolsCustom?: CustomFields,
      originalOrderFieldKey?: string,
      subscriptionSKUFieldKey?: string,
      subscriptionProductFieldKey?: string,
      nextRecurrenceFieldKey?: string,
      isActiveFieldKey?: string,
    ): Subscription {
      if (
        !originalOrderFieldKey ||
        !subscriptionSKUFieldKey ||
        !subscriptionProductFieldKey ||
        !nextRecurrenceFieldKey ||
        !isActiveFieldKey
      ) {
        return {};
      }
      return {
        order: commercetoolsCustom?.fields?.[originalOrderFieldKey]?.obj,
        sku: commercetoolsCustom?.fields?.[subscriptionSKUFieldKey],
        // TODO: Fix this
        // product: ProductMapper.commercetoolsProductProjectionToProduct(
        //   commercetoolsCustom?.fields?.[subscriptionProductFieldKey]?.obj?.masterData?.current,
        //   locale,
        // ),
        nextDeliveryDate: commercetoolsCustom?.fields?.[nextRecurrenceFieldKey],
        isActive: commercetoolsCustom?.fields?.[isActiveFieldKey],
      };
    }
  };
};
