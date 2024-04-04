import { M as MergableAction, b as MergableDynamicHandlers } from '../../types-Cz8jhXRC.cjs';
import { Configuration } from '../types.cjs';
import '@frontastic/extension-types';

declare const configurableProducts: {
    actions: MergableAction<Configuration>[];
    dynamicPageHandlers: Record<string, MergableDynamicHandlers<Configuration>>;
};

export { configurableProducts as default };
