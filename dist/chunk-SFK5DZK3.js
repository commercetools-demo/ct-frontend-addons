import {
  useCSRLoginForm
} from "./chunk-JORVGZ3H.js";
import {
  useStandalonePrice
} from "./chunk-HP3TMTL3.js";
import {
  formatMoneyCurrency,
  formatNumberForCurrency
} from "./chunk-5CPHS4XM.js";
import {
  useConfigurableProductAttribute
} from "./chunk-O5Y3MEKM.js";
import {
  CurrencyHelpers
} from "./chunk-4QADEX2C.js";
import {
  configurable_components_default,
  useComponentsCart_default,
  useConfigurableComponentsContext
} from "./chunk-ZS52XQVL.js";
import {
  bundled_items_default,
  childComponentsAttributeName,
  useBundledItemsContext,
  useChildComponents_default
} from "./chunk-XPAE6255.js";
import {
  __export
} from "./chunk-53DOP6C6.js";

// src/superuser/frontend/index.tsx
var frontend_exports = {};
__export(frontend_exports, {
  COMPONENTS: () => COMPONENTS,
  HOOKS: () => HOOKS,
  PROVIDERS: () => PROVIDERS
});

// src/superuser/frontend/components/organisms/standalone-price-input.tsx
import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import debounce from "lodash.debounce";
var StandalonePriceInput = ({
  item,
  price,
  sdk,
  buttonText,
  wrapperClassName,
  priceClassName,
  buttonClassName,
  buttonWrapperClassName
}) => {
  const { changePrice } = useStandalonePrice({ sdk });
  const { locale } = useParams();
  const [priceValue, setPriceValue] = useState((price?.centAmount || 0) / 100);
  const [formattedPrice, setFormattedPrice] = useState(formatMoneyCurrency(price, locale));
  const [isLoading, setIsLoading] = useState(false);
  const currencyCode = useMemo(() => {
    return price?.currencyCode;
  }, [price]);
  const fractionDigits = useMemo(() => {
    return price?.fractionDigits;
  }, [price]);
  const isChanged = useMemo(() => {
    return priceValue !== (price?.centAmount || 0) / 100;
  }, [priceValue, price]);
  const handleChangePrice = useCallback(async () => {
    setIsLoading(true);
    if (item.lineItemId) {
      await changePrice(item.lineItemId, {
        centAmount: priceValue * 100,
        currencyCode: price?.currencyCode
      });
    }
    setIsLoading(false);
  }, [priceValue, item]);
  const debounceFormatAndSet = useCallback(
    debounce((value) => {
      const numericValue = parseFloat(value.replace(/[^0-9\.]/g, ""));
      if (isNaN(numericValue))
        return;
      setPriceValue(numericValue);
      const formatted = formatNumberForCurrency(numericValue * 100, locale, currencyCode, fractionDigits);
      setFormattedPrice(formatted);
    }, 1e3),
    [currencyCode, fractionDigits, locale]
  );
  const onChange = useCallback(
    (event) => {
      const value = event.target.value;
      setFormattedPrice(value);
      debounceFormatAndSet(value);
    },
    [debounceFormatAndSet]
  );
  return /* @__PURE__ */ React.createElement("div", { className: wrapperClassName }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: formattedPrice,
      className: priceClassName,
      type: "text",
      onChange,
      disabled: isLoading,
      onBlur: () => setFormattedPrice(formatNumberForCurrency(priceValue * 100, locale, currencyCode, fractionDigits))
    }
  ), /* @__PURE__ */ React.createElement("div", { className: buttonWrapperClassName }, /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: !isChanged || isLoading,
      onClick: handleChangePrice,
      type: "button",
      className: buttonClassName
    },
    buttonText
  )));
};
var standalone_price_input_default = StandalonePriceInput;

// src/superuser/frontend/providers/super-user.tsx
import React2, { createContext, useContext, useState as useState2 } from "react";
var initialState = {
  superUserData: void 0,
  setSuperUser: () => {
  }
};
var SuperUserContext = createContext(initialState);
var SuperUserProvider = ({
  children,
  initialSuperUserData
}) => {
  const [superUserData, setSuperUser] = useState2(initialSuperUserData);
  return /* @__PURE__ */ React2.createElement(
    SuperUserContext.Provider,
    {
      value: {
        setSuperUser,
        superUserData
      }
    },
    children
  );
};
var useSuperUserContext = () => useContext(SuperUserContext);

// src/superuser/frontend/index.tsx
var PROVIDERS = { SuperUserProvider, useSuperUserContext };
var COMPONENTS = { StandalonePriceInput: standalone_price_input_default };
var HOOKS = { useStandalonePrice, useCSRLoginForm };

// src/configurable-products/frontend/index.tsx
var frontend_exports2 = {};
__export(frontend_exports2, {
  COMPONENTS: () => COMPONENTS2,
  PROVIDERS: () => PROVIDERS2,
  hooks: () => hooks
});

