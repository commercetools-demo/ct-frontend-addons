import queryParamsToStates from '../../../shared/utils/queryParamsToState';
import queryParamsToIds from '../../../shared/utils/queryParamsToIds';
var ApprovalRulesQueryFactory = /** @class */ (function () {
    function ApprovalRulesQueryFactory() {
    }
    ApprovalRulesQueryFactory.queryParamsToSortAttributes = function (queryParams) {
        var sortAttributes = {};
        if (queryParams.sortAttributes) {
            var sortAttribute = void 0;
            // @ts-ignore
            for (var _i = 0, _a = Object.values(queryParams.sortAttributes); _i < _a.length; _i++) {
                sortAttribute = _a[_i];
                var key = Object.keys(sortAttribute)[0];
                sortAttributes[key] = sortAttribute[key] ? sortAttribute[key] : 'ascending';
            }
        }
        return sortAttributes;
    };
    ApprovalRulesQueryFactory.queryFromParams = function (request) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var ruleQuery = {
            limit: (_b = (_a = request.query) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : undefined,
            cursor: (_d = (_c = request.query) === null || _c === void 0 ? void 0 : _c.cursor) !== null && _d !== void 0 ? _d : undefined,
            sortAttributes: ApprovalRulesQueryFactory.queryParamsToSortAttributes(request.query),
            predicate: (_e = request.query) === null || _e === void 0 ? void 0 : _e.predicate,
            ruleIds: queryParamsToIds('ruleIds', request.query),
            ruleStates: queryParamsToStates('ruleStates', request.query),
            created: {
                from: ((_f = request.query) === null || _f === void 0 ? void 0 : _f.createdFrom) ? new Date((_g = request.query) === null || _g === void 0 ? void 0 : _g.createdFrom) : undefined,
                to: ((_h = request.query) === null || _h === void 0 ? void 0 : _h.createdTo) ? new Date((_j = request.query) === null || _j === void 0 ? void 0 : _j.createdTo) : undefined,
            },
        };
        return ruleQuery;
    };
    return ApprovalRulesQueryFactory;
}());
export { ApprovalRulesQueryFactory };
