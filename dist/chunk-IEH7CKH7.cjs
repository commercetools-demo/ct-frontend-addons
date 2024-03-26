"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkD7CLCBWVcjs = require('./chunk-D7CLCBWV.cjs');

// src/superuser/extensions/mappers/AccountMapper.ts
var injectAccountMapper = (BaseAccountMapper) => {
  var _a;
  return _a = class extends BaseAccountMapper {
  }, _a.commercetoolsCustomerToAccount = (commercetoolsCustomer, locale) => {
    return {
      ..._chunkD7CLCBWVcjs.__superGet.call(void 0, _a, _a, "commercetoolsCustomerToAccount").call(this, commercetoolsCustomer, locale),
      customerGroupId: _optionalChain([commercetoolsCustomer, 'access', _ => _.customerGroup, 'optionalAccess', _2 => _2.id])
    };
  }, _a;
};



exports.injectAccountMapper = injectAccountMapper;
