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
// import { DomainApprovalFlow } from '../types/approval/Flow';
var ApprovalRuleMapper = /** @class */ (function () {
    function ApprovalRuleMapper() {
    }
    ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule = function (rule, locale) {
        return __assign({}, rule);
    };
    ApprovalRuleMapper.calculatePreviousCursor = function (offset, count) {
        return offset - count >= 0 ? "offset:".concat(offset - count) : undefined;
    };
    ApprovalRuleMapper.calculateNextCursor = function (offset, count, total) {
        return offset + count < total ? "offset:".concat(offset + count) : undefined;
    };
    return ApprovalRuleMapper;
}());
export { ApprovalRuleMapper };