// src/configurable-products/frontend/components/bundled-items/index.tsx
import React3, { useMemo as useMemo2 } from "react";
import { useParams as useParams2 } from "next/navigation";
var BundledItems = ({ item }) => {
  const { cart, productAttributes } = useBundledItemsContext();
  const { findAttributeLabel } = useConfigurableProductAttribute({ productAttributes });
  const { locale } = useParams2();
  const lineItem = useMemo2(() => cart?.lineItems?.find((li) => li.lineItemId === item.id), [cart, item]);
  if (!lineItem)
    return null;
  return /* @__PURE__ */ React3.createElement("div", null, !!lineItem.variant?.attributes?.[childComponentsAttributeName]?.length && lineItem.variant?.attributes?.[childComponentsAttributeName].map((bundle) => /* @__PURE__ */ React3.createElement("div", { className: "flex items-center", key: bundle.lineItemId }, /* @__PURE__ */ React3.createElement("p", { className: "text-12 font-semibold leading-loose text-gray-600" }, `${bundle.name}:`, /* @__PURE__ */ React3.createElement("span", { className: "ml-2 text-10 font-normal" }, `${findAttributeLabel(bundle.variant?.attributes)}`)), /* @__PURE__ */ React3.createElement("p", { className: "ml-2 text-10 font-normal leading-loose text-gray-600" }, !!bundle.price?.centAmount ? ` ${CurrencyHelpers.formatForCurrency(bundle.price, locale)}` : ""))));
};
var bundled_items_default2 = BundledItems;

// src/configurable-products/frontend/components/configurable-components/index.tsx
import React5, { useEffect as useEffect2, useState as useState4 } from "react";
import { useParams as useParams3 } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/outline";

// src/configurable-products/frontend/components/configurable-components/configurable-component.tsx
import React4, { useEffect, useState as useState3 } from "react";
var ConfigurableComponent = ({
  product,
  variant,
  onChangeVariantIdx,
  className,
  Select
}) => {
  const [selectedVariant, setSelectedVariant] = useState3();
  const { productAttributes } = useConfigurableComponentsContext();
  const { findAttributeLabel } = useConfigurableProductAttribute({ productAttributes });
  const getAttributeValueForSku = (sku) => {
    return findAttributeLabel(product?.variants.find((variant2) => variant2.sku === sku)?.attributes);
  };
  const handleChangeVariant = (sku) => {
    const variantInx = product?.variants.findIndex((variant2) => variant2.sku === sku);
    onChangeVariantIdx(variantInx);
    setSelectedVariant(product?.variants[variantInx]);
  };
  useEffect(() => {
    if (variant) {
      setSelectedVariant(variant);
    }
  }, [variant]);
  return /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement("p", { className: "p-4 text-14 font-semibold leading-loose" }, product.name), /* @__PURE__ */ React4.createElement(
    Select,
    {
      onChange: (sku) => handleChangeVariant(sku),
      className,
      defaultValue: selectedVariant?.sku,
      options: product?.variants.map((variant2) => ({
        value: variant2.sku,
        name: getAttributeValueForSku(variant2.sku)
      }))
    }
  ));
};
var configurable_component_default = ConfigurableComponent;

