// src/configurable-products/frontend/hooks/useConfigurableProductAttribute.ts
var useConfigurableProductAttribute = ({ productAttributes }) => {
  const findAttributeLabel = (attributes) => {
    let attributeValue = "";
    Object.keys(attributes || {}).forEach((key) => {
      if (productAttributes.includes(key)) {
        attributeValue = attributes?.[key];
      }
    });
    return attributeValue;
  };
  return {
    findAttributeLabel
  };
};

export {
  useConfigurableProductAttribute
};
