import { ActionHandler } from '@frontastic/extension-types';
import { Configuration } from '../../types.js';
import '../../../types-Cz8jhXRC.js';

declare const getCart: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const addToCart: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const addComponentsToCart: (config?: Configuration) => ActionHandler;
declare const removeLineItem: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const updateLineItem: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;

export { addComponentsToCart, addToCart, getCart, removeLineItem, updateLineItem };
