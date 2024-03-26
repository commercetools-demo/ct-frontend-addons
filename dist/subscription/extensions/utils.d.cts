import { Dependencies, Configuration } from '../types.cjs';
import '../../types-Dst8Thoo.cjs';
import '@frontastic/extension-types';

declare const extractDependency: (dependency: keyof Dependencies, configuration: Configuration) => any;

export { extractDependency };
