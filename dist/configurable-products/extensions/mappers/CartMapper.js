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
    CartMapper.mergeParentIdToCart = function (cart, comCart, config) {
        return __assign(__assign({}, cart), { lineItems: CartMapper.mergeParentIdToLineItem(cart.lineItems, comCart.lineItems, config) });
    };
    CartMapper.mergeParentIdToLineItem = function (cartLineItems, commercetoolsLineItem, config) {
        return cartLineItems.map(function (item) {
            var _a, _b, _c;
            return (__assign(__assign({}, item), ((config === null || config === void 0 ? void 0 : config.props.lineItem.parentIdCustomFieldKey) && {
                parentId: (_c = (_b = (_a = commercetoolsLineItem.find(function (commItem) { return commItem.id === item.lineItemId; })) === null || _a === void 0 ? void 0 : _a.custom) === null || _b === void 0 ? void 0 : _b.fields) === null || _c === void 0 ? void 0 : _c[config.props.lineItem.parentIdCustomFieldKey],
            })));
        });
    };
    return CartMapper;
}());
export { CartMapper };
