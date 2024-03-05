import { ExtensionRegistry } from '@frontastic/extension-types';
import { AddOnRegistry, GeneralConfiguration } from './types';

export const mergeExtensions = (
  extensionRegirstry: ExtensionRegistry,
  addOnRegistry: AddOnRegistry,
  config: GeneralConfiguration,
): ExtensionRegistry => {
  const actionNamespaces = mergeActions(extensionRegirstry, addOnRegistry, config);

  return {
    ...extensionRegirstry,
    actions: actionNamespaces,
  };
};


function mergeActions(extensionRegirstry: ExtensionRegistry, addOnRegistry: AddOnRegistry, config: GeneralConfiguration) {
  const actionNamespaces = extensionRegirstry.actions || {};
  addOnRegistry.actions.forEach((hook) => {
    if (actionNamespaces[hook.actionNamespace]?.[hook.action]) {
      actionNamespaces[hook.actionNamespace][hook.action] = hook.hook(
        actionNamespaces[hook.actionNamespace][hook.action],
        config,
      );
    }
  });
  return actionNamespaces;
}
