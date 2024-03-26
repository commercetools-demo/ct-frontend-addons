import { Request, ActionContext, Response, ActionHandler } from '@frontastic/extension-types';
import { a as Configuration } from '../../../types-B2_pD38A.cjs';

declare const loginCSR: (config?: Configuration) => (request: Request, actionContext: ActionContext) => Promise<Response | undefined>;
declare const loginHookWithCSRCheck: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
declare const logoutWithCSRCheck: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;

export { loginCSR, loginHookWithCSRCheck, logoutWithCSRCheck };
