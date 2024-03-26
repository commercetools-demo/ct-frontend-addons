import { ExtensionRegistry } from '@frontastic/extension-types';
import { A as AddOnRegistry, G as GeneralConfiguration } from '../types-Dst8Thoo.cjs';

declare const mergeExtensions: <T>(extensionRegirstry: ExtensionRegistry, addOnRegistry: AddOnRegistry<T>, config: GeneralConfiguration) => ExtensionRegistry;

export { mergeExtensions };
