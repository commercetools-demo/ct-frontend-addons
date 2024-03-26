import { ActionHandler } from '@frontastic/extension-types';
import { Configuration } from '../../types.js';
import '../../../types-B2_pD38A.js';

declare const addToCart: (originalCb: ActionHandler, config: Configuration) => ActionHandler;
declare const checkout: (originalCb: ActionHandler, config: Configuration) => ActionHandler;

export { addToCart, checkout };
