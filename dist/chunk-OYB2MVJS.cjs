"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/configurable-products/frontend/providers/bundled-items/index.tsx
var _react = require('react'); var _react2 = _interopRequireDefault(_react);
var initialState = {
  cart: void 0,
  productAttributes: []
};
var BundledItemsContext = _react.createContext.call(void 0, initialState);
var BundledItemsProvider = ({ cart, productAttributes, children }) => {
  return /* @__PURE__ */ _react2.default.createElement(
    BundledItemsContext.Provider,
    {
      value: {
        productAttributes,
        cart
      }
    },
    children
  );
};
var bundled_items_default = BundledItemsProvider;
var useBundledItemsContext = () => _react.useContext.call(void 0, BundledItemsContext);

// src/configurable-products/frontend/hooks/useChildComponents.ts
var childComponentsAttributeName = "bundled_components";
var useChildComponents = () => {
  const { cart } = useBundledItemsContext();
  const getBundledPrice = (lineItem) => {
    const originalLineItem = _optionalChain([cart, 'optionalAccess', _ => _.lineItems, 'optionalAccess', _2 => _2.find, 'call', _3 => _3((li) => li.lineItemId === lineItem.id)]);
    if (!originalLineItem)
      return { price: 0, discountedPrice: 0 };
    const discountedPrice = _optionalChain([originalLineItem, 'access', _4 => _4.variant, 'optionalAccess', _5 => _5.discountedPrice, 'optionalAccess', _6 => _6.centAmount]);
    if (!_optionalChain([originalLineItem, 'access', _7 => _7.variant, 'optionalAccess', _8 => _8.attributes, 'optionalAccess', _9 => _9[childComponentsAttributeName]])) {
      return { price: 0, discountedPrice: 0 };
    }
    const bundleCentAmount = (_optionalChain([originalLineItem, 'access', _10 => _10.variant, 'optionalAccess', _11 => _11.attributes, 'optionalAccess', _12 => _12[childComponentsAttributeName]])).reduce(
      (prev, curr) => prev + (_optionalChain([curr, 'access', _13 => _13.price, 'optionalAccess', _14 => _14.centAmount]) || 0),
      0
    );
    return {
      price: bundleCentAmount,
      discountedPrice: discountedPrice ? discountedPrice + bundleCentAmount : void 0
    };
  };
  const bundleComponentsIntoLineItems = (cart2) => {
    const lineItems = cart2.lineItems;
    if (cart2 && _optionalChain([lineItems, 'optionalAccess', _15 => _15.length])) {
      const bundles = _optionalChain([lineItems, 'optionalAccess', _16 => _16.filter, 'call', _17 => _17((item) => !!item.parentId)]);
      const items = _optionalChain([lineItems, 'optionalAccess', _18 => _18.filter, 'call', _19 => _19((item) => !item.parentId)]);
      return {
        ...cart2,
        lineItems: _optionalChain([items, 'optionalAccess', _20 => _20.map, 'call', _21 => _21((item) => {
          if (!_optionalChain([item, 'access', _22 => _22.variant, 'optionalAccess', _23 => _23.attributes])) {
            item = { ...item, variant: { ...item.variant, sku: item.sku, attributes: {} } };
          }
          const itemBundles = _optionalChain([bundles, 'optionalAccess', _24 => _24.filter, 'call', _25 => _25((bundle) => bundle.parentId === item.lineItemId)]);
          if (_optionalChain([item, 'access', _26 => _26.variant, 'optionalAccess', _27 => _27.attributes])) {
            item.variant.attributes[childComponentsAttributeName] = [];
          }
          _optionalChain([itemBundles, 'optionalAccess', _28 => _28.forEach, 'call', _29 => _29((bundle) => {
            _optionalChain([item, 'access', _30 => _30.variant, 'optionalAccess', _31 => _31.attributes, 'optionalAccess', _32 => _32[childComponentsAttributeName], 'access', _33 => _33.push, 'call', _34 => _34(bundle)]);
          })]);
          return { ...item };
        })])
      };
    }
    return cart2;
  };
  return {
    bundleComponentsIntoLineItems,
    getBundledPrice
  };
};
var useChildComponents_default = useChildComponents;






exports.bundled_items_default = bundled_items_default; exports.useBundledItemsContext = useBundledItemsContext; exports.childComponentsAttributeName = childComponentsAttributeName; exports.useChildComponents_default = useChildComponents_default;
