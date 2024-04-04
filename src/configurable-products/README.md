# Configurable products

## Requirements

## Usage

### Backend changes

### Studio changes

### Frontend changes

1. locale changes

```json
    "configurable-components.next": "Next",
    "configurable-components.summary": "Configuration",
    "configurable-components.total": "Total",
    "configurable-components.back": "Back"
```

1. code changes
   Add BundledItems

```ts
// packages/demo/frontend/src/components/organisms/cart/components/cart-item-header.tsx
        {item.sku && (
          <p className="truncate text-12 leading-loose text-gray-600">{`${translate('common.model')}# ${item.sku}`}</p>
        )}
        <BundledItems item={item} />
```

Add ConfigurableComponents

```ts
// packages/demo/frontend/src/components/organisms/product-details/components/main-info.tsx
    <ConfigurableComponents
        product={product}
        Button={Button}
        translatedTexts={{
            summary: translate('product.configurable-components.summary'),
            next: translate('product.configurable-components.next'),
            total: translate('product.configurable-components.total'),
            back: translate('product.configurable-components.back'),
        }}
    >
        {({ isDisabled }) => (
        <CartCTA
            addToCart={handleOnAddToCart}
            countChange={handleQuantityChange}
            addToCartDisabled={addToCartDisabled || isDisabled}
        />
        )}
    </ConfigurableComponents>

```

CartClientWrapper

```ts
/// packages/demo/frontend/src/lib/tastics/cart/components/cart-client-wrapper/index.tsx
import BundledItemsProvider from '@/lib/tastics/product-details/bundled-items/provider';
...

 <BundledItemsProvider cart={cart} productAttributes={['generic-model']}>
      <Cart
        {...cart}
        />
</BundledItemsProvider>

```

UseCart hook

```ts
// packages/demo/frontend/src/lib/hooks/useCart/index.ts
import {
  childComponentsAttributeName,
  useChildComponents,
} from '@/lib/tastics/product-details/configurable-components/hooks/useChildComponents';
...

const useCart = (businessUnitKey?: string, storeKey?: string) => {
    const { bundleComponentsIntoLineItems } = useChildComponents();
    ...
    const getCart = useCallback(async () => {
        ...

        return result.isError ? ({} as Cart) : bundleComponentsIntoLineItems(result.data);
    }, [businessUnitKey, storeKey, childComponentsAttributeName]);
    const addItem = useCallback(
        ...
        if (!result.isError) mutate(bundleComponentsIntoLineItems(result.data), { revalidate: false });

        return result.isError ? { success: false, message: result.error.message } : { ...result.data, success: true };
    },
    const updateItem = useCallback(
        ...
        if (!result.isError) mutate(bundleComponentsIntoLineItems(result.data), { revalidate: false });

        return result.isError ? { success: false, message: result.error.message } : { ...result.data, success: true };
    },
    const removeItem = useCallback(
        ...
        if (!result.isError) mutate(bundleComponentsIntoLineItems(result.data), { revalidate: false });

        return result.isError ? { success: false, message: result.error.message } : { ...result.data, success: true };
    },

    ...
    return {
        ...
        mutate
    }
}
```
