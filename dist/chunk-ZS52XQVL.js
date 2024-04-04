import {
  useChildComponents_default
} from "./chunk-XPAE6255.js";

// src/configurable-products/frontend/hooks/useComponentsCart.ts
import { useCallback } from "react";

// src/configurable-products/frontend/providers/configurable-components/index.tsx
import React, { createContext, useContext, useState } from "react";
var initialState = {
  configurableComponents: [],
  selectedVariants: [],
  productAttributes: [],
  setSelectedVariants: () => {
  }
};
var ConfigurableComponentsContext = createContext(initialState);
var ConfigurableComponentsProvider = ({
  children,
  configurableComponents,
  productAttributes
}) => {
  const [selectedVariants, setSelectedVariants] = useState(Array(configurableComponents?.length).fill(null));
  return /* @__PURE__ */ React.createElement(
    ConfigurableComponentsContext.Provider,
    {
      value: {
        configurableComponents,
        selectedVariants,
        setSelectedVariants,
        productAttributes
      }
    },
    children
  );
};
var configurable_components_default = ConfigurableComponentsProvider;
var useConfigurableComponentsContext = () => useContext(ConfigurableComponentsContext);

// src/configurable-products/frontend/hooks/useComponentsCart.ts
var useComponentsCart = (sdk, businessUnitKey, storeKey) => {
  const { selectedVariants } = useConfigurableComponentsContext();
  const { bundleComponentsIntoLineItems } = useChildComponents_default();
  const addComponents = useCallback(
    async (lineItems, mutate) => {
      if (selectedVariants.length === 0)
        return;
      const payload = {
        lineItems: lineItems.map(({ sku, count }) => ({ variant: { sku }, count })),
        businessUnitKey,
        configurableComponents: selectedVariants?.filter(Boolean)?.map((variant) => ({
          variant,
          count: 1
        }))
      };
      const result = await sdk.callAction({
        actionName: "cart/addComponentsToCart",
        payload,
        query: {
          businessUnitKey,
          storeKey
        }
      });
      if (!result.isError)
        mutate(bundleComponentsIntoLineItems(result.data), { revalidate: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedVariants, businessUnitKey, storeKey]
  );
  return {
    addComponents
  };
};
var useComponentsCart_default = useComponentsCart;

export {
  configurable_components_default,
  useConfigurableComponentsContext,
  useComponentsCart_default
};
