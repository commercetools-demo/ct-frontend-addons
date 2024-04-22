# Product search
Using this extension you can use product-search API instead of product projection search

## Requirements
none

## Usage
```diff
-export default {
-  'dynamic-page-handler': mergeDynamicPageHandlers(extensionsToMerge),
tension['data-sources'] || {}).reduce(Object.assign, {}),
-  actions: mergeActions(extensionsToMerge),
-} as ExtensionRegistry;
+export default injectExtensionsRegistry(
+  {
nsionsToMerge),
,
+    actions: mergeActions(extensionsToMerge),
+  } as ExtensionRegistry,
+  {
+    modules: {
+      'minimum-quantity': {
+        dependencies: {
+          CartApi,
+        },
+        props: {
+          attributeName: 'Minimo',
+        },
+      },
+    },
+  },
+);
```