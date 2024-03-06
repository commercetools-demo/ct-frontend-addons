import { Configuration as MinimumQuantityConfiguration } from './minimum-quantity/types';

export enum Module {
    MinimumQuantity = 'minimum-quantity',
}
export interface ModuleConfiguration {
    modules: {
        [Module.MinimumQuantity]?: MinimumQuantityConfiguration;
    };
}