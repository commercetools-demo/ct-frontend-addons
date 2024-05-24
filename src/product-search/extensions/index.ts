import { MergableAction } from '../../utils/types';
import { addToCart, updateLineItem } from './actionControllers/cartController';
import { Configuration } from '../types';

const minimumQuantity: {
  actions: MergableAction<Configuration>[];
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
