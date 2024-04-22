# Minimum quantity

This extension checks a lineitem's quantity againts an attribute on product and sets the lineitem to that amount if it's less.

## Requirements

1. B2C launchpad
1. An attribute of type number on product or variant level.

## Backend changes

```ts
import { CartApi } from './apis/CartApi';
...
export default injectExtensionsRegistry({
        'dynamic-page-handler':...
        'data-sources':...
        ...
    }, {
        modules: {
            'minimum-quantity': {
        dependencies: {
          CartApi,
        },
        props: {
          attributeName: 'Minimo',
        },
      },
        }
    });
```

## FE changes

none
