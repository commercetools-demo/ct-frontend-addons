import { DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { DataSources as DataSourcesType } from '../../../utils/types';

export default {
  'frontastic/csr': {
    create: true,
    hook:
      (config: Configuration) =>
      async (config: DataSourceConfiguration, context: DataSourceContext) => {
        return {
          dataSourcePayload: {
            superUser: context?.request?.sessionData?.superUser,
          },
        };
      },
  },
} as DataSourcesType<Configuration>;
