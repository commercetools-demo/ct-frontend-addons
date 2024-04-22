var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ExtensionError = /** @class */ (function (_super) {
    __extends(ExtensionError, _super);
    function ExtensionError(_a) {
        var message = _a.message, errors = _a.errors;
        var _b;
        var _this = _super.call(this, message || ((_b = errors === null || errors === void 0 ? void 0 : errors[0]) === null || _b === void 0 ? void 0 : _b.message)) || this;
        _this.errors = errors || [{ message: message }];
        return _this;
    }
    return ExtensionError;
}(Error));
export { ExtensionError };
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(options) {
        var _this = _super.call(this, options) || this;
        _this.code = 'validation_error';
        return _this;
    }
    return ValidationError;
}(ExtensionError));
export { ValidationError };
var ExternalError = /** @class */ (function (_super) {
    __extends(ExternalError, _super);
    function ExternalError(options) {
        var _this = _super.call(this, options) || this;
        _this.status = options.status;
        _this.body = options.body;
        _this.code = 'external_error';
        return _this;
    }
    return ExternalError;
}(ExtensionError));
export { ExternalError };
