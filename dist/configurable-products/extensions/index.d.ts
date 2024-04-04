import { M as MergableAction, b as MergableDynamicHandlers } from '../../types-Cz8jhXRC.js';
import { Configuration } from '../types.js';
import '@frontastic/extension-types';

declare const configurableProducts: {
    actions: MergableAction<Configuration>[];
    dynamicPageHandlers: Record<string, MergableDynamicHandlers<Configuration>>;
};

export { configurableProducts as default };
