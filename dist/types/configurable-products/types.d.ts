import { GeneralConfiguration } from '../utils/types';
export interface Dependencies extends Record<string, any> {
    CartApi: any;
    ProductApi: any;
}
export interface Configuration extends GeneralConfiguration {
    dependencies: Dependencies;
    props: {
        lineItem: {
            customTypeKey: string;
            parentIdCustomFieldKey: string;
        };
        product: {
            attributeName: string;
            productDetailsPageRegex: RegExp;
        };
    };
}
//# sourceMappingURL=types.d.ts.map