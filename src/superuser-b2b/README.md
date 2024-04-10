# Superuser B2B

## Requirements

## Usage

### Backend changes

```ts
'superuser-b2b': {
        dependencies: {
          BusinessUnitApi,
          CartApi,
          CartMapper,
        },
        props: {
          superuserRoleKey: 'superuser',
          cart: {
            customTypeKey: 'superuser-custom-order',
            superuserEmailFieldKey: 'superuser-email',
          }
        },
      },
```

### Studio changes

### Frontend changes

1. locale changes
cart
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
  checkout
  ```json
  "complete.superuser": "Checkout as Superuser"
```

1. app
```diff
+import { SuperuserB2BFrontend } from 'ct-frontend-addons';

export default async function Page({ params, searchParams }: PageProps) {

-    const [page, businessUnits] = await Promise.all([fetchPageData(slug, searchParams), fetchBusinessUnits()]);

+     const [page, businessUnits, superuserStatus] = await Promise.all([
+        fetchPageData(slug, searchParams),
+        fetchBusinessUnits(),
+        SuperuserB2BFrontend.utils.fetchSuperuser(sdk, getServerOptions),
+    ]);
    ...

    <Providers
        translations={translations}
        locale={locale}
        initialData={{
            account: auth.isError ? {} : auth.data,
            businessUnits: businessUnits.isError ? [] : businessUnits.data,
+           superuserStatus: superuserStatus.isError ? {} as SuperuserStatus : superuserStatus.data,
        }}
        >

```