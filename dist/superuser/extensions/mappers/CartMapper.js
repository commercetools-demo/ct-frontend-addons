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
export var injectCartMapper = function (BaseCartMapper) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(CartMapper, _super);
            function CartMapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CartMapper;
        }(BaseCartMapper)),
        _a.commercetoolsOrderToOrder = function (commercetoolsOrder, locale, defaultLocale) {
            var _b, _c;
            return __assign(__assign({}, _super.commercetoolsOrderToOrder.call(_a, commercetoolsOrder, locale, defaultLocale)), { superUserEmail: (_c = (_b = commercetoolsOrder.custom) === null || _b === void 0 ? void 0 : _b.fields) === null || _c === void 0 ? void 0 : _c.superUserEmail });
        },
        _a;
};
