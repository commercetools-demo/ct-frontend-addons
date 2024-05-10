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
var ApprovalFlowMapper = /** @class */ (function () {
    function ApprovalFlowMapper() {
    }
    ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow = function (flow, CartMapper, locale) {
        var _a;
        return __assign(__assign({}, flow), (((_a = flow.order) === null || _a === void 0 ? void 0 : _a.obj) && { order: CartMapper.commercetoolsOrderToOrder(flow.order.obj, locale) }));
    };
    ApprovalFlowMapper.calculatePreviousCursor = function (offset, count) {
        return offset - count >= 0 ? "offset:".concat(offset - count) : undefined;
    };
    ApprovalFlowMapper.calculateNextCursor = function (offset, count, total) {
        return offset + count < total ? "offset:".concat(offset + count) : undefined;
    };
    return ApprovalFlowMapper;
}());
export { ApprovalFlowMapper };
