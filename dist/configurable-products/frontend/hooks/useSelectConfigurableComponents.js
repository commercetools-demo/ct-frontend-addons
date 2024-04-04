import "../../../chunk-53DOP6C6.js";

// src/configurable-products/frontend/hooks/useSelectConfigurableComponents.ts
import { useState } from "react";
var useSelectConfigurableComponents = (configurableComponents) => {
  const [selectedVariants, setSelectedVariants] = useState(Array(configurableComponents?.length).fill(null));
  const selectComponentVariant = (componentIndex, variantSku) => {
    const selectedVariant = !variantSku ? null : configurableComponents?.[componentIndex].variants.find((v) => v.sku === variantSku);
    setSelectedVariants(
      selectedVariants.map((variant, i) => {
        if (i === componentIndex) {
          return selectedVariant;
        }
        return variant;
      })
    );
  };
  return {
    selectedVariants,
    setSelectedVariants,
    selectComponentVariant
  };
};
export {
  useSelectConfigurableComponents
};
