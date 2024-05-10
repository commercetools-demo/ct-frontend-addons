import { MergableAction, DataSources as DataSourcesType, DynamicPageHandlerAddOn } from '../../utils/types';
import { Configuration } from '../types';
declare const approvalWorkflowsExt: {
    actions: MergableAction<Configuration>[];
    dataSources: DataSourcesType<Configuration>;
    dynamicPageHandlers: Record<string, DynamicPageHandlerAddOn<Configuration>>;
};
export default approvalWorkflowsExt;
//# sourceMappingURL=index.d.ts.map