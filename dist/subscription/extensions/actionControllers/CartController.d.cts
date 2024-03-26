import { ActionHandler } from '@frontastic/extension-types';
import { Configuration } from '../../types.cjs';
import '../../../types-B2_pD38A.cjs';

declare const addToCart: (originalCb: ActionHandler, config: Configuration) => ActionHandler;
declare const checkout: (originalCb: ActionHandler, config: Configuration) => ActionHandler;

export { addToCart, checkout };
