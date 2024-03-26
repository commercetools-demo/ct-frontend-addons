import {
  formatMoneyCurrency,
  formatNumberForCurrency
} from "./chunk-5CPHS4XM.js";
import {
  useCSRLoginForm
} from "./chunk-JORVGZ3H.js";
import {
  useStandalonePrice
} from "./chunk-HP3TMTL3.js";
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

export {
  frontend_exports
};
