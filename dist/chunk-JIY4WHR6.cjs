"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkW3SHGGRZcjs = require('./chunk-W3SHGGRZ.cjs');


var _chunkV6YGGCANcjs = require('./chunk-V6YGGCAN.cjs');



var _chunkKSMNEOIDcjs = require('./chunk-KSMNEOID.cjs');


var _chunkSFRQJTPJcjs = require('./chunk-SFRQJTPJ.cjs');


var _chunkPXCQLKQOcjs = require('./chunk-PXCQLKQO.cjs');




var _chunkN5HRV44Wcjs = require('./chunk-N5HRV44W.cjs');





var _chunkOYB2MVJScjs = require('./chunk-OYB2MVJS.cjs');


var _chunkD7CLCBWVcjs = require('./chunk-D7CLCBWV.cjs');

// src/superuser/frontend/index.tsx
var frontend_exports = {};
_chunkD7CLCBWVcjs.__export.call(void 0, frontend_exports, {
  COMPONENTS: () => COMPONENTS,
  HOOKS: () => HOOKS,
  PROVIDERS: () => PROVIDERS
});

// src/superuser/frontend/components/organisms/standalone-price-input.tsx
var _react = require('react'); var _react2 = _interopRequireDefault(_react);
var _navigation = require('next/navigation');
var _lodashdebounce = require('lodash.debounce'); var _lodashdebounce2 = _interopRequireDefault(_lodashdebounce);
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
  const { changePrice } = _chunkV6YGGCANcjs.useStandalonePrice.call(void 0, { sdk });
  const { locale } = _navigation.useParams.call(void 0, );
  const [priceValue, setPriceValue] = _react.useState.call(void 0, (_optionalChain([price, 'optionalAccess', _ => _.centAmount]) || 0) / 100);
  const [formattedPrice, setFormattedPrice] = _react.useState.call(void 0, _chunkKSMNEOIDcjs.formatMoneyCurrency.call(void 0, price, locale));
  const [isLoading, setIsLoading] = _react.useState.call(void 0, false);
  const currencyCode = _react.useMemo.call(void 0, () => {
    return _optionalChain([price, 'optionalAccess', _2 => _2.currencyCode]);
  }, [price]);
  const fractionDigits = _react.useMemo.call(void 0, () => {
    return _optionalChain([price, 'optionalAccess', _3 => _3.fractionDigits]);
  }, [price]);
  const isChanged = _react.useMemo.call(void 0, () => {
    return priceValue !== (_optionalChain([price, 'optionalAccess', _4 => _4.centAmount]) || 0) / 100;
  }, [priceValue, price]);
  const handleChangePrice = _react.useCallback.call(void 0, async () => {
    setIsLoading(true);
    if (item.lineItemId) {
      await changePrice(item.lineItemId, {
        centAmount: priceValue * 100,
        currencyCode: _optionalChain([price, 'optionalAccess', _5 => _5.currencyCode])
      });
    }
    setIsLoading(false);
  }, [priceValue, item]);
  const debounceFormatAndSet = _react.useCallback.call(void 0, 
    _lodashdebounce2.default.call(void 0, (value) => {
      const numericValue = parseFloat(value.replace(/[^0-9\.]/g, ""));
      if (isNaN(numericValue))
        return;
      setPriceValue(numericValue);
      const formatted = _chunkKSMNEOIDcjs.formatNumberForCurrency.call(void 0, numericValue * 100, locale, currencyCode, fractionDigits);
      setFormattedPrice(formatted);
    }, 1e3),
    [currencyCode, fractionDigits, locale]
  );
  const onChange = _react.useCallback.call(void 0, 
    (event) => {
      const value = event.target.value;
      setFormattedPrice(value);
      debounceFormatAndSet(value);
    },
    [debounceFormatAndSet]
  );
  return /* @__PURE__ */ _react2.default.createElement("div", { className: wrapperClassName }, /* @__PURE__ */ _react2.default.createElement(
    "input",
    {
      value: formattedPrice,
      className: priceClassName,
      type: "text",
      onChange,
      disabled: isLoading,
      onBlur: () => setFormattedPrice(_chunkKSMNEOIDcjs.formatNumberForCurrency.call(void 0, priceValue * 100, locale, currencyCode, fractionDigits))
    }
  ), /* @__PURE__ */ _react2.default.createElement("div", { className: buttonWrapperClassName }, /* @__PURE__ */ _react2.default.createElement(
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

var initialState = {
  superUserData: void 0,
  setSuperUser: () => {
  }
};
var SuperUserContext = _react.createContext.call(void 0, initialState);
var SuperUserProvider = ({
  children,
  initialSuperUserData
}) => {
  const [superUserData, setSuperUser] = _react.useState.call(void 0, initialSuperUserData);
  return /* @__PURE__ */ _react2.default.createElement(
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
var useSuperUserContext = () => _react.useContext.call(void 0, SuperUserContext);

// src/superuser/frontend/index.tsx
var PROVIDERS = { SuperUserProvider, useSuperUserContext };
var COMPONENTS = { StandalonePriceInput: standalone_price_input_default };
var HOOKS = { useStandalonePrice: _chunkV6YGGCANcjs.useStandalonePrice, useCSRLoginForm: _chunkW3SHGGRZcjs.useCSRLoginForm };

// src/configurable-products/frontend/index.tsx
var frontend_exports2 = {};
_chunkD7CLCBWVcjs.__export.call(void 0, frontend_exports2, {
  COMPONENTS: () => COMPONENTS2,
  PROVIDERS: () => PROVIDERS2,
  hooks: () => hooks
});

// src/configurable-products/frontend/components/bundled-items/index.tsx


var BundledItems = ({ item }) => {
  const { cart, productAttributes } = _chunkOYB2MVJScjs.useBundledItemsContext.call(void 0, );
  const { findAttributeLabel } = _chunkSFRQJTPJcjs.useConfigurableProductAttribute.call(void 0, { productAttributes });
  const { locale } = _navigation.useParams.call(void 0, );
  const lineItem = _react.useMemo.call(void 0, () => _optionalChain([cart, 'optionalAccess', _6 => _6.lineItems, 'optionalAccess', _7 => _7.find, 'call', _8 => _8((li) => li.lineItemId === item.id)]), [cart, item]);
  if (!lineItem)
    return null;
  return /* @__PURE__ */ _react2.default.createElement("div", null, !!_optionalChain([lineItem, 'access', _9 => _9.variant, 'optionalAccess', _10 => _10.attributes, 'optionalAccess', _11 => _11[_chunkOYB2MVJScjs.childComponentsAttributeName], 'optionalAccess', _12 => _12.length]) && _optionalChain([lineItem, 'access', _13 => _13.variant, 'optionalAccess', _14 => _14.attributes, 'optionalAccess', _15 => _15[_chunkOYB2MVJScjs.childComponentsAttributeName], 'access', _16 => _16.map, 'call', _17 => _17((bundle) => /* @__PURE__ */ _react2.default.createElement("div", { className: "flex items-center", key: bundle.lineItemId }, /* @__PURE__ */ _react2.default.createElement("p", { className: "text-12 font-semibold leading-loose text-gray-600" }, `${bundle.name}:`, /* @__PURE__ */ _react2.default.createElement("span", { className: "ml-2 text-10 font-normal" }, `${findAttributeLabel(_optionalChain([bundle, 'access', _18 => _18.variant, 'optionalAccess', _19 => _19.attributes]))}`)), /* @__PURE__ */ _react2.default.createElement("p", { className: "ml-2 text-10 font-normal leading-loose text-gray-600" }, !!_optionalChain([bundle, 'access', _20 => _20.price, 'optionalAccess', _21 => _21.centAmount]) ? ` ${_chunkPXCQLKQOcjs.CurrencyHelpers.formatForCurrency(bundle.price, locale)}` : "")))]));
};
var bundled_items_default2 = BundledItems;

// src/configurable-products/frontend/components/configurable-components/index.tsx


var _outline = require('@heroicons/react/24/outline');

// src/configurable-products/frontend/components/configurable-components/configurable-component.tsx

var ConfigurableComponent = ({
  product,
  variant,
  onChangeVariantIdx,
  className,
  Select
}) => {
  const [selectedVariant, setSelectedVariant] = _react.useState.call(void 0, );
  const { productAttributes } = _chunkN5HRV44Wcjs.useConfigurableComponentsContext.call(void 0, );
  const { findAttributeLabel } = _chunkSFRQJTPJcjs.useConfigurableProductAttribute.call(void 0, { productAttributes });
  const getAttributeValueForSku = (sku) => {
    return findAttributeLabel(_optionalChain([product, 'optionalAccess', _22 => _22.variants, 'access', _23 => _23.find, 'call', _24 => _24((variant2) => variant2.sku === sku), 'optionalAccess', _25 => _25.attributes]));
  };
  const handleChangeVariant = (sku) => {
    const variantInx = _optionalChain([product, 'optionalAccess', _26 => _26.variants, 'access', _27 => _27.findIndex, 'call', _28 => _28((variant2) => variant2.sku === sku)]);
    onChangeVariantIdx(variantInx);
    setSelectedVariant(_optionalChain([product, 'optionalAccess', _29 => _29.variants, 'access', _30 => _30[variantInx]]));
  };
  _react.useEffect.call(void 0, () => {
    if (variant) {
      setSelectedVariant(variant);
    }
  }, [variant]);
  return /* @__PURE__ */ _react2.default.createElement("div", null, /* @__PURE__ */ _react2.default.createElement("p", { className: "p-4 text-14 font-semibold leading-loose" }, product.name), /* @__PURE__ */ _react2.default.createElement(
    Select,
    {
      onChange: (sku) => handleChangeVariant(sku),
      className,
      defaultValue: _optionalChain([selectedVariant, 'optionalAccess', _31 => _31.sku]),
      options: _optionalChain([product, 'optionalAccess', _32 => _32.variants, 'access', _33 => _33.map, 'call', _34 => _34((variant2) => ({
        value: variant2.sku,
        name: getAttributeValueForSku(variant2.sku)
      }))])
    }
  ));
};
var configurable_component_default = ConfigurableComponent;

// src/configurable-products/frontend/components/configurable-components/index.tsx
var ConfigurableComponents = ({ product, className, children, Button, Select, translatedTexts }) => {
  const [selectedComponentIdx, setSelectedComponentIdx] = _react.useState.call(void 0, 0);
  const [isDisabled, setIsDisabled] = _react.useState.call(void 0, true);
  const [components, setComponents] = _react.useState.call(void 0, []);
  const [updateCentAmount, setUpdateCentAmount] = _react.useState.call(void 0, );
  const [currentCentAmount, setCurrentCentAmount] = _react.useState.call(void 0, );
  const { configurableComponents, setSelectedVariants, productAttributes } = _chunkN5HRV44Wcjs.useConfigurableComponentsContext.call(void 0, );
  const { findAttributeLabel } = _chunkSFRQJTPJcjs.useConfigurableProductAttribute.call(void 0, { productAttributes });
  const { locale } = _navigation.useParams.call(void 0, );
  const handleChangeVariantIdx = (variantIdx, componentIdx) => {
    setComponents(
      (prevComponents) => prevComponents.map((component, i) => {
        if (i !== componentIdx) {
          return component;
        }
        return {
          ...component,
          tempVariant: _optionalChain([component, 'access', _35 => _35.variants, 'optionalAccess', _36 => _36[variantIdx]])
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
  _react.useEffect.call(void 0, () => {
    if (components.length) {
      const updated = components.reduce(
        (prev, item) => {
          return _chunkPXCQLKQOcjs.CurrencyHelpers.addCurrency(prev, _optionalChain([item, 'access', _37 => _37.tempVariant, 'optionalAccess', _38 => _38.price]));
        },
        { centAmount: 0, currencyCode: product.currency }
      );
      const current = components.reduce(
        (prev, item) => _chunkPXCQLKQOcjs.CurrencyHelpers.addCurrency(prev, _optionalChain([item, 'access', _39 => _39.selectedVariant, 'optionalAccess', _40 => _40.price])),
        { centAmount: 0, currencyCode: product.currency }
      );
      setIsDisabled(components.some((component) => !component.selectedVariant));
      setUpdateCentAmount(
        _chunkPXCQLKQOcjs.CurrencyHelpers.subtractCurrency(
          updated,
          currentCentAmount || { centAmount: 0, currencyCode: product.currency }
        )
      );
      setCurrentCentAmount(current);
      setSelectedVariants(components.map((component) => component.selectedVariant));
    }
  }, [components]);
  _react.useEffect.call(void 0, () => {
    if (_optionalChain([configurableComponents, 'optionalAccess', _41 => _41.length])) {
      setComponents(configurableComponents);
    }
  }, [configurableComponents]);
  if (!_optionalChain([configurableComponents, 'optionalAccess', _42 => _42.length])) {
    return children({ isDisabled: false });
  }
  return /* @__PURE__ */ _react2.default.createElement(_react2.default.Fragment, null, /* @__PURE__ */ _react2.default.createElement("style", null, `
        .tab-panels--selected {
          margin-top: -1px;
        }
        .tab-button--selected {
          margin-bottom: -1px;
        }
      `), /* @__PURE__ */ _react2.default.createElement("div", { className }, components.map((component, i) => /* @__PURE__ */ _react2.default.createElement(_react2.default.Fragment, null, /* @__PURE__ */ _react2.default.createElement(
    "input",
    {
      type: "radio",
      name: "tabset",
      className: "hidden",
      id: `tab${i}`,
      checked: i === selectedComponentIdx,
      onChange: () => selectedComponentIdx > i && jumpToStep(i)
    }
  ), /* @__PURE__ */ _react2.default.createElement(
    "label",
    {
      className: `relative inline-block cursor-pointer whitespace-nowrap border-neutral-300 bg-white px-4 py-4 text-12 ${selectedComponentIdx === i && "z-10 border-t border-x font-bold"} ${components.length !== selectedComponentIdx && "tab-button--selected"}`,
      htmlFor: `tab${i}`
    },
    /* @__PURE__ */ _react2.default.createElement("span", { className: "flex items-center gap-2" }, component.name, " ", selectedComponentIdx > i && /* @__PURE__ */ _react2.default.createElement(_outline.CheckIcon, { className: "h-4 w-4 text-primary" }))
  ))), /* @__PURE__ */ _react2.default.createElement("div", { className: `tab-panels relative ${components.length !== selectedComponentIdx && "tab-panels--selected"}` }, components.map((component, i) => /* @__PURE__ */ _react2.default.createElement(
    "article",
    {
      className: `border border-neutral-300 ${i === selectedComponentIdx ? "block" : "hidden"}`,
      key: component.productId
    },
    /* @__PURE__ */ _react2.default.createElement(
      configurable_component_default,
      {
        className: "p-4",
        product: component,
        onChangeVariantIdx: (idx) => handleChangeVariantIdx(idx, i),
        variant: component.tempVariant,
        Select
      }
    ),
    /* @__PURE__ */ _react2.default.createElement("div", { className: "flex justify-center p-4" }, /* @__PURE__ */ _react2.default.createElement(Button, { variant: "primary", size: "full", onClick: () => handleAdvanceNextStep(i), type: "button" }, `${_optionalChain([translatedTexts, 'optionalAccess', _43 => _43.next])} ${_optionalChain([updateCentAmount, 'optionalAccess', _44 => _44.centAmount]) && _optionalChain([updateCentAmount, 'optionalAccess', _45 => _45.centAmount]) >= 0 ? "+" : ""}${_chunkPXCQLKQOcjs.CurrencyHelpers.formatForCurrency(updateCentAmount || 0, locale)}`))
  )), components.length === selectedComponentIdx && /* @__PURE__ */ _react2.default.createElement("article", { className: "border-accent-400 max-h-[350px] border p-4" }, /* @__PURE__ */ _react2.default.createElement("span", { className: "text-14 font-semibold" }, _optionalChain([translatedTexts, 'optionalAccess', _46 => _46.summary])), /* @__PURE__ */ _react2.default.createElement("ul", null, components.map((component) => /* @__PURE__ */ _react2.default.createElement("li", { key: component.productId }, /* @__PURE__ */ _react2.default.createElement("span", { className: "text-14 font-bold" }, component.name, ": "), /* @__PURE__ */ _react2.default.createElement("span", { className: "text-12" }, findAttributeLabel(_optionalChain([component, 'optionalAccess', _47 => _47.selectedVariant, 'optionalAccess', _48 => _48.attributes])))))), /* @__PURE__ */ _react2.default.createElement("div", { className: "mt-4" }, /* @__PURE__ */ _react2.default.createElement("span", { className: "text-14" }, _optionalChain([translatedTexts, 'optionalAccess', _49 => _49.total])), /* @__PURE__ */ _react2.default.createElement("p", { className: "text-16" }, `${_chunkPXCQLKQOcjs.CurrencyHelpers.formatForCurrency(
    _optionalChain([product, 'optionalAccess', _50 => _50.price]) * 100,
    locale,
    _optionalChain([product, 'optionalAccess', _51 => _51.currency])
  )} + ${_chunkPXCQLKQOcjs.CurrencyHelpers.formatForCurrency(currentCentAmount || 0)}`)), /* @__PURE__ */ _react2.default.createElement("button", { className: "text-accent-400 mt-8 underline", onClick: () => jumpToStep(0), type: "button" }, _optionalChain([translatedTexts, 'optionalAccess', _52 => _52.back]))), components.length !== selectedComponentIdx && /* @__PURE__ */ _react2.default.createElement("div", { className: "mt-4" }, /* @__PURE__ */ _react2.default.createElement("span", { className: "text-14" }, _optionalChain([translatedTexts, 'optionalAccess', _53 => _53.total])), /* @__PURE__ */ _react2.default.createElement("p", { className: "text-16" }, `${_chunkPXCQLKQOcjs.CurrencyHelpers.formatForCurrency(
    _optionalChain([product, 'optionalAccess', _54 => _54.price]) * 100,
    locale,
    _optionalChain([product, 'optionalAccess', _55 => _55.currency])
  )} + ${_chunkPXCQLKQOcjs.CurrencyHelpers.formatForCurrency(currentCentAmount || 0, locale)}`)))), children({ isDisabled }));
};
var configurable_components_default2 = ConfigurableComponents;

// src/configurable-products/frontend/index.tsx
var COMPONENTS2 = {
  BundledItems: bundled_items_default2,
  ConfigurableComponents: configurable_components_default2
};
var PROVIDERS2 = {
  ConfigurableComponentsProvider: _chunkN5HRV44Wcjs.configurable_components_default,
  useConfigurableComponentsContext: _chunkN5HRV44Wcjs.useConfigurableComponentsContext,
  BundledItemsProvider: _chunkOYB2MVJScjs.bundled_items_default,
  useBundledItemsContext: _chunkOYB2MVJScjs.useBundledItemsContext
};
var hooks = {
  useChildComponents: _chunkOYB2MVJScjs.useChildComponents_default,
  useComponentsCart: _chunkN5HRV44Wcjs.useComponentsCart_default
};




exports.frontend_exports = frontend_exports; exports.frontend_exports2 = frontend_exports2;
