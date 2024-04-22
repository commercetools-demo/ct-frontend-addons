import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types';
export declare const loginCSR: (config?: Configuration) => (request: Request, actionContext: ActionContext) => Promise<Response | undefined>;
export declare const loginHookWithCSRCheck: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
export declare const logoutWithCSRCheck: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
//# sourceMappingURL=AccountController.d.ts.map