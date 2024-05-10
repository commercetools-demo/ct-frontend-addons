import { Request } from '@frontastic/extension-types';
import { Account } from '../shared/types';
export declare const getPath: (request: Request) => string | null;
export declare const getLocale: (request: Request) => string;
export declare const getCurrency: (request: Request) => string;
export declare const getBusinessUnitKey: (request: Request) => string | null;
export declare const getStoreKey: (request: Request) => string | null;
export declare const getStoreId: (request: Request) => string | null;
export declare const getDistributionChannelId: (request: Request) => string | null;
export declare const getSupplyChannelId: (request: Request) => string | null;
export declare function fetchAccountFromSession(request: Request): Account | undefined;
export declare function fetchCartIdFromSession(request: Request): string | undefined;
export declare const getSuperuserFromSession: (request: Request) => string | null;
//# sourceMappingURL=request.d.ts.map