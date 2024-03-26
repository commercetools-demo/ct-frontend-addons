import { Request, ActionContext, Response } from '@frontastic/extension-types';
import { Configuration } from '../../types.cjs';
import '../../../types-Dst8Thoo.cjs';

declare const getAllSubscriptions: (config: Configuration) => (request: Request, actionContext: ActionContext) => Promise<Response>;

export { getAllSubscriptions };
