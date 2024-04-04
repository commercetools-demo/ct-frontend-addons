import { C as Configuration, a as Configuration$1 } from './types-Cz8jhXRC.js';
import { Configuration as Configuration$2 } from './configurable-products/types.js';
import '@frontastic/extension-types';

declare enum Module {
    MinimumQuantity = "minimum-quantity",
    Superuser = "superuser",
    ConfigurableProducts = "configurable-products"
}
interface ModuleConfiguration {
    modules: {
        [Module.MinimumQuantity]?: Configuration;
        [Module.Superuser]?: Configuration$1;
        [Module.ConfigurableProducts]?: Configuration$2;
    };
}

export { Module, type ModuleConfiguration };
