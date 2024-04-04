import { Request, Context } from '@frontastic/extension-types';
import { Dependencies, Configuration } from '../types.cjs';
import '../../types-Cz8jhXRC.cjs';

declare const extractDependency: (dependency: keyof Dependencies, config?: Configuration) => any;
declare const getCartApi: (request: Request, actionContext: Context, CartApi: any) => any;

export { extractDependency, getCartApi };
