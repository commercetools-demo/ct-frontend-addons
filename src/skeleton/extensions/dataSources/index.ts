import { DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { DataSources as DataSourcesType } from '../../../utils/types';

export default {
  'frontastic/a-new-datasource': {
    create: true,
    hook:
      (config: Configuration) =>
      async (config: DataSourceConfiguration, context: DataSourceContext) => {
        // your code here
        return {
          dataSourcePayload: {
            foo: 'bar',
          },
        };
      },
  },
} as DataSourcesType<Configuration>;
