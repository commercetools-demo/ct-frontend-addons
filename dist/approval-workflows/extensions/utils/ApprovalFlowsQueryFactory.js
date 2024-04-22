import queryParamsToIds from '../../../shared/utils/queryParamsToIds';
import queryParamsToStates from '../../../shared/utils/queryParamsToState';
var ApprovalFlowsQueryFactory = /** @class */ (function () {
    function ApprovalFlowsQueryFactory() {
    }
    ApprovalFlowsQueryFactory.queryParamsToSortAttributes = function (queryParams) {
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
    ApprovalFlowsQueryFactory.queryFromParams = function (request) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var flowQuery = {
            limit: (_b = (_a = request.query) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : undefined,
            cursor: (_d = (_c = request.query) === null || _c === void 0 ? void 0 : _c.cursor) !== null && _d !== void 0 ? _d : undefined,
            sortAttributes: ApprovalFlowsQueryFactory.queryParamsToSortAttributes(request.query),
            flowIds: queryParamsToIds('flowIds', request.query),
            flowStates: queryParamsToStates('flowStates', request.query),
            created: {
                from: ((_e = request.query) === null || _e === void 0 ? void 0 : _e.createdFrom) ? new Date((_f = request.query) === null || _f === void 0 ? void 0 : _f.createdFrom) : undefined,
                to: ((_g = request.query) === null || _g === void 0 ? void 0 : _g.createdTo) ? new Date((_h = request.query) === null || _h === void 0 ? void 0 : _h.createdTo) : undefined,
            },
        };
        return flowQuery;
    };
    return ApprovalFlowsQueryFactory;
}());
export { ApprovalFlowsQueryFactory };
