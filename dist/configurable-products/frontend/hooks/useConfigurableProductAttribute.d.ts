import { Attributes } from '@commercetools/frontend-domain-types/product';

declare const useConfigurableProductAttribute: ({ productAttributes }: {
    productAttributes: string[];
}) => {
    findAttributeLabel: (attributes?: Attributes) => string;
};

export { useConfigurableProductAttribute };
