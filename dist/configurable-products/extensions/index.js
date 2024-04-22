import { addComponentsToCart, addToCart, getCart, removeLineItem, updateLineItem } from './actionControllers/CartController';
import { injectProductDetailPageHandler } from './dynamic-page-handlers';
var configurableProducts = {
    actions: [
        {
            action: 'addToCart',
            actionNamespace: 'cart',
            hook: addToCart,
        },
        {
            action: 'addComponentsToCart',
            actionNamespace: 'cart',
            hook: addComponentsToCart,
            create: true,
        },
        {
            action: 'getCart',
            actionNamespace: 'cart',
            hook: getCart,
        },
        {
            action: 'updateLineItem',
            actionNamespace: 'cart',
            hook: updateLineItem,
        },
        {
            action: 'removeLineItem',
            actionNamespace: 'cart',
            hook: removeLineItem,
        },
    ],
    dynamicPageHandlers: {
        'frontastic/product-page': {
            hook: injectProductDetailPageHandler,
            create: false,
        }
    }
};
export default configurableProducts;
