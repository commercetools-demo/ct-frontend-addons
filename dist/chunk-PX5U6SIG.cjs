"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkRUW2XDBNcjs = require('./chunk-RUW2XDBN.cjs');



var _chunk3ZKYW53Kcjs = require('./chunk-3ZKYW53K.cjs');

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
          const subscriptionGroups = _chunk3ZKYW53Kcjs.getSubscriptionGroups.call(void 0, 
            cart,
            parentLineItemCustomFieldKey,
            lineItemIsSubscriptionCustomFieldKey
          );
          if (subscriptionGroups) {
            const productApi = new ProductApi(this.frontasticContext, this.locale, this.currency);
            const cartApi = new CartApi(this.frontasticContext, this.locale, this.currency);
            for await (const sku of Object.keys(subscriptionGroups)) {
              const interval = attributeNameOnSubscriptionProduct ? parseInt(_optionalChain([subscriptionGroups, 'access', _ => _[sku], 'access', _2 => _2.variant, 'optionalAccess', _3 => _3.attributes, 'optionalAccess', _4 => _4[attributeNameOnSubscriptionProduct], 'optionalAccess', _5 => _5.key])) : 0;
              const nextDeliveryDate = _chunk3ZKYW53Kcjs.calculateNextDeliveryDate.call(void 0, subscriptionGroups[sku].variant, interval);
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
  if (_optionalChain([configuration, 'access', _6 => _6.dependencies, 'optionalAccess', _7 => _7[dependency]])) {
    switch (dependency) {
      case "CartApi":
        return _chunkRUW2XDBNcjs.injectCartApi.call(void 0, configuration.dependencies.CartApi);
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
        email: _optionalChain([commercetoolsCart, 'optionalAccess', _8 => _8.customerEmail]),
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
          _optionalChain([commercetoolsCart, 'access', _9 => _9.discountOnTotalPrice, 'optionalAccess', _10 => _10.discountedAmount])
        ),
        itemShippingAddresses: commercetoolsCart.itemShippingAddresses,
        origin: commercetoolsCart.origin,
        cartState: CartMapper.commercetoolsCartStateToCartState(commercetoolsCart.cartState),
        businessUnitKey: _optionalChain([commercetoolsCart, 'access', _11 => _11.businessUnit, 'optionalAccess', _12 => _12.key]),
        storeKey: _optionalChain([commercetoolsCart, 'access', _13 => _13.store, 'optionalAccess', _14 => _14.key]),
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
        order: _optionalChain([commercetoolsCustom, 'optionalAccess', _15 => _15.fields, 'optionalAccess', _16 => _16[originalOrderFieldKey], 'optionalAccess', _17 => _17.obj]),
        sku: _optionalChain([commercetoolsCustom, 'optionalAccess', _18 => _18.fields, 'optionalAccess', _19 => _19[subscriptionSKUFieldKey]]),
        // TODO: Fix this
        // product: ProductMapper.commercetoolsProductProjectionToProduct(
        //   commercetoolsCustom?.fields?.[subscriptionProductFieldKey]?.obj?.masterData?.current,
        //   locale,
        // ),
        nextDeliveryDate: _optionalChain([commercetoolsCustom, 'optionalAccess', _20 => _20.fields, 'optionalAccess', _21 => _21[nextRecurrenceFieldKey]]),
        isActive: _optionalChain([commercetoolsCustom, 'optionalAccess', _22 => _22.fields, 'optionalAccess', _23 => _23[isActiveFieldKey]])
      };
    }
  };
};





exports.createSubscriptionMapper = createSubscriptionMapper; exports.createSubscriptionApi = createSubscriptionApi; exports.extractDependency = extractDependency;
