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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
export var injectAccountMapper = function (BaseAccountMapper) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(AccountMapper, _super);
            function AccountMapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return AccountMapper;
        }(BaseAccountMapper)),
        _a.commercetoolsCustomerToAccount = function (commercetoolsCustomer) {
            var _b;
            return __assign(__assign({}, _super.commercetoolsCustomerToAccount.call(_a, commercetoolsCustomer)), { customerGroupId: (_b = commercetoolsCustomer.customerGroup) === null || _b === void 0 ? void 0 : _b.id });
        },
        _a;
};
