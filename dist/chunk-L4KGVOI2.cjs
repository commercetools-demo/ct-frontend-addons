"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/superuser/extensions/dataSources/index.ts
var dataSources_default = {
  "frontastic/csr": async (config, context) => {
    return {
      dataSourcePayload: {
        superUser: _optionalChain([context, 'optionalAccess', _ => _.request, 'optionalAccess', _2 => _2.sessionData, 'optionalAccess', _3 => _3.superUser])
      }
    };
  }
};



exports.dataSources_default = dataSources_default;
