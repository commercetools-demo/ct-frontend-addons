"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkLJMH7IXGcjs = require('./chunk-LJMH7IXG.cjs');


var _chunkCH2SQNPYcjs = require('./chunk-CH2SQNPY.cjs');


var _chunkIEH7CKH7cjs = require('./chunk-IEH7CKH7.cjs');


var _chunkRG224BWMcjs = require('./chunk-RG224BWM.cjs');

// src/superuser/extensions/utils.ts
var extractDependency = (dependency, dependencies) => {
  if (_optionalChain([dependencies, 'optionalAccess', _ => _[dependency]])) {
    switch (dependency) {
      case "CartApi":
        return _chunkCH2SQNPYcjs.injectCartApi.call(void 0, dependencies.CartApi, extractDependency("CartMapper", dependencies));
      case "AccountApi":
        return _chunkLJMH7IXGcjs.injectAccountApi.call(void 0, dependencies.AccountApi, extractDependency("AccountMapper", dependencies));
      case "AccountMapper":
        return _chunkIEH7CKH7cjs.injectAccountMapper.call(void 0, dependencies.AccountMapper);
      case "CartMapper":
        return _chunkRG224BWMcjs.injectCartMapper.call(void 0, dependencies.CartMapper);
    }
  }
};



exports.extractDependency = extractDependency;
