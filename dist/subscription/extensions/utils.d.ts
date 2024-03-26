import { Dependencies, Configuration } from '../types.js';
import '../../types-B2_pD38A.js';
import '@frontastic/extension-types';

declare const extractDependency: (dependency: keyof Dependencies, configuration: Configuration) => any;

export { extractDependency };
