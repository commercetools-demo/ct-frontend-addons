"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkW3SHGGRZcjs = require('./chunk-W3SHGGRZ.cjs');


var _chunkV6YGGCANcjs = require('./chunk-V6YGGCAN.cjs');



var _chunkKSMNEOIDcjs = require('./chunk-KSMNEOID.cjs');


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



exports.frontend_exports = frontend_exports;
