import { addToCart, updateLineItem } from './actionControllers/cartController';
var minimumQuantity = {
    actions: [
        {
            action: 'addToCart',
            actionNamespace: 'cart',
            hook: addToCart,
        },
        {
            action: 'updateLineItem',
            actionNamespace: 'cart',
            hook: updateLineItem,
        },
    ],
};
export default minimumQuantity;
