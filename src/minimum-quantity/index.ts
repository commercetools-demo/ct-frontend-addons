import { MergableAction } from '../utils/types';
import { addToCart, updateLineItem } from './extensions/actions';

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
