import { ExtensionRegistry } from '@frontastic/extension-types';
import { G as GeneralConfiguration, A as AddOnRegistry } from '../types-Cz8jhXRC.js';

declare const mergeExtensions: <T extends GeneralConfiguration>(extensionRegirstry: ExtensionRegistry, addOnRegistry: AddOnRegistry<T>, config: T) => ExtensionRegistry;

export { mergeExtensions };
