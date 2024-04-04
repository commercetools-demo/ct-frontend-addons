import { Attributes } from "@commercetools/frontend-domain-types/product";

export const useConfigurableProductAttribute = ({ productAttributes }: { productAttributes: string[] }) => {
  const findAttributeLabel = (attributes?: Attributes): string => {
    let attributeValue = '';

    Object.keys(attributes || {}).forEach((key) => {
      if (productAttributes.includes(key)) {
        attributeValue = attributes?.[key];
      }
    });
    return attributeValue;
  };

  return {
    findAttributeLabel,
  };
};
