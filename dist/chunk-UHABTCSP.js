import {
  __superGet
} from "./chunk-53DOP6C6.js";

// src/superuser/extensions/mappers/AccountMapper.ts
var injectAccountMapper = (BaseAccountMapper) => {
  var _a;
  return _a = class extends BaseAccountMapper {
  }, _a.commercetoolsCustomerToAccount = (commercetoolsCustomer, locale) => {
    return {
      ...__superGet(_a, _a, "commercetoolsCustomerToAccount").call(this, commercetoolsCustomer, locale),
      customerGroupId: commercetoolsCustomer.customerGroup?.id
    };
  }, _a;
};

export {
  injectAccountMapper
};
