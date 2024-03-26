import { Request, ActionContext, Response, ActionHandler } from '@frontastic/extension-types';
import { a as Configuration } from '../../../types-B2_pD38A.js';

declare const changePrice: (config?: Configuration) => (request: Request, actionContext: ActionContext) => Promise<Response | undefined>;
declare const checkoutWithCSR: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const getOrders: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;

export { changePrice, checkoutWithCSR, getOrders };
