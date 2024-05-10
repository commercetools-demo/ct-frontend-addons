import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
export declare const changePrice: (config?: Configuration) => (request: Request, actionContext: ActionContext) => Promise<Response | undefined>;
export declare const checkoutWithCSR: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
export declare const getOrders: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
//# sourceMappingURL=CartController.d.ts.map