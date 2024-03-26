// src/utils/Errors.ts
var ExtensionError = class extends Error {
  constructor({ message, errors }) {
    super(message || errors?.[0]?.message);
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

export {
  ExtensionError,
  ValidationError,
  ExternalError
};
