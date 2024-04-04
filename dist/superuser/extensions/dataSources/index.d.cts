import { DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';

declare const _default: {
    'frontastic/csr': (config: DataSourceConfiguration, context: DataSourceContext) => Promise<{
        dataSourcePayload: {
            superUser: any;
        };
    }>;
};

export { _default as default };
