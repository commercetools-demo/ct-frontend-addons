// src/configurable-products/frontend/providers/bundled-items/index.tsx
import React, { createContext, useContext } from "react";
var initialState = {
  cart: void 0,
  productAttributes: []
};
var BundledItemsContext = createContext(initialState);
var BundledItemsProvider = ({ cart, productAttributes, children }) => {
  return /* @__PURE__ */ React.createElement(
    BundledItemsContext.Provider,
    {
      value: {
        productAttributes,
        cart
      }
    },
    children
  );
};
var bundled_items_default = BundledItemsProvider;
var useBundledItemsContext = () => useContext(BundledItemsContext);

// src/configurable-products/frontend/hooks/useChildComponents.ts
var childComponentsAttributeName = "bundled_components";
var useChildComponents = () => {
  const { cart } = useBundledItemsContext();
  const getBundledPrice = (lineItem) => {
    const originalLineItem = cart?.lineItems?.find((li) => li.lineItemId === lineItem.id);
    if (!originalLineItem)
      return { price: 0, discountedPrice: 0 };
    const discountedPrice = originalLineItem.variant?.discountedPrice?.centAmount;
    if (!originalLineItem.variant?.attributes?.[childComponentsAttributeName]) {
      return { price: 0, discountedPrice: 0 };
    }
    const bundleCentAmount = (originalLineItem.variant?.attributes?.[childComponentsAttributeName]).reduce(
      (prev, curr) => prev + (curr.price?.centAmount || 0),
      0
    );
    return {
      price: bundleCentAmount,
      discountedPrice: discountedPrice ? discountedPrice + bundleCentAmount : void 0
    };
  };
  const bundleComponentsIntoLineItems = (cart2) => {
    const lineItems = cart2.lineItems;
    if (cart2 && lineItems?.length) {
      const bundles = lineItems?.filter((item) => !!item.parentId);
      const items = lineItems?.filter((item) => !item.parentId);
      return {
        ...cart2,
        lineItems: items?.map((item) => {
          if (!item.variant?.attributes) {
            item = { ...item, variant: { ...item.variant, sku: item.sku, attributes: {} } };
          }
          const itemBundles = bundles?.filter((bundle) => bundle.parentId === item.lineItemId);
          if (item.variant?.attributes) {
            item.variant.attributes[childComponentsAttributeName] = [];
          }
          itemBundles?.forEach((bundle) => {
            item.variant?.attributes?.[childComponentsAttributeName].push(bundle);
          });
          return { ...item };
        })
      };
    }
    return cart2;
  };
  return {
    bundleComponentsIntoLineItems,
    getBundledPrice
  };
};
var useChildComponents_default = useChildComponents;

export {
  bundled_items_default,
  useBundledItemsContext,
  childComponentsAttributeName,
  useChildComponents_default
};
