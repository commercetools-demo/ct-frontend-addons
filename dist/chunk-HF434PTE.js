import {
  calculateNextDeliveryDate,
  getSubscriptionGroups
} from "./chunk-M5BHFVAK.js";
import {
  injectCartApi
} from "./chunk-3ZSQQQS3.js";

// src/subscription/extensions/apis/SubscriptionApi.ts
var createSubscriptionApi = (BaseApi, configuration) => {
  const CartApi = extractDependency("CartApi", configuration);
  const ProductApi = extractDependency("ProductApi", configuration);
  const SubscriptionMapper = createSubscriptionMapper(configuration);
  return class SubscriptionApi extends BaseApi {
    constructor() {
      super(...arguments);
      this.validateCustomFields = (configuration2) => {
        if (configuration2.props.orderCustomType.originalOrderFieldKey && configuration2.props.orderCustomType.subscriptionProductFieldKey && configuration2.props.orderCustomType.subscriptionSKUFieldKey && configuration2.props.orderCustomType.isActiveFieldKey && configuration2.props.orderCustomType.isSubscriptionCustomFieldKey && configuration2.props.orderCustomType.nextRecurrenceFieldKey && configuration2.props.orderCustomType.lastRecurrenceFieldKey && configuration2.props.lineItemCustomType.customTypeKey && configuration2.props.lineItemCustomType.parentLineItemCustomFieldKey && configuration2.props.lineItemCustomType.isSubscriptionCustomFieldKey && configuration2.props.product.attributeNameOnSubscriptionProduct) {
          return true;
        } else {
          return false;
        }
      };
      this.getSubscriptionsForAccount = async (accountId) => {
        try {
          const locale = await this.getCommercetoolsLocal();
          if (this.validateCustomFields(configuration)) {
            const {
              isActiveFieldKey,
              nextRecurrenceFieldKey,
              originalOrderFieldKey,
              subscriptionProductFieldKey,
              subscriptionSKUFieldKey
            } = configuration.props.orderCustomType;
            const response = await this.requestBuilder().carts().get({
              queryArgs: {
                where: [`customerId="${accountId}"`, `custom(fields(${originalOrderFieldKey} is defined))`],
                expand: [
                  "lineItems[*].variant",
                  "store",
                  `custom.fields.${originalOrderFieldKey}`,
                  `custom.fields.${subscriptionProductFieldKey}`
                ]
              }
            }).execute();
            return response.body.results.map(
              (commercetoolsCart) => SubscriptionMapper.commercetoolsCartToCart(
                commercetoolsCart,
                locale,
                originalOrderFieldKey,
                subscriptionSKUFieldKey,
                subscriptionProductFieldKey,
                nextRecurrenceFieldKey,
                isActiveFieldKey
              )
            );
          }
          console.error("config for subscriptions is not in place");
          return [];
        } catch (error) {
          throw new Error(`Get subscriptions for account failed: ${error}`);
        }
      };
      this.handleSubscriptionsOnOrder = async (cart, order) => {
        if (this.validateCustomFields(configuration)) {
          const {
            originalOrderFieldKey,
            subscriptionProductFieldKey,
            subscriptionSKUFieldKey,
            nextRecurrenceFieldKey,
            isSubscriptionCustomFieldKey,
            isActiveFieldKey
          } = configuration.props.orderCustomType;
          const {
            isSubscriptionCustomFieldKey: lineItemIsSubscriptionCustomFieldKey,
            parentLineItemCustomFieldKey,
            customTypeKey
          } = configuration.props.lineItemCustomType;
          const { attributeNameOnSubscriptionProduct } = configuration.props.product;
          const subscriptionGroups = getSubscriptionGroups(
            cart,
            parentLineItemCustomFieldKey,
            lineItemIsSubscriptionCustomFieldKey
          );
          if (subscriptionGroups) {
            const productApi = new ProductApi(this.frontasticContext, this.locale, this.currency);
            const cartApi = new CartApi(this.frontasticContext, this.locale, this.currency);
            for await (const sku of Object.keys(subscriptionGroups)) {
              const interval = attributeNameOnSubscriptionProduct ? parseInt(subscriptionGroups[sku].variant?.attributes?.[attributeNameOnSubscriptionProduct]?.key) : 0;
              const nextDeliveryDate = calculateNextDeliveryDate(subscriptionGroups[sku].variant, interval);
              const productQuery = {
                skus: [sku]
              };
              const subscriptionProduct = await productApi.getProduct(productQuery);
              let nextCart = await cartApi.replicateCart(order.cartId);
              nextCart = await cartApi.setCartExpirationDays(nextCart, interval + 1);
              nextCart = await cartApi.removeAllLineItems(nextCart);
              nextCart = await cartApi.addItemsToCart(nextCart, subscriptionGroups[sku].lineItems);
              nextCart = await cartApi.setCustomType(nextCart, customTypeKey, {
                [originalOrderFieldKey]: {
                  typeId: "order",
                  id: order.cartId
                },
                [subscriptionProductFieldKey]: {
                  typeId: "product",
                  id: subscriptionProduct.productId
                },
                [subscriptionSKUFieldKey]: sku,
                [nextRecurrenceFieldKey]: nextDeliveryDate,
                [isSubscriptionCustomFieldKey]: true,
                [isActiveFieldKey]: true
              });
            }
          }
        }
      };
    }
  };
};

// src/subscription/extensions/utils.ts
var extractDependency = (dependency, configuration) => {
  if (configuration.dependencies?.[dependency]) {
    switch (dependency) {
      case "CartApi":
        return injectCartApi(configuration.dependencies.CartApi);
      case "ProductApi":
        return configuration.dependencies.ProductApi;
      case "SubscriptionApi":
        return createSubscriptionApi(configuration.dependencies.BaseApi, configuration);
      case "CaerMapper":
        return configuration.dependencies.CartMapper;
      case "ProductMapper":
        return configuration.dependencies.ProductMapper;
    }
  }
};

// src/subscription/extensions/mappers/SubscriptionMapper.ts
var createSubscriptionMapper = (configuration) => {
  const CartMapper = extractDependency("CartMapper", configuration);
  const ProductMapper = extractDependency("ProductMapper", configuration);
  return class SubscriptionMapper {
    static commercetoolsCartToCart(commercetoolsCart, locale, originalOrderFieldKey, subscriptionSKUFieldKey, subscriptionProductFieldKey, nextRecurrenceFieldKey, isActiveFieldKey) {
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
          locale
        ),
        taxed: CartMapper.commercetoolsTaxedPriceToTaxed(commercetoolsCart.taxedPrice, locale),
        discountedAmount: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsCart.discountOnTotalPrice?.discountedAmount
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
          isActiveFieldKey
        )
      };
    }
    static commercetoolsCustomToSubscriptions(locale, commercetoolsCustom, originalOrderFieldKey, subscriptionSKUFieldKey, subscriptionProductFieldKey, nextRecurrenceFieldKey, isActiveFieldKey) {
      if (!originalOrderFieldKey || !subscriptionSKUFieldKey || !subscriptionProductFieldKey || !nextRecurrenceFieldKey || !isActiveFieldKey) {
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
        isActive: commercetoolsCustom?.fields?.[isActiveFieldKey]
      };
    }
  };
};

export {
  createSubscriptionMapper,
  createSubscriptionApi,
  extractDependency
};
