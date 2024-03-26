"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/utils/Errors.ts
var ExtensionError = class extends Error {
  constructor({ message, errors }) {
    super(message || _optionalChain([errors, 'optionalAccess', _ => _[0], 'optionalAccess', _2 => _2.message]));
    this.errors = errors || [{ message }];
  }
};
var ValidationError = class extends ExtensionError {
  constructor(options) {
    super(options);
    this.code = "validation_error";
  }
};
var ExternalError = class extends ExtensionError {
  constructor(options) {
    super(options);
    this.status = options.status;
    this.body = options.body;
    this.code = "external_error";
  }
};





exports.ExtensionError = ExtensionError; exports.ValidationError = ValidationError; exports.ExternalError = ExternalError;
