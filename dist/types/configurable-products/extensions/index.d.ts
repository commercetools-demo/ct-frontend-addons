import { DynamicPageHandlerAddOn, MergableAction } from '../../utils/types';
import { Configuration } from '../types';
declare const configurableProducts: {
    actions: MergableAction<Configuration>[];
    dynamicPageHandlers: Record<string, DynamicPageHandlerAddOn<Configuration>>;
};
export default configurableProducts;
//# sourceMappingURL=index.d.ts.map