import { ExtensionRegistry } from '@frontastic/extension-types';
import { ModuleConfiguration } from './types.cjs';
import './types-Dst8Thoo.cjs';
import './subscription/types.cjs';

declare const injectExtensionsRegistry: (extensionRegirstry: ExtensionRegistry, configuration?: ModuleConfiguration) => ExtensionRegistry;

export { injectExtensionsRegistry };
