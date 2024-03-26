import { Request, ActionContext, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types.cjs';
import '../../../types-B2_pD38A.cjs';

declare const getAllSubscriptions: (config: Configuration) => (request: Request, actionContext: ActionContext) => Promise<Response>;

export { getAllSubscriptions };
