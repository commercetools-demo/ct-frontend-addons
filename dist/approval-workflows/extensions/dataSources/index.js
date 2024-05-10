var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { extractDependency } from '../utils';
import { getApprovalApi } from '../utils/getApprovalApi';
import queryParamsToIds from '../../../shared/utils/queryParamsToIds';
import queryParamsToStates from '../../../shared/utils/queryParamsToState';
function approvalFlowQueryFromContext(context, config, configuration) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var ApprovalFlowApi = extractDependency('ApprovalFlowApi', configuration);
    var approvalFlowApi = getApprovalApi(context.request, context.frontasticContext, ApprovalFlowApi);
    var flowQuery = {
        limit: (_c = (_b = (_a = context.request) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.limit) !== null && _c !== void 0 ? _c : undefined,
        cursor: (_f = (_e = (_d = context.request) === null || _d === void 0 ? void 0 : _d.query) === null || _e === void 0 ? void 0 : _e.cursor) !== null && _f !== void 0 ? _f : undefined,
        flowIds: queryParamsToIds('flowIds', (_g = context.request) === null || _g === void 0 ? void 0 : _g.query),
        flowStates: queryParamsToStates('flowStates', (_h = context.request) === null || _h === void 0 ? void 0 : _h.query),
    };
    return { approvalFlowApi: approvalFlowApi, flowQuery: flowQuery };
}
function approvalRuleQueryFromContext(context, config, configuration) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var ApprovalRuleApi = extractDependency('ApprovalRuleApi', configuration);
    var approvalRulepi = getApprovalApi(context.request, context.frontasticContext, ApprovalRuleApi);
    var ruleQuery = {
        limit: (_c = (_b = (_a = context.request) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.limit) !== null && _c !== void 0 ? _c : undefined,
        cursor: (_f = (_e = (_d = context.request) === null || _d === void 0 ? void 0 : _d.query) === null || _e === void 0 ? void 0 : _e.cursor) !== null && _f !== void 0 ? _f : undefined,
        ruleIds: queryParamsToIds('ruleIds', (_g = context.request) === null || _g === void 0 ? void 0 : _g.query),
        ruleStates: queryParamsToStates('ruleStates', (_h = context.request) === null || _h === void 0 ? void 0 : _h.query),
    };
    return { approvalRulepi: approvalRulepi, ruleQuery: ruleQuery };
}
export default {
    'frontastic/approval-flow': {
        create: true,
        hook: function (configuration) { return function (config, context) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, approvalFlowApi, flowQuery;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = approvalFlowQueryFromContext(context, config, configuration), approvalFlowApi = _a.approvalFlowApi, flowQuery = _a.flowQuery;
                        return [4 /*yield*/, approvalFlowApi.query(flowQuery).then(function (flowResult) {
                                var _a;
                                return {
                                    dataSourcePayload: {
                                        flow: (_a = flowResult.items) === null || _a === void 0 ? void 0 : _a[0],
                                    },
                                };
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        }); }; },
    },
    'frontastic/approval-rule': {
        create: true,
        hook: function (configuration) { return function (config, context) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, approvalRulepi, ruleQuery;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = approvalRuleQueryFromContext(context, config, configuration), approvalRulepi = _a.approvalRulepi, ruleQuery = _a.ruleQuery;
                        return [4 /*yield*/, approvalRulepi.query(ruleQuery).then(function (ruleResult) {
                                var _a;
                                return {
                                    dataSourcePayload: {
                                        rule: (_a = ruleResult.items) === null || _a === void 0 ? void 0 : _a[0],
                                    },
                                };
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        }); }; },
    },
};
