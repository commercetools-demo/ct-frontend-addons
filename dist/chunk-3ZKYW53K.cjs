"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/subscription/extensions/utils/subscription.ts
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
    const subscriptionItems = _optionalChain([cart, 'access', _ => _.lineItems, 'optionalAccess', _2 => _2.filter, 'call', _3 => _3(
      (lineItem) => !!_optionalChain([lineItem, 'access', _4 => _4.custom, 'optionalAccess', _5 => _5.fields, 'optionalAccess', _6 => _6[parentLineItemCustomFieldKey]]) && _optionalChain([lineItem, 'access', _7 => _7.custom, 'optionalAccess', _8 => _8.fields, 'optionalAccess', _9 => _9[lineItemIsSubscriptionCustomFieldKey]])
    )]);
    const uniqueSubscriptionSkusMap = _optionalChain([subscriptionItems, 'optionalAccess', _10 => _10.map, 'call', _11 => _11((lineItem) => lineItem.variant), 'access', _12 => _12.reduce, 'call', _13 => _13((prev, variant) => {
      if (variant.sku)
        prev[variant.sku] = { lineItems: [], variant };
      return prev;
    }, {})]);
    const uniqueSubscriptionSkus = Object.keys(uniqueSubscriptionSkusMap);
    if (uniqueSubscriptionSkus.length) {
      uniqueSubscriptionSkus.forEach((sku) => {
        const parentItemIds = subscriptionItems.filter((lineItem) => lineItem.variant.sku === sku).map((lineItem) => _optionalChain([lineItem, 'access', _14 => _14.custom, 'optionalAccess', _15 => _15.fields, 'access', _16 => _16[parentLineItemCustomFieldKey]]));
        const parentLineItems = _optionalChain([cart, 'access', _17 => _17.lineItems, 'optionalAccess', _18 => _18.filter, 'call', _19 => _19((lineItem) => _optionalChain([parentItemIds, 'optionalAccess', _20 => _20.includes, 'call', _21 => _21(lineItem.lineItemId)]))]);
        uniqueSubscriptionSkusMap[sku].lineItems = parentLineItems;
      });
      return uniqueSubscriptionSkusMap;
    }
  }
  return void 0;
};
function findNewLineItem(cart, body) {
  return _optionalChain([cart, 'access', _22 => _22.lineItems, 'optionalAccess', _23 => _23.find, 'call', _24 => _24((item) => _optionalChain([item, 'access', _25 => _25.variant, 'optionalAccess', _26 => _26.sku]) === _optionalChain([body, 'access', _27 => _27.variant, 'optionalAccess', _28 => _28.sku]) && item.count === _optionalChain([body, 'access', _29 => _29.variant, 'optionalAccess', _30 => _30.count])), 'optionalAccess', _31 => _31.lineItemId]);
}
var handleSubscriptionsOnAddToCart = async (cart, body, cartApi, customTypeKey, parentLineItemCustomFieldKey, isSubscriptionCustomFieldKey) => {
  if (parentLineItemCustomFieldKey && isSubscriptionCustomFieldKey && customTypeKey) {
    const lineItemId = findNewLineItem(cart, body);
    if (lineItemId && _optionalChain([body, 'access', _32 => _32.subscriptions, 'optionalAccess', _33 => _33.length])) {
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
  return _optionalChain([body, 'access', _34 => _34.subscriptions, 'optionalAccess', _35 => _35.map, 'call', _36 => _36((field) => ({
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
  }))]);
}





exports.calculateNextDeliveryDate = calculateNextDeliveryDate; exports.getSubscriptionGroups = getSubscriptionGroups; exports.handleSubscriptionsOnAddToCart = handleSubscriptionsOnAddToCart;
