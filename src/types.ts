import { Configuration as MinimumQuantityConfiguration } from './minimum-quantity/types';
import { Configuration as SuperuserConfiguration } from './superuser/types';
import { Configuration as B2BSubscriptionConfiguration } from './subscription/types';

export enum Module {
    MinimumQuantity = 'minimum-quantity',
    Superuser = 'superuser',
    B2BSubscription = 'b2b-subscription',
}
export interface ModuleConfiguration {
    modules: {
        [Module.MinimumQuantity]?: MinimumQuantityConfiguration;
        [Module.Superuser]?: SuperuserConfiguration;
        [Module.B2BSubscription]?: B2BSubscriptionConfiguration;
    };
}