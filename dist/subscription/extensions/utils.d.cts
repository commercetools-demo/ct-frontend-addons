import { Dependencies, Configuration } from '../types.cjs';
import '../../types-B2_pD38A.cjs';
import '@frontastic/extension-types';

declare const extractDependency: (dependency: keyof Dependencies, configuration: Configuration) => any;

export { extractDependency };
