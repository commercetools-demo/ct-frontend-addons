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
import { ApprovalFlowMapper } from '../mappers/ApprovalFlowMapper';
import { extractDependency } from '../utils';
import { getOffsetFromCursor } from '../../../shared/utils/Pagination';
export var injectApprovalFlowApi = function (BaseApi, config) {
    var CartMapper = extractDependency('CartMapper', config);
    return /** @class */ (function (_super) {
        __extends(ApprovalFlowApi, _super);
        function ApprovalFlowApi(context, locale, currency, accountId, businessUnitKey) {
            var _this = _super.call(this, context, locale, currency) || this;
            _this.query = function (flowQuery) { return __awaiter(_this, void 0, void 0, function () {
                var locale, limit, sortAttributes, whereClause;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _c.sent();
                            limit = +flowQuery.limit || undefined;
                            sortAttributes = [];
                            if (flowQuery.sortAttributes) {
                                Object.keys(flowQuery.sortAttributes).map(function (field, directionIndex) {
                                    sortAttributes.push("".concat(field, " ").concat(Object.values(flowQuery.sortAttributes)[directionIndex]));
                                });
                            }
                            else {
                                // default sort
                                sortAttributes.push("createdAt desc");
                            }
                            whereClause = [];
                            if (flowQuery.flowIds !== undefined && flowQuery.flowIds.length !== 0) {
                                whereClause.push("id in (\"".concat(flowQuery.flowIds.join('","'), "\")"));
                            }
                            if (flowQuery.flowStates !== undefined && flowQuery.flowStates.length > 0) {
                                whereClause.push("status in (\"".concat(flowQuery.flowStates.join('","'), "\")"));
                            }
                            if (((_a = flowQuery.created) === null || _a === void 0 ? void 0 : _a.from) !== undefined) {
                                whereClause.push("createdAt > \"".concat(flowQuery.created.from.toISOString(), "\""));
                            }
                            if (((_b = flowQuery.created) === null || _b === void 0 ? void 0 : _b.to) !== undefined) {
                                whereClause.push("createdAt < \"".concat(flowQuery.created.to.toISOString(), "\""));
                            }
                            return [2 /*return*/, this.associateEndpoints(this.accountId, this.businessUnitKey)
                                    .approvalFlows()
                                    .get({
                                    queryArgs: {
                                        where: whereClause,
                                        expand: 'order',
                                        limit: limit,
                                        offset: getOffsetFromCursor(flowQuery.cursor),
                                        sort: sortAttributes,
                                    },
                                })
                                    .execute()
                                    .then(function (response) {
                                    var _a;
                                    var count = response.body.results.length;
                                    return {
                                        items: response.body.results.map(function (flow) {
                                            return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(flow, CartMapper, locale);
                                        }),
                                        count: count,
                                        total: response.body.total,
                                        previousCursor: ApprovalFlowMapper.calculatePreviousCursor(response.body.offset, count),
                                        nextCursor: ApprovalFlowMapper.calculateNextCursor(response.body.offset, count, (_a = response.body.total) !== null && _a !== void 0 ? _a : 0),
                                    };
                                })];
                    }
                });
            }); };
            _this.get = function (id) { return __awaiter(_this, void 0, void 0, function () {
                var locale;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            return [2 /*return*/, this.associateEndpoints(this.accountId, this.businessUnitKey)
                                    .approvalFlows()
                                    .withId({ ID: id })
                                    .get({
                                    queryArgs: {
                                        expand: 'order',
                                    },
                                })
                                    .execute()
                                    .then(function (response) {
                                    return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body, CartMapper, locale);
                                })];
                    }
                });
            }); };
            _this.getFlowByOrderId = function (orderId) { return __awaiter(_this, void 0, void 0, function () {
                var locale, where;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            where = "order(id=\"".concat(orderId, "\")");
                            return [2 /*return*/, this.associateEndpoints(this.accountId, this.businessUnitKey)
                                    .approvalFlows()
                                    .get({
                                    queryArgs: {
                                        where: where,
                                    },
                                })
                                    .execute()
                                    .then(function (response) {
                                    if (response.body.total !== 1) {
                                        throw 'Order not found';
                                    }
                                    return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body.results[0], CartMapper, locale);
                                })];
                    }
                });
            }); };
            _this.update = function (id, updateActions) { return __awaiter(_this, void 0, void 0, function () {
                var locale;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            return [2 /*return*/, this.get(id).then(function (approvalFlow) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, this.associateEndpoints(this.accountId, this.businessUnitKey)
                                                .approvalFlows()
                                                .withId({ ID: id })
                                                .post({
                                                body: {
                                                    version: approvalFlow.version,
                                                    actions: updateActions,
                                                },
                                            })
                                                .execute()
                                                .then(function (response) {
                                                return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body, CartMapper, locale);
                                            })];
                                    });
                                }); })];
                    }
                });
            }); };
            _this.accountId = accountId;
            _this.businessUnitKey = businessUnitKey;
            return _this;
        }
        return ApprovalFlowApi;
    }(BaseApi));
};
