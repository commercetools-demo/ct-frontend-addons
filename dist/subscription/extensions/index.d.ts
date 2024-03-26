import { M as MergableAction, b as MergableDynamicHandlers } from '../../types-B2_pD38A.js';
import { Configuration } from '../types.js';
import '@frontastic/extension-types';

declare const subscription: {
    actions: MergableAction<Configuration>[];
    dynamicPageHandler: Record<string, MergableDynamicHandlers<Configuration>>;
};

export { subscription as default };
