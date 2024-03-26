import { ActionHandler } from '@frontastic/extension-types';
import { C as Configuration } from '../../../types-B2_pD38A.cjs';

declare const addToCart: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const updateLineItem: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;

export { addToCart, updateLineItem };
