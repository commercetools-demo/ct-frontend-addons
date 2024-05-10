# Superuser

Adds impersonate capabilities to frontend. Superuser person can modify a customer's cart, profile area, apply promotion to thier cart or change lineItem price.

**Note**: If your frontend is using commercetools Checkout, do not use the superUser person to checkout the cart.

## Requirements

1. A customer group that all customers assigned act as superuser
1. A custom type with a custom field on Order entity. The custom field is of type string.

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
    }
  ]
}
```

## Usage

Integration with superuser module comes in two pieces.

### Backend changes

Apply the backend changes using the following code.

```ts
// backend/index.ts
...
import { injectExtensionsRegistry } from 'ct-frontend-addons/dist/extensions';
import { CartApi } from './commerce-commercetools/apis/CartApi';
...

export default injectExtensionsRegistry({
  'dynamic-page-handler': mergeDynamicPageHandlers(extensionsToMerge),
  'data-sources': extensionsToMerge.map((extension) => extension['data-sources'] || {}).reduce(Object.assign, {}),
  actions: mergeActions(extensionsToMerge),
} as ExtensionRegistry,{
    modules:{
        superuser: {
            dependencies: {
                CartApi: CartApi,
                AccountApi: AccountApi,
                CartFetcher: CartFetcher,
                AccountMapper: AccountMapper,
                CartMapper: CartMapper
            },
            props: {
                csrCustomerGroupId: "6206b6d7-7b0f-4729-bff9-8ddfe56d767a",
                csrCustomFieldKey: 'superUserEmail',
                csrCustomTypeKey: 'subsc-det'
            }
        }
    }
});
```

### Studio changes

None

### Frontend changes

1. Add SuperuserProvider to main providers

   ```tsx
   // packages/demo/frontend/providers/index.tsx
   import React from 'react'
   ...
   import { PROVIDERS } from 'ct-frontend-addons/dist/superuser';

   export const Providers = ({ translations, accountResult, page, children }: React.PropsWithChildren<ProvidersProps>) => {

     return (
       <Other providers...>
         <PROVIDERS.SuperUserProvider sdk={sdk}>
           {children}
         </PROVIDERS.SuperUserProvider>
       </>
     )


   }
   ```

1. Use superUser info in components: by utilizing `useSuperUserContext` in descendent components of `SuperUserProvider`, you can access superUser info

   ```tsx
   import React from 'react';
   ...
   import { PROVIDERS } from 'ct-frontend-addons/dist/superuser';

   const Cart: React.FC<Props> = ({ ... } }) => {
     const { superUserData } = PROVIDERS.useSuperUserContext();

     return (
       <div>
       ...
       {!!superUserData && (
         <span>You're viewing the page as superUser</span>
       )}
       </div>
     )
   }
   export Cart;
   ```

1. Change the login form: In order to validate a superuser login from regular customers you have to change the login form.

   1. Remove `login` method from `useAccount` hook and use it from csrHook
      ```diff
      // login-form.tsx
      -const { login, requestConfirmationEmail, requestPasswordReset } = useAccount();
      +const { requestConfirmationEmail, requestPasswordReset } = useAccount();
      ...
      +const { login, isCSRLogin } = HOOKS.useCSRLoginForm({
      +  sdk,
      +  setError,
      +  formatMessage: formatErrorMessage,
      +  data,
      +  onLogin,
      +});
      ```
   1. Add extra field to data

      ```diff
      -  const [data, setData] = useState({ email: '', password: '', rememberMe: false });
      +  const [data, setData] = useState({ email: '', password: '', rememberMe: false, impersonatedCustomerEmail: '' });

      ```

   1. Remove LoginUser method

      ```diff
      - const loginUser = async () => {
      -  ...
      - }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        ...
      - else loginUser();
      + else login()

      ```

   1. Add a new field to get impersonated customer's email
      ```html
       {!resendPasswordReset && isCSRLogin && (
        <Input
          id="customer-email"
          name="impersonatedCustomerEmail"
          type="email"
          autoComplete="email"
          required
          className="mb-16 md:mb-20"
          placeholder={formatMessage({ id: 'csr.emailAddress', defaultMessage: "Customer's Email Address" })}
          onChange={handleChange}
        />
      )}
      ```

1. Use in cart to change price (Optional): The module exposes a component `StandalonePriceInput`. You can use this component instead of price value in cart in order to allow the superUser to change LineItem prices.

   ```diff
   // cart-item.tsx
   + import { PROVIDERS, COMPONENTS } from 'ct-frontend-addons/dist/superuser';

   + const { superUserData } = PROVIDERS.useSuperUserContext();
   ...

   -<div className="...">
   -  {item.discountedPrice ? (
   -    <div className="...">
   -      <span className="...">
   -        {CurrencyHelpers.formatForCurrency(item.discountedPrice, locale)}
   -      </span>
   -      <span className="...">
   -        {CurrencyHelpers.formatForCurrency(item.price ?? 0, locale)}
   -      </span>
   -    </div>
   -  ) : (
   -    <span className="...">
   -      {CurrencyHelpers.formatForCurrency(item.price ?? 0, locale)}
   -    </span>
   -  )}
   -</div>
   {!!superUserData && superUserData.email && (
     <div className="...">
       {item.discountedPrice?.centAmount ? (
         <div className="...">
           <COMPONENTS.StandalonePriceInput
                 item={item}
                 price={item.discountedPrice}
                 sdk={sdk}
                 wrapperClassName="flex"
                 buttonWrapperClassName="w-50"
                 buttonClassName="text-14 font-medium leading-loose w-full h-full bg-primary-black text-white"
                 buttonText={formatCartMessage({ id: 'apply', defaultMessage: 'Apply' })}
               />
           <span className="...">
             {CurrencyHelpers.formatForCurrency(item.price ?? 0, locale)}
           </span>
         </div>
       ) : (
         <span className="...">
           <COMPONENTS.StandalonePriceInput
                 item={item}
                 price={item.price}
                 sdk={sdk}
                 wrapperClassName="flex"
                 buttonWrapperClassName="w-50"
                 buttonClassName="text-14 font-medium leading-loose w-full h-full bg-primary-black text-white"
                 buttonText={formatCartMessage({ id: 'apply', defaultMessage: 'Apply' })}
               />
         </span>
       )}
     </div>
   )}
   {!superUserData && (
     <div className="...">
       {item.discountedPrice?.centAmount ? (
         <div className="...">
           <span className="...">
             {CurrencyHelpers.formatForCurrency(item.discountedPrice, locale)}
           </span>
           <span className="...">
             {CurrencyHelpers.formatForCurrency(item.price ?? 0, locale)}
           </span>
         </div>
       ) : (
         <span className="...">
           {CurrencyHelpers.formatForCurrency(item.price ?? 0, locale)}
         </span>
       )}
     </div>
   )}
   ```
