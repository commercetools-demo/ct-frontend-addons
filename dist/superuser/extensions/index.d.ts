import { M as MergableAction, a as Configuration, b as DataSources } from '../../types-Dst8Thoo.js';
import '@frontastic/extension-types';

declare const superuser: {
    actions: MergableAction<Configuration>[];
    dataSources: DataSources;
};

export { superuser as default };
