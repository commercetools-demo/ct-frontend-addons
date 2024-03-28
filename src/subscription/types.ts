import { GeneralConfiguration } from '../utils/types';

export interface Dependencies extends Record<string, any> {
  ProductApi: any;
  CartApi: any;
  BaseApi: any;
  CartMapper: any;
  ProductMapper: any;
}

export interface Configuration extends GeneralConfiguration {
  dependencies: Dependencies;
  props: {
    product: {
      attributeNameOnParentProduct: string;
      attributeNameOnSubscriptionProduct: string; // of type key-value
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