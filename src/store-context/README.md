# Dealer selector

Using this module, a B2C customer can select a store/dealer based on location and save that information in session/customer entity. By doing that, the session's cart will be specific to selected store and the `add-to-cart` action uses store's supplyChannel.

## Requirements

- [Product search](../product-search/README.md): has to be added to the modules
- Custom type on customer to store the StoreContext (look below for custom type sample)
- Channels with GeoLocations filled, assigned to Stores. 

## Usage

### Backend changes

#### Custom type

```json
{
   "key": "custom-type-on-customer",
    "name": {
        "en-US": "Custom customer"
    },
    "resourceTypeIds": [
        "customer"
    ],
    "fieldDefinitions": [
        {
            "name": "storeKey",
            "label": {
                "en-US": "storeKey"
            },
            "required": false,
            "type": {
                "name": "String"
            },
            "inputHint": "SingleLine"
        },
        {
            "name": "distributionChannelId",
            "label": {
                "en-US": "distributionChannelId"
            },
            "required": false,
            "type": {
                "name": "String"
            },
            "inputHint": "SingleLine"
        },
        {
            "name": "supplyChannelId",
            "label": {
                "en-US": "supplyChannelId"
            },
            "required": false,
            "type": {
                "name": "String"
            },
            "inputHint": "SingleLine"
        },
        {
            "name": "storeId",
            "label": {
                "en-US": "storeId"
            },
            "required": false,
            "type": {
                "name": "String"
            },
            "inputHint": "SingleLine"
        },
        {
            "name": "storeName",
            "label": {
                "en-US": "storeName"
            },
            "required": false,
            "type": {
                "name": "String"
            },
            "inputHint": "SingleLine"
        },
        {
            "name": "persisted",
            "label": {
                "en-US": "persisted"
            },
            "required": false,
            "type": {
                "name": "Boolean"
            },
            "inputHint": "SingleLine"
        }
    ]
}
```

#### Code changes

```ts
import { BaseApi } from ...
import { ProductApi } from ...
import { ProductMapper } from ...

export default injectExtensionsRegistry(
{
  // previous exported default
}, {
    modules: {
      // Product search module is required
      'product-search': {
         props: {
            useStoreProducts: false,
        },
        dependencies: {
            BaseApi: BaseApi,
            ProductApi: ProductApi,
            ProductMapper: ProductMapper,
        },
      },
      'store-context': {
         props: {
            customerCustomTypeKey: 'custom-type-key-on-customer', 
        },
        dependencies: {
          AccountApi: AccountApi,
          BaseApi: BaseApi,
          CartApi: CartApi,
          AccountMapper: AccountMapper,
          ProductMapper: ProductMapper,
        },
      },
    },
  },

```

### Studio changes

#### Project schema

Add a field to store google-map-api-key

```json
{
        "name": "Location service",
        "fields": [
            {
                "label": "Google maps API KEY",
                "field": "EXTENSION_GOOGLE_MAPS_API_KEY",
                "type": "encrypted",
                "translatable": false,
                "required": true
            }
        ]
    },
```

#### Google map API

use the following APIs to create an API Credentials in your gcp and store the key in `EXTENSION_GOOGLE_MAPS_API_KEY`

- Maps Elevation API
- Maps JavaScript API
- Geocoding API
- Places API

### Frontend changes

#### Dependencies

Install `yarn add @vis.gl/react-google-maps`

#### Code changes

1. We have to wrap `children` in Providers with `StoreContextProvider`.

      ```ts
      /// packages/<project>/frontend/providers/index.tsx
      import { StoreContextProvider } from 'ct-frontend-addons/dist/store-context';

      ...

      return (
        ...
          <SWRProvider value={{ fallback: { '/action/account/getAccount': accountResult } }}>
            <StoreContextProvider
              components={{
                Button: Button,
                Overlay: Overlay,
                Typography: Typography,
              }}
              sdk={sdk}
              translatedMessages={{
                currentlySelectedDealer: 'Currently selected dealer',
                selectDealer: 'Select dealer',
                enterYourLocation: 'Enter your location',
              }}
            >
              <AddToCartOverlayProvider>{children}</AddToCartOverlayProvider>
              <Toaster />
            </StoreContextProvider>
          </SWRProvider>
      ...
      )
    ```
1. Display the `DealerSelectButton` in the header
    ```ts
    /// packages/<project>/frontend/components/commercetools-ui/organisms/header/utility-section/index.tsx

    import { DealerSelectButton } from 'ct-frontend-addons/dist/store-context';
    ...

    return (
      ...
        <DealerSelectButton />
      ...
    )

    ```
