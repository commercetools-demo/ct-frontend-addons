"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkNASA367Ocjs = require('./chunk-NASA367O.cjs');

// src/minimum-quantity/extensions/utils.ts
var extractDependency = (dependency, dependencies) => {
  if (_optionalChain([dependencies, 'optionalAccess', _ => _[dependency]])) {
    return _chunkNASA367Ocjs.injectCartApi.call(void 0, dependencies[dependency]);
  }
};



exports.extractDependency = extractDependency;
