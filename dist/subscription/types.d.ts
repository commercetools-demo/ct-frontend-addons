import { G as GeneralConfiguration } from '../types-B2_pD38A.js';
import '@frontastic/extension-types';

interface Dependencies extends Record<string, any> {
    ProductApi: any;
    CartApi: any;
    BaseApi: any;
    CartMapper: any;
    ProductMapper: any;
}
interface Configuration extends GeneralConfiguration {
    dependencies: Dependencies;
    props: {
        product: {
            attributeNameOnParentProduct: string;
            attributeNameOnSubscriptionProduct: string;
            productDetailsPageRegex: RegExp;
        };
        lineItemCustomType: {
            customTypeKey: string;
            parentLineItemCustomFieldKey: string;
            isSubscriptionCustomFieldKey: string;
        };
        orderCustomType: {
            customTypeKey: string;
            isSubscriptionCustomFieldKey: string;
            lastRecurrenceFieldKey: string;
            nextRecurrenceFieldKey: string;
            isActiveFieldKey: string;
            subscriptionProductFieldKey: string;
            subscriptionSKUFieldKey: string;
            originalOrderFieldKey: string;
        };
    };
}

export type { Configuration, Dependencies };
