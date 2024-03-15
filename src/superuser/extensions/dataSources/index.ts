import { DataSourceConfiguration, DataSourceContext } from "@frontastic/extension-types";

export default {
    'frontastic/csr': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      return {
        dataSourcePayload: {
          superUser: context?.request?.sessionData?.superUser,
        },
      };
    },
  }