import { M as MergableAction } from '../../types-Dst8Thoo.js';
import { Configuration } from '../types.js';
import '@frontastic/extension-types';

declare const subscription: {
    actions: MergableAction<Configuration>[];
};

export { subscription as default };
