# Minimum quantity
This extension checks a lineitem's quantity againts an attribute on product and sets the lineitem to that amount if it's less.  

## Requirements
Attribute of type number on product or variant level.

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