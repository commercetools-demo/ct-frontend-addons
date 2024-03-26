import { ExtensionRegistry } from '@frontastic/extension-types';
import { ModuleConfiguration } from './types.js';
import './types-Dst8Thoo.js';
import './subscription/types.js';

declare const injectExtensionsRegistry: (extensionRegirstry: ExtensionRegistry, configuration?: ModuleConfiguration) => ExtensionRegistry;

export { injectExtensionsRegistry };
