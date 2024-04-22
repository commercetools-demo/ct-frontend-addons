import { ExtensionRegistry } from '@frontastic/extension-types';

import MinimumQuantity from './minimum-quantity/extensions';
import Superuser from './superuser/extensions';
import SuperuserB2B from './superuser-b2b/extensions';
import ConfigurableProducts from './configurable-products/extensions';
import ApprovalWorkflows from './approval-workflows/extensions';
import ProductSearch from './product-search/extensions';
import { mergeExtensions } from './utils';
import { ModuleConfiguration, Module } from './types';

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
      case Module.ApprovalWorkflows:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          ApprovalWorkflows,
          configuration.modules[Module.ApprovalWorkflows]!,
        );
      case Module.ProductSearch:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          ProductSearch,
          configuration.modules[Module.ProductSearch]!,
        );
        break;
      default:
        break;
    }
  });

  return extensionRegirstry;
};
