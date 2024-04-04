import { ActionHandler } from '@frontastic/extension-types';
import { Configuration } from '../../types.cjs';
import '../../../types-Cz8jhXRC.cjs';

declare const getCart: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const addToCart: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const addComponentsToCart: (config?: Configuration) => ActionHandler;
declare const removeLineItem: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const updateLineItem: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;

export { addComponentsToCart, addToCart, getCart, removeLineItem, updateLineItem };
