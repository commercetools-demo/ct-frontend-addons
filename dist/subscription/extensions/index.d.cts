import { M as MergableAction } from '../../types-Dst8Thoo.cjs';
import { Configuration } from '../types.cjs';
import '@frontastic/extension-types';

declare const subscription: {
    actions: MergableAction<Configuration>[];
};

export { subscription as default };
