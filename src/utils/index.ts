import { DynamicPageContext, ExtensionRegistry, Request } from '@frontastic/extension-types';
import { ActionCreator, ActionWrapper, AddOnRegistry, DatasourceCreator, DatasourceWrapper, DynamicPagehandler, GeneralConfiguration } from './types';

export const mergeExtensions = <T extends GeneralConfiguration>(
  extensionRegirstry: ExtensionRegistry,
  addOnRegistry: AddOnRegistry<T>,
  config: T,
): ExtensionRegistry => {
  const actionNamespaces = mergeActions<T>(extensionRegirstry, addOnRegistry, config);
  const dataSources = mergeDataSources<T>(extensionRegirstry, addOnRegistry, config);
  const dynamicPageHandlers = mergeDynamicPageHandlers<T>(extensionRegirstry, addOnRegistry, config);
  return {
    ...extensionRegirstry,
    actions: actionNamespaces,
    'data-sources': dataSources,
    'dynamic-page-handler': dynamicPageHandlers,
  };
};

function mergeActions<T>(
  extensionRegirstry: ExtensionRegistry,
  addOnRegistry: AddOnRegistry<T>,
  config: GeneralConfiguration,
) {
  const actionNamespaces = extensionRegirstry.actions || {};
  addOnRegistry.actions.forEach((hook) => {
    if (!actionNamespaces[hook.actionNamespace]) {
      actionNamespaces[hook.actionNamespace] = {};
    }
    if (hook.create) {
      const newAction = (hook.hook as ActionCreator<T>)(config as T);
      actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], {
        [hook.action]: newAction,
      });
    } else if (actionNamespaces[hook.actionNamespace]?.[hook.action]) {
      const newAction = (hook.hook as ActionWrapper<T>)(
        actionNamespaces[hook.actionNamespace][hook.action],
        config as T,
      );
      actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], {
        [hook.action]: newAction,
      });
    }
  });
  return actionNamespaces;
}

function mergeDataSources<T>(extensionRegirstry: ExtensionRegistry, addOnRegistry: AddOnRegistry<T>, config: T) {
  let dataSources = extensionRegirstry['data-sources'] || {};
  if (addOnRegistry.dataSources) {
    for (const ds in addOnRegistry.dataSources) {
      if (addOnRegistry.dataSources[ds].create) {
        const newDataSource = (addOnRegistry.dataSources[ds].hook as DatasourceCreator<T>)(config);
        dataSources = Object.assign({}, dataSources, {
          [ds]: newDataSource,
        });
      } else if (dataSources[ds]) {
        const newDataSource = (addOnRegistry.dataSources[ds].hook as DatasourceWrapper<T>)(dataSources[ds], config);
        dataSources = Object.assign({}, dataSources, {
          [ds]: newDataSource,
        });

      }
    }
  }
  return dataSources;
}

function mergeDynamicPageHandlers<T extends GeneralConfiguration>(
  extensionRegirstry: ExtensionRegistry,
  addOnRegistry: AddOnRegistry<T>,
  config: T,
): DynamicPagehandler {
  const originalDynamicPageHandler = extensionRegirstry['dynamic-page-handler'];
  return async (request: Request, context: DynamicPageContext) => {
    const originalResult = await originalDynamicPageHandler!(request, context);
    if (
      addOnRegistry.dynamicPageHandlers &&
      originalResult &&
      'dynamicPageType' in originalResult &&
      addOnRegistry.dynamicPageHandlers?.[originalResult.dynamicPageType]
    ) {
      return addOnRegistry.dynamicPageHandlers[originalResult.dynamicPageType](request, context, originalResult, config);
    }
    return originalResult;
  };
}
