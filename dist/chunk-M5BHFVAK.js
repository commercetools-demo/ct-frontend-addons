// src/subscription/extensions/utils/subscription.ts
var calculateNextDeliveryDate = (variant, interval) => {
  if (interval) {
    const date2 = /* @__PURE__ */ new Date();
    date2.setDate(date2.getDate() + interval);
    return date2.toJSON();
  }
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() - 1);
  return date.toJSON();
};
var getSubscriptionGroups = (cart, parentLineItemCustomFieldKey, lineItemIsSubscriptionCustomFieldKey) => {
  if (cart) {
    const subscriptionItems = cart.lineItems?.filter(
      (lineItem) => !!lineItem.custom?.fields?.[parentLineItemCustomFieldKey] && lineItem.custom?.fields?.[lineItemIsSubscriptionCustomFieldKey]
    );
    const uniqueSubscriptionSkusMap = subscriptionItems?.map((lineItem) => lineItem.variant).reduce((prev, variant) => {
      if (variant.sku)
        prev[variant.sku] = { lineItems: [], variant };
      return prev;
    }, {});
    const uniqueSubscriptionSkus = Object.keys(uniqueSubscriptionSkusMap);
    if (uniqueSubscriptionSkus.length) {
      uniqueSubscriptionSkus.forEach((sku) => {
        const parentItemIds = subscriptionItems.filter((lineItem) => lineItem.variant.sku === sku).map((lineItem) => lineItem.custom?.fields[parentLineItemCustomFieldKey]);
        const parentLineItems = cart.lineItems?.filter((lineItem) => parentItemIds?.includes(lineItem.lineItemId));
        uniqueSubscriptionSkusMap[sku].lineItems = parentLineItems;
      });
      return uniqueSubscriptionSkusMap;
    }
  }
  return void 0;
};
function findNewLineItem(cart, body) {
  return cart.lineItems?.find((item) => item.variant?.sku === body.variant?.sku && item.count === body.variant?.count)?.lineItemId;
}
var handleSubscriptionsOnAddToCart = async (cart, body, cartApi, customTypeKey, parentLineItemCustomFieldKey, isSubscriptionCustomFieldKey) => {
  if (parentLineItemCustomFieldKey && isSubscriptionCustomFieldKey && customTypeKey) {
    const lineItemId = findNewLineItem(cart, body);
    if (lineItemId && body.subscriptions?.length) {
      const bundleLineItems = getBundleLineItemsDraft(
        body,
        customTypeKey,
        {
          [parentLineItemCustomFieldKey]: lineItemId,
          [isSubscriptionCustomFieldKey]: true
        }
      );
      cart = await cartApi.addLinkedLineitemsToCart(cart, bundleLineItems);
    }
  }
  return cart;
};
function getBundleLineItemsDraft(body, customType, fields) {
  return body.subscriptions?.map((field) => ({
    variant: {
      sku: field.sku || void 0,
      distributionChannelId: field.distributionChannelId,
      supplyChannelId: field.supplyChannelId,
      // @ts-ignore
      price: void 0
    },
    count: +(field.count || 1),
    custom: {
      type: {
        key: customType,
        typeId: "type"
      },
      fields
    }
  }));
}

export {
  calculateNextDeliveryDate,
  getSubscriptionGroups,
  handleSubscriptionsOnAddToCart
};
