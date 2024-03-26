// src/utils/index.ts
var mergeExtensions = (extensionRegirstry, addOnRegistry, config) => {
  const actionNamespaces = mergeActions(extensionRegirstry, addOnRegistry, config);
  const dataSources = mergeDataSources(extensionRegirstry, addOnRegistry);
  const dynamicPageHandlers = mergeDynamicPageHandlers(extensionRegirstry, addOnRegistry, config);
  return {
    ...extensionRegirstry,
    actions: actionNamespaces,
    "data-sources": dataSources,
    "dynamic-page-handler": dynamicPageHandlers
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
function mergeDynamicPageHandlers(extensionRegirstry, addOnRegistry, config) {
  const originalDynamicPageHandler = extensionRegirstry["dynamic-page-handler"];
  return async (request, context) => {
    const originalResult = await originalDynamicPageHandler?.(request, context);
    if (addOnRegistry.dynamicPageHandler && originalResult && "dynamicPageType" in originalResult && addOnRegistry.dynamicPageHandler?.[originalResult.dynamicPageType]) {
      return addOnRegistry.dynamicPageHandler[originalResult.dynamicPageType](request, context, originalResult, config);
    }
    return originalResult;
  };
}

export {
  mergeExtensions
};