// src/configurable-products/frontend/components/configurable-components/index.tsx
var ConfigurableComponents = ({ product, className, children, Button, Select, translatedTexts }) => {
  const [selectedComponentIdx, setSelectedComponentIdx] = useState4(0);
  const [isDisabled, setIsDisabled] = useState4(true);
  const [components, setComponents] = useState4([]);
  const [updateCentAmount, setUpdateCentAmount] = useState4();
  const [currentCentAmount, setCurrentCentAmount] = useState4();
  const { configurableComponents, setSelectedVariants, productAttributes } = useConfigurableComponentsContext();
  const { findAttributeLabel } = useConfigurableProductAttribute({ productAttributes });
  const { locale } = useParams3();
  const handleChangeVariantIdx = (variantIdx, componentIdx) => {
    setComponents(
      (prevComponents) => prevComponents.map((component, i) => {
        if (i !== componentIdx) {
          return component;
        }
        return {
          ...component,
          tempVariant: component.variants?.[variantIdx]
        };
      })
    );
  };
  const handleAdvanceNextStep = (i) => {
    setSelectedComponentIdx(i + 1);
    setComponents(
      components.map((component, idx) => {
        if (i !== idx) {
          return component;
        }
        return {
          ...component,
          selectedVariant: { ...component.tempVariant }
        };
      })
    );
  };
  const jumpToStep = (i) => {
    setComponents(
      components.map((component, idx) => {
        if (selectedComponentIdx !== idx) {
          return component;
        }
        return {
          ...component,
          tempVariant: void 0
        };
      })
    );
    setSelectedComponentIdx(i);
  };
  useEffect2(() => {
    if (components.length) {
      const updated = components.reduce(
        (prev, item) => {
          return CurrencyHelpers.addCurrency(prev, item.tempVariant?.price);
        },
        { centAmount: 0, currencyCode: product.currency }
      );
      const current = components.reduce(
        (prev, item) => CurrencyHelpers.addCurrency(prev, item.selectedVariant?.price),
        { centAmount: 0, currencyCode: product.currency }
      );
      setIsDisabled(components.some((component) => !component.selectedVariant));
      setUpdateCentAmount(
        CurrencyHelpers.subtractCurrency(
          updated,
          currentCentAmount || { centAmount: 0, currencyCode: product.currency }
        )
      );
      setCurrentCentAmount(current);
      setSelectedVariants(components.map((component) => component.selectedVariant));
    }
  }, [components]);
  useEffect2(() => {
    if (configurableComponents?.length) {
      setComponents(configurableComponents);
    }
  }, [configurableComponents]);
  if (!configurableComponents?.length) {
    return children({ isDisabled: false });
  }
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement("style", null, `
        .tab-panels--selected {
          margin-top: -1px;
        }
        .tab-button--selected {
          margin-bottom: -1px;
        }
      `), /* @__PURE__ */ React5.createElement("div", { className }, components.map((component, i) => /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement(
    "input",
    {
      type: "radio",
      name: "tabset",
      className: "hidden",
      id: `tab${i}`,
      checked: i === selectedComponentIdx,
      onChange: () => selectedComponentIdx > i && jumpToStep(i)
    }
  ), /* @__PURE__ */ React5.createElement(
    "label",
    {
      className: `relative inline-block cursor-pointer whitespace-nowrap border-neutral-300 bg-white px-4 py-4 text-12 ${selectedComponentIdx === i && "z-10 border-t border-x font-bold"} ${components.length !== selectedComponentIdx && "tab-button--selected"}`,
      htmlFor: `tab${i}`
    },
    /* @__PURE__ */ React5.createElement("span", { className: "flex items-center gap-2" }, component.name, " ", selectedComponentIdx > i && /* @__PURE__ */ React5.createElement(CheckIcon, { className: "h-4 w-4 text-primary" }))
  ))), /* @__PURE__ */ React5.createElement("div", { className: `tab-panels relative ${components.length !== selectedComponentIdx && "tab-panels--selected"}` }, components.map((component, i) => /* @__PURE__ */ React5.createElement(
    "article",
    {
      className: `border border-neutral-300 ${i === selectedComponentIdx ? "block" : "hidden"}`,
      key: component.productId
    },
    /* @__PURE__ */ React5.createElement(
      configurable_component_default,
      {
        className: "p-4",
        product: component,
        onChangeVariantIdx: (idx) => handleChangeVariantIdx(idx, i),
        variant: component.tempVariant,
        Select
      }
    ),
    /* @__PURE__ */ React5.createElement("div", { className: "flex justify-center p-4" }, /* @__PURE__ */ React5.createElement(Button, { variant: "primary", size: "full", onClick: () => handleAdvanceNextStep(i), type: "button" }, `${translatedTexts?.next} ${updateCentAmount?.centAmount && updateCentAmount?.centAmount >= 0 ? "+" : ""}${CurrencyHelpers.formatForCurrency(updateCentAmount || 0, locale)}`))
  )), components.length === selectedComponentIdx && /* @__PURE__ */ React5.createElement("article", { className: "border-accent-400 max-h-[350px] border p-4" }, /* @__PURE__ */ React5.createElement("span", { className: "text-14 font-semibold" }, translatedTexts?.summary), /* @__PURE__ */ React5.createElement("ul", null, components.map((component) => /* @__PURE__ */ React5.createElement("li", { key: component.productId }, /* @__PURE__ */ React5.createElement("span", { className: "text-14 font-bold" }, component.name, ": "), /* @__PURE__ */ React5.createElement("span", { className: "text-12" }, findAttributeLabel(component?.selectedVariant?.attributes))))), /* @__PURE__ */ React5.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React5.createElement("span", { className: "text-14" }, translatedTexts?.total), /* @__PURE__ */ React5.createElement("p", { className: "text-16" }, `${CurrencyHelpers.formatForCurrency(
    product?.price * 100,
    locale,
    product?.currency
  )} + ${CurrencyHelpers.formatForCurrency(currentCentAmount || 0)}`)), /* @__PURE__ */ React5.createElement("button", { className: "text-accent-400 mt-8 underline", onClick: () => jumpToStep(0), type: "button" }, translatedTexts?.back)), components.length !== selectedComponentIdx && /* @__PURE__ */ React5.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React5.createElement("span", { className: "text-14" }, translatedTexts?.total), /* @__PURE__ */ React5.createElement("p", { className: "text-16" }, `${CurrencyHelpers.formatForCurrency(
    product?.price * 100,
    locale,
    product?.currency
  )} + ${CurrencyHelpers.formatForCurrency(currentCentAmount || 0, locale)}`)))), children({ isDisabled }));
};
var configurable_components_default2 = ConfigurableComponents;

// src/configurable-products/frontend/index.tsx
var COMPONENTS2 = {
  BundledItems: bundled_items_default2,
  ConfigurableComponents: configurable_components_default2
};
var PROVIDERS2 = {
  ConfigurableComponentsProvider: configurable_components_default,
  useConfigurableComponentsContext,
  BundledItemsProvider: bundled_items_default,
  useBundledItemsContext
};
var hooks = {
  useChildComponents: useChildComponents_default,
  useComponentsCart: useComponentsCart_default
};

export {
  frontend_exports,
  frontend_exports2
};
