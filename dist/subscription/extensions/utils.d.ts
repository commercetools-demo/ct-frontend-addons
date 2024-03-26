import { Dependencies, Configuration } from '../types.js';
import '../../types-Dst8Thoo.js';
import '@frontastic/extension-types';

declare const extractDependency: (dependency: keyof Dependencies, configuration: Configuration) => any;

export { extractDependency };
