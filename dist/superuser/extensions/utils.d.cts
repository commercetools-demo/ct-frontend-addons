import { c as Dependencies } from '../../types-Dst8Thoo.cjs';
import '@frontastic/extension-types';

declare const extractDependency: (dependency: keyof Dependencies, dependencies?: Dependencies) => any;

export { extractDependency };
