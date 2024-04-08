import { Cart } from '@commercetools/frontend-domain-types/cart';
import { LineItem } from '../types';
import { useBundledItemsContext } from '../providers/bundled-items';

export const childComponentsAttributeName = 'bundled_components';

const useChildComponents = () => {
  const { cart } = useBundledItemsContext();
  const getBundledPrice = (lineItem: {
    id: string;
    price?: number;
    discountedPrice?: number;
  }): { discountedPrice?: number; price?: number } => {
    const originalLineItem = cart?.lineItems?.find((li) => li.lineItemId === lineItem.id);
    if (!originalLineItem) return { price: 0, discountedPrice: 0 };
    const discountedPrice = originalLineItem.variant?.discountedPrice?.centAmount;
    if (!originalLineItem.variant?.attributes?.[childComponentsAttributeName]) {
      return { price: 0, discountedPrice: 0 };
    }

    const bundleCentAmount = (originalLineItem.variant?.attributes?.[childComponentsAttributeName] as LineItem[]).reduce(
      (prev, curr) => prev + (curr.price?.centAmount || 0),
      0,
    );

    return {
      price: bundleCentAmount,
      discountedPrice: discountedPrice ? discountedPrice + bundleCentAmount : undefined,
    };
  };

  const bundleComponentsIntoLineItems = <T extends Cart>(cart: T): T => {
    const lineItems = cart.lineItems as LineItem[];
    if (cart && lineItems?.length) {
      const bundles = lineItems?.filter((item) => !!item.parentId);
      const items = lineItems?.filter((item) => !item.parentId);

      return {
        ...cart,
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
        }),
      };
    }
    return cart;
  };

  return {
    bundleComponentsIntoLineItems,
    getBundledPrice,
  };
};

export default useChildComponents;
