import ConfigurableComponentsProvider, { useConfigurableComponentsContext } from './providers/configurable-components';
import BundledItemsProvider, { useBundledItemsContext } from './providers/bundled-items';
import BundledItems from './components/bundled-items';
import ConfigurableComponents from './components/configurable-components/index';
import useChildComponents from './hooks/useChildComponents';
import useComponentsCart from './hooks/useComponentsCart';

export const COMPONENTS = {
  BundledItems,
  ConfigurableComponents,
};

export const PROVIDERS = {
  ConfigurableComponentsProvider,
  useConfigurableComponentsContext,
  BundledItemsProvider,
  useBundledItemsContext,
};

export const hooks = {
  useChildComponents,
  useComponentsCart,
};