import { ExtensionRegistry } from '@frontastic/extension-types';

import MinimumQuantity from './minimum-quantity/extensions';
import Superuser from './superuser/extensions';
import SuperuserB2B from './superuser-b2b/extensions';
import ConfigurableProducts from './configurable-products/extensions';
import StoreContext from './store-context/extensions';
import { mergeExtensions } from './utils';
import { ModuleConfiguration, Module } from './types/types';

export const injectExtensionsRegistry = (
  extensionRegirstry: ExtensionRegistry,
  configuration?: ModuleConfiguration,
): ExtensionRegistry => {
  if (!configuration) {
    return extensionRegirstry;
  }
  Object.keys(configuration.modules || {}).forEach((mod) => {
    switch (mod) {
      case Module.MinimumQuantity:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          MinimumQuantity,
          configuration.modules[Module.MinimumQuantity]!,
        );
        break;
      case Module.Superuser:
        extensionRegirstry = mergeExtensions(extensionRegirstry, Superuser, configuration.modules[Module.Superuser]!);
        break;
      case Module.ConfigurableProducts:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          ConfigurableProducts,
          configuration.modules[Module.ConfigurableProducts]!,
        );
        break;
      case Module.SuperuserB2B:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          SuperuserB2B,
          configuration.modules[Module.SuperuserB2B]!,
        );
        break;
      case Module.StoreContext:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          StoreContext,
          configuration.modules[Module.StoreContext]!,
        );
        break;
      default:
        break;
    }
  });

  return extensionRegirstry;
};
