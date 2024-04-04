import { Configuration as MinimumQuantityConfiguration } from './minimum-quantity/types';
import { Configuration as SuperuserConfiguration } from './superuser/types';
import { Configuration as ConfigurableProductsConfiguration } from './configurable-products/types';

export enum Module {
    MinimumQuantity = 'minimum-quantity',
    Superuser = 'superuser',
    ConfigurableProducts = 'configurable-products',
}
export interface ModuleConfiguration {
    modules: {
        [Module.MinimumQuantity]?: MinimumQuantityConfiguration;
        [Module.Superuser]?: SuperuserConfiguration;
        [Module.ConfigurableProducts]?: ConfigurableProductsConfiguration;
    };
}