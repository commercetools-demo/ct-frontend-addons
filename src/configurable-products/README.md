# Configurable products

A configurable product or a bundle consist of a main product that refers a couple of other products (components) in one attribute.

## Requirements

1. The main component with an attribute of type (set) reference to products
1. Custom type on lineItem with a field of type string. This custom type will be set on "component" lineitem and the field will contain the ID of the main product.

### Custom type sample

#### Lineitem

```json
{
  "key": "configurable-components-lineitem",
  "name": {
    "en-US": "configurable-components-lineitem"
  },
  "resourceTypeIds": ["line-item"],
  "fieldDefinitions": [
    {
      "name": "configurable-components-parent-id",
      "label": {
        "en-US": "configurable-components-parent-id"
      },
      "required": false,
      "type": {
        "name": "String"
      },
      "inputHint": "SingleLine"
    }
  ]
}
```

### Product type sample

#### Configurable product

```json
{
  "name": "Configurable laptop",
  "description": "Configurable laptop",
  "classifier": "Complex",
  "attributes": [
    {
      "name": "components",
      "label": {
        "en-US": "Components"
      },
      "isRequired": false,
      "type": {
        "name": "set",
        "elementType": {
          "name": "reference",
          "referenceTypeId": "product"
        }
      },
      "attributeConstraint": "None",
      "isSearchable": false,
      "inputHint": "SingleLine",
      "displayGroup": "Other"
    }
  ],
  "key": "configurable-latop"
}
```

## Usage

### Backend changes

```ts
import { CartApi } from './apis/CartApi';
import { ProductApi } from './apis/ProductApi';
...
export default injectExtensionsRegistry({`
        'dynamic-page-handler':...
        'data-sources':...
        ...
    }, {
        modules: {
            'configurable-products': {
                dependencies: {
                    CartApi,
                    ProductApi,
                },
                props: {
                lineItem: {
                    customTypeKey: 'configurable-components-lineitem',
                    parentIdCustomFieldKey: 'configurable-components-parent-id',
                },
                product: {
                    attributeName: 'components',
                    productDetailsPageRegex: /\/p\/([^\/]+)/,
                },
                },
            },
        }
    });
```

### Studio changes

None

### Frontend changes

#### locale changes

```json
    "configurable-components.next": "Next",
    "configurable-components.summary": "Configuration",
    "configurable-components.total": "Total",
    "configurable-components.back": "Back"
```

#### code changes

1. We have to wrap the ProductDetails tastic with `ConfigurableComponentsProvider` to read data from datasource and pass it to child components.

   The provider has two props:

   1. configurableComponents: The set of products is fetched by extension and available in `data.data.dataSource.configurableComponents`
   1. productAttributes: Array of attribute names. These are the attributes of "component" products that will be displayed.

   ```ts
   /// packages/<project>/frontend/src/lib/tastics/product-details/components/product-details-client-wrapper.tsx

   import { ConfigurableProducts } from 'ct-frontend-addons';
   ...
   return (
       <ConfigurableProducts.PROVIDERS.ConfigurableComponentsProvider
       configurableComponents={data.data.dataSource.configurableComponents}
       productAttributes={['generic-model']}
       >
       <ProductDetailsMapper product={data.data.dataSource.product} />;
       </ConfigurableProducts.PROVIDERS.ConfigurableComponentsProvider>
   );

   ```

1. In order to display components in PDP, we need to use `ConfigurableComponents` component in PDP. The file which you want to place the component in, is totally up to you but it should be a descendent of product-details-tastic.

   You need to pass a couple of props to this component and you can use the `isDisabled` variable in the child component(s).

   ````ts
       // packages/<project>/frontend/src/components/organisms/product-details/components/main-info.tsx
       import import { ConfigurableProducts } from 'ct-frontend-addons';

       ...
       return(
           ...
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
           ...
       );
       ```

   ````

1. Now when the user clicks on the `CartCTA` button, we should add the selected components to the cart. In order to do so, first we need to update `useCart` hook.

   ```ts
   // packages/<project>/frontend/src/lib/hooks/useCart/index.ts
   import { ConfigurableProducts } from 'ct-frontend-addons';

   ...

   const useCart = (businessUnitKey?: string, storeKey?: string) => {
       const { swrBundleMiddleware } = ConfigurableProducts.hooks.useChildComponents();
       ...
       const { data, mutate } = useSWR(
           !(businessUnitKey && storeKey) ? null : ['/action/cart/getCart', businessUnitKey, storeKey],
           getCart,
           {
               use: [swrBundleMiddleware],
           },
       );
       ...
       const { addComponents } = ConfigurableProducts.hooks.useComponentsCart(sdk, mutate, businessUnitKey, storeKey);
       ...

       return {
           ...
           addComponents,
       }
   }
   ```

   And we need to call `addComponents` in `usePDPCart`

   ```ts
   /// packages/<project>/frontend/src/lib/tastics/product-details/hooks/usePDPCart.ts

   const usePDPCart = (...) => {
       ...
       const { addItem, addComponents, shippingMethods } = useCart(selectedBusinessUnit?.key, selectedStore?.key);
       ...
           const addToCart = useCallback(
           async (count: number) => {
               await addItem([{ sku: product.sku ?? '', count }]);
               await addComponents([{ sku: product.sku ?? '', count }]);
           },
           [addItem, addComponents, product.sku],
       );
   }

   ```

1. In order to display the components of a lineitem in cart, we need to wrap the Cart with `BundledItemsProvider`. It's important that `BundledItemsProvider` should recieve a cart prop which isn't mapped to Frontend cart yet.

   Just like the `ConfigurableComponentsProvider`, this provider also needs the same value for `productAttributes` prop.

   ```ts
   /// packages/<project>/frontend/src/lib/tastics/cart/components/cart-client-wrapper/index.tsx
   import BundledItemsProvider from '@/lib/tastics/product-details/bundled-items/provider';
   ...

   <BundledItemsProvider cart={cart} productAttributes={['generic-model']}>
       <Cart
           {...cart}
           />
   </BundledItemsProvider>

   ```

   Then we can use `BundledItems` component in any descendant of `Cart` to show components details.

   ```ts
   // packages/<project>/frontend/src/components/organisms/cart/components/cart-item-header.tsx
   import { ConfigurableProducts } from 'ct-frontend-addons';

           {item.sku && (
           <p className="truncate text-12 leading-loose text-gray-600">{`${translate('common.model')}# ${item.sku}`}</p>
           )}
           <ConfigurableProducts.COMPONENTS.BundledItems item={item} />
   ```

   Or show the bundled price

   ```ts
   ///packages/<project>/frontend/src/components/organisms/cart/components/cart-item.tsx
   import { ConfigurableProducts } from 'ct-frontend-addons';

   const CartItem = ({ item, onUpdateQuantity, onRemove, onUndoRemove, onAddToNewWishlist }: CartItemProps) => {
       ...
       const { getBundledPrice } = ConfigurableProducts.hooks.useChildComponents();

       const bundledPrice = getBundledPrice(item);
   ```
