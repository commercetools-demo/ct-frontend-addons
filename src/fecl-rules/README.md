# FECL rules

Using this module, you can configure page rules in dynamic pages. This module adds the follwoing crietrias to each dynamic page

1. Category page:

   - Category: enum
   - Is Top Level: boolean
   - Is VIP: boolean

1. Product detail page

   - All product attributes
   - product type: enum

Both dynamic pages have access to Customer's session data which includes:

- customer city: string (use the first address in customer profile)
- customer country: string (use the first address in customer profile)
- customer state: string (use the first address in customer profile)
- customer zipCode: string (use the first address in customer profile)
- customer group: enum
- customer group assignment: enum - only works if customer-group-assignment is enabled in MC (use `contains` operator)

## Requirements

none

## Usage

### Backend changes

#### Code changes

```ts
import { injectExtensionsRegistry } from 'ct-frontend-addons/dist/extensions';
import { AccountApi } from ...;
import { ProductApi } from ...;
import { AccountMapper } from ...;
import { ProductMapper } from ...;

export default injectExtensionsRegistry(
{
  // previous exported default
}, {
    modules: {
      'fecl-rules': {
        props: {
          vipCustomerGroupId: '<id>',
        },
        dependencies: {
          AccountApi: AccountApi,
          AccountMapper: AccountMapper,
          ProductApi: ProductApi,
          ProductMapper: ProductMapper,
        },
      },
    },
  },

```

### Studio changes

#### Dynamic page rules

Update dynamic pages using the json provided below

1. [category.json](./docs/category.json)
1. [product-detail.json](./docs/product-detail.json)
