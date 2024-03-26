import { ExtensionRegistry } from '@frontastic/extension-types';
import { ModuleConfiguration } from './types.js';
import './types-B2_pD38A.js';
import './subscription/types.js';

declare const injectExtensionsRegistry: (extensionRegirstry: ExtensionRegistry, configuration?: ModuleConfiguration) => ExtensionRegistry;

export { injectExtensionsRegistry };
