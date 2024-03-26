// src/utils/index.ts
var mergeExtensions = (extensionRegirstry, addOnRegistry, config) => {
  const actionNamespaces = mergeActions(extensionRegirstry, addOnRegistry, config);
  const dataSources = mergeDataSources(extensionRegirstry, addOnRegistry);
  return {
    ...extensionRegirstry,
    actions: actionNamespaces,
    "data-sources": dataSources
  };
};
function mergeActions(extensionRegirstry, addOnRegistry, config) {
  const actionNamespaces = extensionRegirstry.actions || {};
  addOnRegistry.actions.forEach((hook) => {
    if (!actionNamespaces[hook.actionNamespace]) {
      actionNamespaces[hook.actionNamespace] = {};
    }
    if (hook.create) {
      actionNamespaces[hook.actionNamespace][hook.action] = hook.hook(config);
    } else if (actionNamespaces[hook.actionNamespace]?.[hook.action]) {
      actionNamespaces[hook.actionNamespace][hook.action] = hook.hook(
        actionNamespaces[hook.actionNamespace][hook.action],
        config
      );
    }
  });
  return actionNamespaces;
}
function mergeDataSources(extensionRegirstry, addOnRegistry) {
  const dataSources = extensionRegirstry["data-sources"] || {};
  if (addOnRegistry.dataSources) {
    for (const ds in addOnRegistry.dataSources) {
      dataSources[ds] = addOnRegistry.dataSources[ds];
    }
  }
  return dataSources;
}

export {
  mergeExtensions
};
