# Product search
Using this extension you can use product-search API instead of product projection search

## Requirements
none

## Usage

### Backend changes

```ts
import { BaseApi } from ...
import { ProductApi } from ...
import { ProductMapper } from ...

export default injectExtensionsRegistry(
{
  // previous exported default
}, {
    modules: {
      'approval-workflows': {
         props: {
            useStoreProducts: false, // should categories be limited to current session-store's products
        },
        dependencies: {
            BaseApi: BaseApi,
            ProductApi: ProductApi,
            ProductMapper: ProductMapper,
        },
      },
    },
  },

```

### Studio changes
none

### Frontend changes
none