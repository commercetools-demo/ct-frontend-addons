import { ExtensionRegistry } from '@frontastic/extension-types';
import { ActionCreator, ActionWrapper, AddOnRegistry, GeneralConfiguration } from './types';

export const mergeExtensions = <T>(
  extensionRegirstry: ExtensionRegistry,
  addOnRegistry: AddOnRegistry<T>,
  config: GeneralConfiguration,
): ExtensionRegistry => {
  const actionNamespaces = mergeActions<T>(extensionRegirstry, addOnRegistry, config);
  const dataSources = mergeDataSources<T>(extensionRegirstry, addOnRegistry);

  return {
    ...extensionRegirstry,
    actions: actionNamespaces,
    'data-sources': dataSources,
  };
};

function mergeActions<T>(
  extensionRegirstry: ExtensionRegistry,
  addOnRegistry: AddOnRegistry<T>,
  config: GeneralConfiguration,
) {
  const actionNamespaces = extensionRegirstry.actions || {};
  addOnRegistry.actions.forEach((hook) => {
    if (hook.create) {
      actionNamespaces[hook.actionNamespace][hook.action] = (hook.hook as ActionCreator<T>)(config as T);
    } else if (actionNamespaces[hook.actionNamespace]?.[hook.action]) {
      actionNamespaces[hook.actionNamespace][hook.action] = (hook.hook as ActionWrapper<T>)(
        actionNamespaces[hook.actionNamespace][hook.action],
        config as T,
      );
    }
  });
  return actionNamespaces;
}

function mergeDataSources<T>(extensionRegirstry: ExtensionRegistry, addOnRegistry: AddOnRegistry<T>) {
  const dataSources = extensionRegirstry['data-sources'] || {};
  if (addOnRegistry.dataSources) {
    for (const ds in addOnRegistry.dataSources) {
      dataSources[ds] = addOnRegistry.dataSources[ds];
    }
  }
  return dataSources;
}
