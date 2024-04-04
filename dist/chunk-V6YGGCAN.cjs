"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/superuser/frontend/hooks/standalone-price.ts
var _react = require('react');
var _swr = require('swr');
var useStandalonePrice = ({
  sdk,
  mutatePath = "/action/cart/getCart"
}) => {
  const changePrice = _react.useCallback.call(void 0, async (lineItemId, price) => {
    const payload = {
      lineItemId,
      price
    };
    const res = await sdk.callAction({ actionName: `cart/changePrice`, payload });
    _swr.mutate.call(void 0, mutatePath, res);
  }, []);
  return { changePrice };
};



exports.useStandalonePrice = useStandalonePrice;
