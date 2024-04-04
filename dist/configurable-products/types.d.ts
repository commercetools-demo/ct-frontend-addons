import { G as GeneralConfiguration } from '../types-Cz8jhXRC.js';
import '@frontastic/extension-types';

interface Dependencies extends Record<string, any> {
    CartApi: any;
    ProductApi: any;
}
interface Configuration extends GeneralConfiguration {
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

export type { Configuration, Dependencies };
