import { Request, ActionContext, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types.js';
import '../../../types-Dst8Thoo.js';

declare const getAllSubscriptions: (config: Configuration) => (request: Request, actionContext: ActionContext) => Promise<Response>;

export { getAllSubscriptions };
