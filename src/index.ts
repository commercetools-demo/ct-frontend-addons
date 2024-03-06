import { ExtensionRegistry } from '@frontastic/extension-types';

import MinimumQuantity from './minimum-quantity';
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
      default:
        break;
    }
  });

  return extensionRegirstry;
};
