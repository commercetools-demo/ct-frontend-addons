import { ExtensionRegistry } from '@frontastic/extension-types';

import MinimumQuantity from './minimum-quantity';
import { mergeExtensions } from './utils';
import { Configuration as MinimumQuantityConfiguration } from './minimum-quantity/types';

interface Configuration {
  modules: {
    'minimum-quantity': MinimumQuantityConfiguration;
  };
}

export const injectExtensionsRegistry = (
  extensionRegirstry: ExtensionRegistry,
  configuration: Configuration,
): ExtensionRegistry => {
  Object.keys(configuration.modules).forEach((mod) => {
    switch (mod) {
      case 'minimum-quantity':
        extensionRegirstry = mergeExtensions(extensionRegirstry, MinimumQuantity, configuration.modules[mod]);
        break;
      default:
        break;
    }
  });

  return extensionRegirstry;
};
