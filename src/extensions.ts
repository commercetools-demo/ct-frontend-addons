import { ExtensionRegistry } from '@frontastic/extension-types';

import MinimumQuantity from './minimum-quantity/extensions';
import Superuser from './superuser/extensions';
import B2BSubscription from './subscription/extensions';
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
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          Superuser,
          configuration.modules[Module.Superuser]!,
        );
        break;
      case Module.B2BSubscription:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          B2BSubscription,
          configuration.modules[Module.B2BSubscription]!,
        );
        break;
      default:
        break;
    }
  });

  return extensionRegirstry;
};
