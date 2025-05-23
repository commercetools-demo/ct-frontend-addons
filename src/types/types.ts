import { Configuration as MinimumQuantityConfiguration } from '../minimum-quantity/types';
import { Configuration as SuperuserConfiguration } from '../superuser/types';
import { Configuration as SuperuserB2BConfiguration } from '../superuser-b2b/types';
import { Configuration as ConfigurableProductsConfiguration } from '../configurable-products/types';
import { Configuration as StoreContextConfiguration } from '../store-context/types';

export enum Module {
  MinimumQuantity = 'minimum-quantity',
  Superuser = 'superuser',
  SuperuserB2B = 'superuser-b2b',
  ConfigurableProducts = 'configurable-products',
  StoreContext = 'store-context',
}
export interface ModuleConfiguration {
  modules: {
    [Module.MinimumQuantity]?: MinimumQuantityConfiguration;
    [Module.Superuser]?: SuperuserConfiguration;
    [Module.SuperuserB2B]?: SuperuserB2BConfiguration;
    [Module.ConfigurableProducts]?: ConfigurableProductsConfiguration;
    [Module.StoreContext]?: StoreContextConfiguration;
  };
}
