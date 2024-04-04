"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/utils/index.ts
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
    } else if (_optionalChain([actionNamespaces, 'access', _ => _[hook.actionNamespace], 'optionalAccess', _2 => _2[hook.action]])) {
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
    if (addOnRegistry.dynamicPageHandlers && originalResult && "dynamicPageType" in originalResult && _optionalChain([addOnRegistry, 'access', _3 => _3.dynamicPageHandlers, 'optionalAccess', _4 => _4[originalResult.dynamicPageType]])) {
      return addOnRegistry.dynamicPageHandlers[originalResult.dynamicPageType](request, context, originalResult, config);
    }
    return originalResult;
  };
}



exports.mergeExtensions = mergeExtensions;
