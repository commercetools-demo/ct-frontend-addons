import { C as Configuration, a as Configuration$1 } from './types-B2_pD38A.js';
import { Configuration as Configuration$2 } from './subscription/types.js';
import '@frontastic/extension-types';

declare enum Module {
    MinimumQuantity = "minimum-quantity",
    Superuser = "superuser",
    B2BSubscription = "b2b-subscription"
}
interface ModuleConfiguration {
    modules: {
        [Module.MinimumQuantity]?: Configuration;
        [Module.Superuser]?: Configuration$1;
        [Module.B2BSubscription]?: Configuration$2;
    };
}

export { Module, type ModuleConfiguration };
