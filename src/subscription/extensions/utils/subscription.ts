import { Cart, LineItem } from '../../../shared/types';
import { LineItemVariant } from '../types';



export const calculateNextDeliveryDate = (variant: LineItem['variant'], interval: number): string => {
  if (interval) {
    const date = new Date();
    date.setDate(date.getDate() + interval);
    return date.toJSON();
  }
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toJSON();
};

export const getSubscriptionGroups = (
  cart: Cart,
  parentLineItemCustomFieldKey: string,
  lineItemIsSubscriptionCustomFieldKey: string,
): Record<string, { lineItems: LineItem[]; variant: LineItem['variant'] }> | undefined => {
  if (cart) {
    const subscriptionItems: LineItem[] = cart.lineItems?.filter(
      (lineItem) =>
        !!lineItem.custom?.fields?.[parentLineItemCustomFieldKey] &&
        lineItem.custom?.fields?.[lineItemIsSubscriptionCustomFieldKey],
    );
    const uniqueSubscriptionSkusMap = subscriptionItems
      ?.map((lineItem) => lineItem.variant)
      .reduce((prev: Record<string, { lineItems: LineItem[]; variant: LineItem['variant'] }>, variant) => {
        if (variant.sku) prev[variant.sku] = { lineItems: [], variant };
        return prev;
      }, {});
    const uniqueSubscriptionSkus = Object.keys(uniqueSubscriptionSkusMap);
    if (uniqueSubscriptionSkus.length) {
      uniqueSubscriptionSkus.forEach((sku) => {
        const parentItemIds = subscriptionItems
          .filter((lineItem) => lineItem.variant.sku === sku)
          .map((lineItem) => lineItem.custom?.fields[parentLineItemCustomFieldKey]);
        const parentLineItems = cart.lineItems?.filter((lineItem) => parentItemIds?.includes(lineItem.lineItemId));
        uniqueSubscriptionSkusMap[sku].lineItems = parentLineItems;
      });
      return uniqueSubscriptionSkusMap;
    }
  }
  return undefined;
};

function findNewLineItem(cart: Cart, body: { variant?: LineItemVariant }) {
  return cart.lineItems?.find((item) => item.variant?.sku === body.variant?.sku && item.count === body.variant?.count)
    ?.lineItemId;
}

export const handleSubscriptionsOnAddToCart = async (
  cart: Cart,
  body: { variant?: LineItemVariant; subscriptions?: Partial<LineItemVariant>[] },
  cartApi: any,
  customTypeKey: string,
  parentLineItemCustomFieldKey: string,
  isSubscriptionCustomFieldKey: string,
): Promise<Cart> => {
  if (
    parentLineItemCustomFieldKey &&
    isSubscriptionCustomFieldKey &&
    customTypeKey
  ) {
    const lineItemId = findNewLineItem(cart, body);

    if (lineItemId && body.subscriptions?.length) {
      const bundleLineItems = getBundleLineItemsDraft(
        body,
        customTypeKey,
        {
          [parentLineItemCustomFieldKey]: lineItemId,
          [isSubscriptionCustomFieldKey]: true,
        },
      );
      // @ts-ignore
      cart = await cartApi.addLinkedLineitemsToCart(cart, bundleLineItems);
    }
  }
  return cart;
};

function getBundleLineItemsDraft(
  body: {
    variant?: LineItemVariant;
    subscriptions?: Partial<LineItemVariant>[];
  },
  customType: string,
  fields: Record<string, string | boolean>,
) {
  return body.subscriptions?.map((field: Partial<LineItemVariant>) => ({
    variant: {
      sku: field.sku || undefined,
      distributionChannelId: field.distributionChannelId,
      supplyChannelId: field.supplyChannelId,
      // @ts-ignore
      price: undefined,
    },
    count: +(field.count || 1),
    custom: {
      type: {
        key: customType,
        typeId: 'type',
      },
      fields,
    },
  }));
}