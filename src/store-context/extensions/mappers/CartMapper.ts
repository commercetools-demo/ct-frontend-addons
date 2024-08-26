import { LineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Locale } from '../../../utils/locale';
import { Cart } from '../types/Cart';
import {
  Cart as CommercetoolsCart,
  LineItem as CommercetoolsLineItem,
  ProductVariant as CommercetoolsProductVariant,
} from '@commercetools/platform-sdk';
import LocalizedValue from '../../../shared/utils/LocalizedValue';
import { extractDependency } from '../utils';
import { ProductRouter } from '../../../configurable-products/extensions/utils/product-router';
import { Variant } from '@commercetools/frontend-domain-types/product';
export const injectCartMapper = (BaseCartMapper: any, config: any): typeof BaseCartMapper => {
  const ProductMapper = extractDependency('ProductMapper', config);
  return class CartMapper extends BaseCartMapper {
    static commercetoolsCartToCart: (
      commercetoolsCart: CommercetoolsCart,
      locale: Locale,
      defaultLocale: string,
      supplyChannelId?: string,
    ) => Cart = (
      commercetoolsCart: CommercetoolsCart,
      locale: Locale,
      defaultLocale: string,
      supplyChannelId?: string,
    ) => {
      return {
        ...super.commercetoolsCartToCart(commercetoolsCart, locale, defaultLocale),
        lineItems: CartMapper.commercetoolsLineItemsToLineItems(
          commercetoolsCart.lineItems,
          locale,
          defaultLocale,
          supplyChannelId,
        ),
        storeKey: commercetoolsCart.store?.key,
      };
    };

    static commercetoolsLineItemsToLineItems: (
      commercetoolsLineItems: CommercetoolsLineItem[],
      locale: Locale,
      defaultLocale: string,
      supplyChannelId?: string,
    ) => LineItem[] = (
      commercetoolsLineItems: CommercetoolsLineItem[],
      locale: Locale,
      defaultLocale: string,
      supplyChannelId?: string,
    ) => {
      const lineItems: LineItem[] = [];

      commercetoolsLineItems?.forEach((commercetoolsLineItem) => {
        const item: LineItem = {
          lineItemId: commercetoolsLineItem.id,
          productId: commercetoolsLineItem.productId,
          name: LocalizedValue.getLocalizedValue(locale, defaultLocale, commercetoolsLineItem?.name) || '',
          type: 'variant',
          count: commercetoolsLineItem.quantity,
          price: ProductMapper.commercetoolsMoneyToMoney(commercetoolsLineItem.price?.value),
          discountedPrice: ProductMapper.commercetoolsMoneyToMoney(commercetoolsLineItem.price?.discounted?.value),
          discountTexts: CartMapper.commercetoolsDiscountedPricesPerQuantityToDiscountTexts(
            commercetoolsLineItem.discountedPricePerQuantity,
            locale,
            defaultLocale,
          ),
          discounts: CartMapper.commercetoolsDiscountedPricesPerQuantityToDiscounts(
            commercetoolsLineItem.discountedPricePerQuantity,
            locale,
            defaultLocale,
          ),
          totalPrice: ProductMapper.commercetoolsMoneyToMoney(commercetoolsLineItem.totalPrice),
          variant: ProductMapper.commercetoolsProductVariantToVariant(
            commercetoolsLineItem.variant,
            locale,
            supplyChannelId,
          ),
          isGift:
            commercetoolsLineItem?.lineItemMode !== undefined && commercetoolsLineItem.lineItemMode === 'GiftLineItem',
        };
        item._url = ProductRouter.generateUrlFor(item);
        lineItems.push(item);
      });

      return lineItems;
    };

    static commercetoolsProductVariantToVariant(
      commercetoolsVariant: CommercetoolsProductVariant,
      locale: Locale,
      supplyChannelId?: string,
    ): Variant {
      const attributes = this.commercetoolsAttributesToAttributes(commercetoolsVariant.attributes, locale);
      const { price, discountedPrice, discounts } = this.extractPriceAndDiscounts(commercetoolsVariant, locale);

      return {
        id: commercetoolsVariant.id?.toString(),
        sku: commercetoolsVariant.sku?.toString(),
        images: [
          ...commercetoolsVariant.assets.map((asset) => asset.sources?.[0].uri),
          ...commercetoolsVariant.images.map((image) => image.url),
        ],
        groupId: attributes?.baseId || undefined,
        attributes: attributes,
        price: price,
        discountedPrice: discountedPrice,
        discounts: discounts,
        isOnStock: supplyChannelId
          ? commercetoolsVariant.availability?.channels?.[supplyChannelId]?.isOnStock
          : commercetoolsVariant.availability?.isOnStock || undefined,
        restockableInDays: supplyChannelId
          ? commercetoolsVariant.availability?.channels?.[supplyChannelId]?.restockableInDays
          : commercetoolsVariant.availability?.restockableInDays || undefined,
        availableQuantity: supplyChannelId
          ? commercetoolsVariant.availability?.channels?.[supplyChannelId]?.availableQuantity
          : commercetoolsVariant.availability?.availableQuantity || undefined,
      } as Variant;
    }
  };
};
