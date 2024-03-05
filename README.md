# ct-frontend-addons

## Available modules
1. [Minimum quantity](src/minimum-quantity/README.md)

## Install
```
// cd backend directory
yarn add ct-frontend-addons
```

## Usage

```diff
// backend/index.ts
+import { injectExtensionsRegistry } from 'ct-frontend-addons/dist';

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