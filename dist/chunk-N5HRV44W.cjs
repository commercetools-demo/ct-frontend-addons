"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkOYB2MVJScjs = require('./chunk-OYB2MVJS.cjs');

// src/configurable-products/frontend/hooks/useComponentsCart.ts
var _react = require('react'); var _react2 = _interopRequireDefault(_react);

// src/configurable-products/frontend/providers/configurable-components/index.tsx

var initialState = {
  configurableComponents: [],
  selectedVariants: [],
  productAttributes: [],
  setSelectedVariants: () => {
  }
};
var ConfigurableComponentsContext = _react.createContext.call(void 0, initialState);
var ConfigurableComponentsProvider = ({
  children,
  configurableComponents,
  productAttributes
}) => {
  const [selectedVariants, setSelectedVariants] = _react.useState.call(void 0, Array(_optionalChain([configurableComponents, 'optionalAccess', _ => _.length])).fill(null));
  return /* @__PURE__ */ _react2.default.createElement(
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
var useConfigurableComponentsContext = () => _react.useContext.call(void 0, ConfigurableComponentsContext);

// src/configurable-products/frontend/hooks/useComponentsCart.ts
var useComponentsCart = (sdk, businessUnitKey, storeKey) => {
  const { selectedVariants } = useConfigurableComponentsContext();
  const { bundleComponentsIntoLineItems } = _chunkOYB2MVJScjs.useChildComponents_default.call(void 0, );
  const addComponents = _react.useCallback.call(void 0, 
    async (lineItems, mutate) => {
      if (selectedVariants.length === 0)
        return;
      const payload = {
        lineItems: lineItems.map(({ sku, count }) => ({ variant: { sku }, count })),
        businessUnitKey,
        configurableComponents: _optionalChain([selectedVariants, 'optionalAccess', _2 => _2.filter, 'call', _3 => _3(Boolean), 'optionalAccess', _4 => _4.map, 'call', _5 => _5((variant) => ({
          variant,
          count: 1
        }))])
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





exports.configurable_components_default = configurable_components_default; exports.useConfigurableComponentsContext = useConfigurableComponentsContext; exports.useComponentsCart_default = useComponentsCart_default;
