import { Cart } from '../../../types/b2c/cart';
import { LineItem } from '../types';
import { useBundledItemsContext } from '../providers/bundled-items';
import { Middleware, SWRHook } from 'swr';

export const childComponentsAttributeName = 'bundled_components';

const useChildComponents = () => {
  const { cart } = useBundledItemsContext();

  const swrBundleMiddleware: Middleware = (useSWRNext: SWRHook) => (key: any, fetcher: any, config?: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const swr = useSWRNext(key, fetcher, config);
    if (swr.error || !swr.data) return swr;

    return {
      ...swr,
      data: bundleComponentsIntoLineItems(swr.data as Cart),
    };
  };

  const getBundledPrice = (lineItem: {
    id: string;
    price?: number;
    discountedPrice?: number;
  }): { discountedPrice?: number; price?: number } => {
    const originalLineItem = cart?.lineItems?.find((li) => li.lineItemId === lineItem.id);
    if (!originalLineItem) return { price: 0, discountedPrice: 0 };
    const discountedPrice = originalLineItem.variant?.discountedPrice?.value?.centAmount;
    if (!originalLineItem.variant?.attributes?.[childComponentsAttributeName]) {
      return { price: 0, discountedPrice: 0 };
    }

    const bundleCentAmount = (
      originalLineItem.variant?.attributes?.[childComponentsAttributeName] as LineItem[]
    ).reduce((prev, curr) => prev + (curr.price?.centAmount || 0), 0);

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
    swrBundleMiddleware,
  };
};

export default useChildComponents;
