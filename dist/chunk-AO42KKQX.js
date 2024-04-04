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
      const newAction = hook.hook(config);
      actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], {
        [hook.action]: newAction
      });
    } else if (actionNamespaces[hook.actionNamespace]?.[hook.action]) {
      const newAction = hook.hook(
        actionNamespaces[hook.actionNamespace][hook.action],
        config
      );
      actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], {
        [hook.action]: newAction
      });
    }
  });
  return actionNamespaces;
}
function mergeDataSources(extensionRegirstry, addOnRegistry) {
  let dataSources = extensionRegirstry["data-sources"] || {};
  if (addOnRegistry.dataSources) {
    for (const ds in addOnRegistry.dataSources) {
      dataSources = Object.assign({}, dataSources, { [ds]: addOnRegistry.dataSources[ds] });
    }
  }
  return dataSources;
}
function mergeDynamicPageHandlers(extensionRegirstry, addOnRegistry, config) {
  const originalDynamicPageHandler = extensionRegirstry["dynamic-page-handler"];
  return async (request, context) => {
    const originalResult = await originalDynamicPageHandler(request, context);
    if (addOnRegistry.dynamicPageHandlers && originalResult && "dynamicPageType" in originalResult && addOnRegistry.dynamicPageHandlers?.[originalResult.dynamicPageType]) {
      return addOnRegistry.dynamicPageHandlers[originalResult.dynamicPageType](request, context, originalResult, config);
    }
    return originalResult;
  };
}

export {
  mergeExtensions
};
