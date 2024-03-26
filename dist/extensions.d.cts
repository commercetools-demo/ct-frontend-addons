import { ExtensionRegistry } from '@frontastic/extension-types';
import { ModuleConfiguration } from './types.cjs';
import './types-B2_pD38A.cjs';
import './subscription/types.cjs';

declare const injectExtensionsRegistry: (extensionRegirstry: ExtensionRegistry, configuration?: ModuleConfiguration) => ExtensionRegistry;

export { injectExtensionsRegistry };
