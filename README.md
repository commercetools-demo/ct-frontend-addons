# ct-frontend-addons

NOTE:
This is NOT an official commercetools code and NOT production ready. Use it at your own risk

## Available modules
1. [Minimum quantity](src/minimum-quantity/README.md)
1. [Superuser](src/superuser/README.md)
1. [Configurable components](src/configurable-products/README.md)
1. [B2B superuser](src/superuser-b2b/README.md)
1. [Approval workflows](src/approval-workflows/README.md)
1. [Product search](src/product-search/README.md)
1. [Dealer/Store selector](src/store-context/README.md)

## Install
```
// cd backend directory
yarn add ct-frontend-addons
```

## Usage

```diff
// backend/index.ts
+import { injectExtensionsRegistry } from 'ct-frontend-addons/dist/extensions';

-export default {
-  'dynamic-page-handler': mergeDynamicPageHandlers(extensionsToMerge),
-  'data-sources': extensionsToMerge.map((extension) => extension['data-sources'] || {}).reduce(Object.assign, {}),
-  actions: mergeActions(extensionsToMerge),
-} as ExtensionRegistry;
+export default injectExtensionsRegistry(
+  {
+    'dynamic-page-handler': mergeDynamicPageHandlers(extensionsToMerge),
+    'data-sources': extensionsToMerge.map((extension) => extension['data-sources'] || {}).reduce(Object.assi
gn, {}),
+    actions: mergeActions(extensionsToMerge),
+  } as ExtensionRegistry,
+  {
+    modules: { ... }
+  },
+);
```
