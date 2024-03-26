import { ExtensionRegistry } from '@frontastic/extension-types';
import { G as GeneralConfiguration, A as AddOnRegistry } from '../types-B2_pD38A.cjs';

declare const mergeExtensions: <T extends GeneralConfiguration>(extensionRegirstry: ExtensionRegistry, addOnRegistry: AddOnRegistry<T>, config: T) => ExtensionRegistry;

export { mergeExtensions };
