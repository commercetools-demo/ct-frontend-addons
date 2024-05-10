import { ActionHandler } from '@frontastic/extension-types';
import { Configuration } from '../../types';
export declare const getAllSuperuserCartsInStore: (config?: Configuration) => ActionHandler;
export declare const setCart: (config?: Configuration) => ActionHandler;
export declare const createSuperuserCart: (config?: Configuration) => ActionHandler;
export declare const checkout: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
export declare const reassignCart: (originalCb: ActionHandler, config?: Configuration) => ActionHandler;
//# sourceMappingURL=CartController.d.ts.map