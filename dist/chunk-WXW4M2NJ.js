import {
  __superGet
} from "./chunk-53DOP6C6.js";

// src/superuser/extensions/mappers/CartMapper.ts
var injectCartMapper = (BaseCartMapper) => {
  var _a;
  return _a = class extends BaseCartMapper {
  }, _a.commercetoolsOrderToOrder = (commercetoolsOrder, locale) => {
    return {
      ...__superGet(_a, _a, "commercetoolsOrderToOrder").call(this, commercetoolsOrder, locale),
      superUserEmail: commercetoolsOrder.custom?.fields?.superUserEmail
    };
  }, _a;
};

export {
  injectCartMapper
};
