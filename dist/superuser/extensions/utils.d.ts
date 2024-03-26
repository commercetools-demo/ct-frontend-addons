import { d as Dependencies } from '../../types-B2_pD38A.js';
import '@frontastic/extension-types';

declare const extractDependency: (dependency: keyof Dependencies, dependencies?: Dependencies) => any;

export { extractDependency };
