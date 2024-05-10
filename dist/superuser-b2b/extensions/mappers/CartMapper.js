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
var CartMapper = /** @class */ (function () {
    function CartMapper() {
    }
    CartMapper.mergeCommercetoolsOrderToOrder = function (commercetoolsOrder, order, config) {
        var _a, _b, _c, _d;
        return __assign(__assign({}, order), (((_b = (_a = commercetoolsOrder === null || commercetoolsOrder === void 0 ? void 0 : commercetoolsOrder.custom) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b[config.props.cart.superuserEmailFieldKey]) && {
            superuserEmail: (_d = (_c = commercetoolsOrder === null || commercetoolsOrder === void 0 ? void 0 : commercetoolsOrder.custom) === null || _c === void 0 ? void 0 : _c.fields) === null || _d === void 0 ? void 0 : _d[config.props.cart.superuserEmailFieldKey],
        }));
    };
    return CartMapper;
}());
export default CartMapper;
