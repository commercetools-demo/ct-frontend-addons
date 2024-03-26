import { Configuration as MinimumQuantityConfiguration } from './minimum-quantity/types';
import { Configuration as SuperuserConfiguration } from './superuser/types';
import { Configuration as SuperuserB2BConfiguration } from './superuser-b2b/types';
import { Configuration as ConfigurableProductsConfiguration } from './configurable-products/types';
import { Configuration as ApprovalWorkflowsConfiguration } from './approval-workflows/types';
import { Configuration as ProductSearchConfiguration } from './product-search/types';
import { Configuration as StoreContextConfiguration } from './store-context/types';
import { Configuration as FeclRulesConfiguration } from './fecl-rules/extensions/types';
import { Configuration as B2BSubscriptionConfiguration } from './subscription/types';

export enum Module {
  MinimumQuantity = 'minimum-quantity',
  Superuser = 'superuser',
  SuperuserB2B = 'superuser-b2b',
  ConfigurableProducts = 'configurable-products',
  ApprovalWorkflows = 'approval-workflows',
  ProductSearch = 'product-search',
  StoreContext = 'store-context',
  FeclRules = 'fecl-rules',
  B2BSubscription = 'b2b-subscription',
}
export interface ModuleConfiguration {
  modules: {
    [Module.MinimumQuantity]?: MinimumQuantityConfiguration;
    [Module.Superuser]?: SuperuserConfiguration;
    [Module.SuperuserB2B]?: SuperuserB2BConfiguration;
    [Module.ConfigurableProducts]?: ConfigurableProductsConfiguration;
    [Module.ApprovalWorkflows]?: ApprovalWorkflowsConfiguration;
    [Module.ProductSearch]?: ProductSearchConfiguration;
    [Module.StoreContext]?: StoreContextConfiguration;
    [Module.FeclRules]?: FeclRulesConfiguration;
    [Module.B2BSubscription]?: B2BSubscriptionConfiguration;
  };
}
