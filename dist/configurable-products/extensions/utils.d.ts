import { Request, Context } from '@frontastic/extension-types';
import { Dependencies, Configuration } from '../types.js';
import '../../types-Cz8jhXRC.js';

declare const extractDependency: (dependency: keyof Dependencies, config?: Configuration) => any;
declare const getCartApi: (request: Request, actionContext: Context, CartApi: any) => any;

export { extractDependency, getCartApi };
