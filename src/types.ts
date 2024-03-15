import { Configuration as MinimumQuantityConfiguration } from './minimum-quantity/types';
import { Configuration as SuperuserConfiguration } from './superuser/types';

export enum Module {
    MinimumQuantity = 'minimum-quantity',
    Superuser = 'superuser',
}
export interface ModuleConfiguration {
    modules: {
        [Module.MinimumQuantity]?: MinimumQuantityConfiguration;
        [Module.Superuser]?: SuperuserConfiguration;
    };
}