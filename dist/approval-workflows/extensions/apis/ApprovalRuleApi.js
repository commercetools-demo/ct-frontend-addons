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
import { ApprovalRuleMapper } from '../mappers/ApprovalRuleMapper';
import { getOffsetFromCursor } from '../../../shared/utils/Pagination';
export var injectApprovalRuleApi = function (BaseApi, config) {
    return /** @class */ (function (_super) {
        __extends(ApprovalRuleApi, _super);
        function ApprovalRuleApi(context, locale, currency, accountId, businessUnitKey) {
            var _this = _super.call(this, context, locale, currency) || this;
            _this.query = function (ruleQuery) { return __awaiter(_this, void 0, void 0, function () {
                var locale, limit, sortAttributes, whereClause;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _c.sent();
                            limit = +ruleQuery.limit || undefined;
                            sortAttributes = [];
                            if (ruleQuery.sortAttributes) {
                                Object.keys(ruleQuery.sortAttributes).map(function (field, directionIndex) {
                                    sortAttributes.push("".concat(field, " ").concat(Object.values(ruleQuery.sortAttributes)[directionIndex]));
                                });
                            }
                            else {
                                // default sort
                                sortAttributes.push("createdAt desc");
                            }
                            whereClause = [];
                            if (ruleQuery.predicate !== undefined) {
                                whereClause.push("predicate=\"".concat(ruleQuery.predicate, "\""));
                            }
                            if (ruleQuery.ruleIds !== undefined && ruleQuery.ruleIds.length > 0) {
                                whereClause.push("id in (\"".concat(ruleQuery.ruleIds.join('","'), "\")"));
                            }
                            if (ruleQuery.ruleStates !== undefined && ruleQuery.ruleStates.length > 0) {
                                whereClause.push("status in (\"".concat(ruleQuery.ruleStates.join('","'), "\")"));
                            }
                            if (((_a = ruleQuery.created) === null || _a === void 0 ? void 0 : _a.from) !== undefined) {
                                whereClause.push("createdAt > \"".concat(ruleQuery.created.from.toISOString(), "\""));
                            }
                            if (((_b = ruleQuery.created) === null || _b === void 0 ? void 0 : _b.to) !== undefined) {
                                whereClause.push("createdAt < \"".concat(ruleQuery.created.to.toISOString(), "\""));
                            }
                            return [2 /*return*/, this.associateEndpoints(this.accountId, this.businessUnitKey)
                                    .approvalRules()
                                    .get({
                                    queryArgs: {
                                        where: whereClause,
                                        expand: 'order',
                                        limit: limit,
                                        offset: getOffsetFromCursor(ruleQuery.cursor),
                                        sort: sortAttributes,
                                    },
                                })
                                    .execute()
                                    .then(function (response) {
                                    var _a;
                                    var count = response.body.results.length;
                                    return {
                                        items: response.body.results.map(function (flow) {
                                            return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(flow, locale);
                                        }),
                                        count: count,
                                        total: response.body.total,
                                        previousCursor: ApprovalRuleMapper.calculatePreviousCursor(response.body.offset, count),
                                        nextCursor: ApprovalRuleMapper.calculateNextCursor(response.body.offset, count, (_a = response.body.total) !== null && _a !== void 0 ? _a : 0),
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
                                    .approvalRules()
                                    .withId({ ID: id })
                                    .get({
                                    queryArgs: {
                                        expand: 'order',
                                    },
                                })
                                    .execute()
                                    .then(function (response) {
                                    return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
                                })];
                    }
                });
            }); };
            _this.create = function (data) { return __awaiter(_this, void 0, void 0, function () {
                var locale;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            return [2 /*return*/, this.associateEndpoints(this.accountId, this.businessUnitKey)
                                    .approvalRules()
                                    .post({
                                    body: __assign({}, data),
                                })
                                    .execute()
                                    .then(function (response) {
                                    return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
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
                            return [2 /*return*/, this.get(id).then(function (approvalRule) {
                                    return _this.associateEndpoints(_this.accountId, _this.businessUnitKey)
                                        .approvalRules()
                                        .withId({ ID: id })
                                        .post({
                                        body: {
                                            version: approvalRule.version,
                                            actions: updateActions,
                                        },
                                    })
                                        .execute()
                                        .then(function (response) {
                                        return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
                                    });
                                })];
                    }
                });
            }); };
            _this.duplicate = function (businessUnitKey, data) { return __awaiter(_this, void 0, void 0, function () {
                var locale;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            return [2 /*return*/, this.associateEndpoints(this.accountId, businessUnitKey)
                                    .approvalRules()
                                    .post({
                                    body: __assign({}, data),
                                })
                                    .execute()
                                    .then(function (response) {
                                    return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
                                })];
                    }
                });
            }); };
            _this.accountId = accountId;
            _this.businessUnitKey = businessUnitKey;
            return _this;
        }
        return ApprovalRuleApi;
    }(BaseApi));
};
// export class ApprovalRuleApi extends BaseApi {
//   protected organization?: Organization;
//   protected account?: Account;
//   protected associateEndpoints?;
//   constructor(
//     frontasticContext: Context,
//     locale: string,
//     currency: string,
//     organization?: Organization,
//     account?: Account,
//   ) {
//     super(frontasticContext, locale, currency);
//     this.account = account;
//     this.organization = organization;
//     this.associateEndpoints =
//       account && organization
//         ? `/as-associate/${account.accountId}/in-business-unit/key=${organization.businessUnit.key}`
//         : '/';
//   }
//   protected throwError: (e: any) => never = (e: any) => {
//     throw (
//       e.response?.data?.message + e.response?.data?.errors?.map((error: any) => error.detailedErrorMessage)?.join(', ')
//     );
//   };
//   getAccessToken: () => Promise<string> = async (): Promise<string> => {
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
//     const response = await axios
//       .post(
//         `${clientSettings.authUrl}/oauth/token?grant_type=client_credentials&scope=manage_project:${clientSettings.projectKey}`,
//         null,
//         {
//           headers: {
//             Authorization: `Basic ${Buffer.from(clientSettings.clientId + ':' + clientSettings.clientSecret).toString(
//               'base64',
//             )}`,
//           },
//         },
//       )
//       .catch(this.throwError);
//     return response.data.access_token;
//   };
//   query: () => Promise<ApprovalRule[]> = async (): Promise<ApprovalRule[]> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
//     const response = await axios
//       .get(
//         `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules?sort=createdAt desc`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       )
//       .catch(this.throwError);
//     return response.data?.results;
//   };
//   get: (id: string) => Promise<ApprovalRule> = async (id: string): Promise<ApprovalRule> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
//     const response = await axios
//       .get(`${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .catch(this.throwError);
//     return response.data;
//   };
//   duplicate: (businessUnitKey: string, data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
//     businessUnitKey: string,
//     data: ApprovalRuleDraft,
//   ): Promise<ApprovalRule> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
//     const response = await axios
//       .post(
//         `${clientSettings.hostUrl}/${clientSettings.projectKey}/as-associate/${this.account.accountId}/in-business-unit/key=${businessUnitKey}/approval-rules`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       )
//       .catch(this.throwError);
//     return response.data;
//   };
//   update: (id: string, updateActions: any[]) => Promise<ApprovalRule> = async (
//     id: string,
//     updateActions: any[],
//   ): Promise<ApprovalRule> => {
//     const accessToken = await this.getAccessToken();
//     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
//     const response = await this.get(id).then(async (approvalRule) => {
//       const res = await axios
//         .post(
//           `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules/${id}`,
//           {
//             version: approvalRule.version,
//             actions: updateActions,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           },
//         )
//         .catch(this.throwError);
//       return res.data;
//     });
//     return response.data;
//   };
// }
