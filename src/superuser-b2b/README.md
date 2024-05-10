# Superuser B2B

Adds impersonate capabilities to frontend. A B2B superuser can login to a business unit and view others' carts and place orders/quotes on behalf of them

## Requirements

- A superuser Role that has View/Manage permissions on others' carts and quotes
- A custom type on cart to record the superuser's and original owner's email addresses

### Custom type sample

```json
{
  "key": "superuser-custom-order",
  "name": {
    "en-US": "superuser-custom-order"
  },
  "resourceTypeIds": ["order"],
  "fieldDefinitions": [
    {
      "name": "superuser-email",
      "label": {
        "en-US": "Superuser email"
      },
      "required": false,
      "type": {
        "name": "String"
      },
      "inputHint": "SingleLine"
    },
    {
      "name": "assigned-user-email",
      "label": {
        "en-US": "Assigned user email"
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

## Usage

### Backend changes

```ts
import { BusinessUnitApi } from ...
import { CartMapper } from ...
import { EmailApiFactory } from ...

'superuser-b2b': {
        dependencies: {
          BusinessUnitApi,
          CartApi,
          CartMapper,
          EmailApiFactory,
        },
        props: {
          superuserRoleKey: 'superuser',
          cart: {
            customTypeKey: 'superuser-custom-order',
            superuserEmailFieldKey: 'superuser-email',
            originalEmailFieldKey: 'assigned-user-email',
          },
        },
      },
```

### Studio changes

None

### Frontend changes

#### locale changes

1. cart

```json
"createdFromAQuote": "Created from a quotation",
"createdByAMerchant": "Created by a superuser",
"with": "with",
"total.price": "total price",
"email": "Email",
"createNewCart": "Create new cart",
"name": "Name",
"view.superuser": "You are logged in as a superuser",
"superuser.reassign.cart": "Reassign cart to a user",
"assigned": "Assigned",
"superuser.checkout": "Checkout as Superuser",
"superuser.request.quote": "Request quote as Superuser"
```

2. checkout

```json
"complete.superuser": "Checkout as Superuser"
```

3.dashboard

```json
  "order.superuser.email": "Superuser email"
```

#### Code changes

1. We have to wrap the app context with superuser information in order to access this info on child components

   ```ts
     /// packages/<project>/frontend/src/providers/index.tsx
     import { PROVIDERS } from 'ct-frontend-addons/dist/superuser-b2b';

     export default async function Page({ params, searchParams }: PageProps) {

     return (
       ...
       <PROVIDERS.SuperuserProvider sdk={sdk}>
           <ShipAndLanguageProvider>
           ...
           </ShipAndLanguageProvider>
       </PROVIDERS.SuperuserProvider>
     )

   ```

1. We have to expose 3 methods out of `useCart` hook

   ```ts
     /// packages/<project>/frontend/src/lib/hooks/useCart/index.ts
     import { hooks } from 'ct-frontend-addons/dist/superuser-b2b';
     const useCart = (businessUnitKey?: string, storeKey?: string) => {
         const { setCart, createSuperuserCart, reassignCart } = hooks.useSuperuserCarts(sdk, mutate);
         ...

         return {
           ...
           setCart,
           createSuperuserCart,
           reassignCart,
         }

     }

   ```

1. We can access the superuser status in any component now, e.g. I want to show that superuser is browsing PLP

   ```ts
   /// packages/<project>/frontend/src/components/organisms/product-list/index.tsx
   import { PROVIDERS } from 'ct-frontend-addons/dist/superuser-b2b';

   const ProductList = (props: ProductListProps) => {
     const { superuserStatus } = PROVIDERS.useSuperuserContext();

     return (
       {superuserStatus?.isSuperuser && (
       <div className="mt-5 px-4 md:px-6 lg:px-12">
         <InfoBanner>
           <b>{translate('cart.view.superuser')}</b>
         </InfoBanner>
       </div>
     )}
     ...
     )
   }
   ```

1. Superuser has the ability to browse all carts in the business unit. In order to show all carts we can use CartBrowser component.

   ```ts
     /// packages/<project>/frontend/src/components/organisms/header/cart-link/index.tsx
     import { COMPONENTS } from 'ct-frontend-addons/dist/superuser-b2b';

     const CartLink = () => {

       const { activeBusinessUnit } = useBusinessUnit();
       const { selectedStore } = useStoreAndBusinessUnits();
       const { cart, setCart, createSuperuserCart } = useCart(activeBusinessUnit?.key, selectedStore?.key);

       return (
         <Link ...>

         ...
         <COMPONENTS.CartBrowser
           cartId={cart?.cartId ?? ''}
           createSuperuserCart={createSuperuserCart}
           setCart={setCart}
           translate={translate}
           associates={activeBusinessUnit.associates}
         />
         </Link>

       )
     }
   ```

1. Superuser can re/assign a cart to another assocaite in the current business unit using the CartReassignButton compoent.

   ```ts
     /// packages/<project>/frontend/src/cmponents/organisms/order-summary/components/checkout-cta.tsx
     import { PROVIDERS, COMPONENTS } from 'ct-frontend-addons/dist/superuser-b2b';

     const CheckoutCTA = () => {
         const { activeBusinessUnit } = useBusinessUnit();

         const { selectedStore } = useStoreAndBusinessUnits();
         const { superuserStatus } = PROVIDERS.useSuperuserContext();
         const { account } = useAccount();
         const { cart, reassignCart } = useCart(activeBusinessUnit?.key, selectedStore?.key);

       return (
         ...
         <COMPONENTS.CartReassignButton
           activeBusinessUnit={activeBusinessUnit}
           reassignCart={reassignCart}
           translate={translate}
           accountId={account?.accountId}
           cartAccountId={cart?.accountId}
           Dropdown={Dropdown}
         />

       )
     }
   ```

1. In order to display the superuser's email in an order, you can render `order.superuserEmail` property.

   You have to pass it along the components first

   ```ts
   /// packages/<project>/frontend/src/utils/mappers/map-order.ts

   export const mapOrder = () => {

     return {
       ...
       ...(order.superuserEmail && { superuserEmail: order.superuserEmail }),

     }
   }

   ```

   Then display it

   ```ts
     // packages/<project>/frontend/src/components/pages/dashboard/pages/order-details/index.tsx

     return (

       ...
       {order.superuserEmail && (
         <h3 className="mt-4 text-14 text-gray-600">
           {translate('dashboard.order.superuser.email')}: {order.superuserEmail}
         </h3>
       )}
       ...
     )
   ```
