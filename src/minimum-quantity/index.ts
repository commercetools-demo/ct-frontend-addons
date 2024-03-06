import { MergableAction } from '../utils/types';
import { addToCart, updateLineItem } from './extensions/actionControllers/cartController';

const minimumQuantity: {
  actions: MergableAction[];
} = {
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
