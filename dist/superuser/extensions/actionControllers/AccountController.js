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
import { getCurrency, getLocale } from '../../../utils/request';
import { extractDependency } from '../utils';
function loginCSRAccount(request, actionContext, account, impersonatedCustomerEmail, config) {
    return __awaiter(this, void 0, void 0, function () {
        var AccountApi, response_1, response_2, accountApi, superUserAccount, impersonatedAccount, error_1, response_3, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AccountApi = extractDependency('AccountApi', config === null || config === void 0 ? void 0 : config.dependencies);
                    if (!AccountApi) {
                        response_1 = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: AccountApi'),
                        };
                        return [2 /*return*/, response_1];
                    }
                    if (!impersonatedCustomerEmail) {
                        response_2 = {
                            statusCode: 401,
                            body: JSON.stringify('Impersonated customer email is required'),
                            sessionData: __assign(__assign({}, request.sessionData), { account: undefined, superUser: undefined }),
                        };
                        return [2 /*return*/, response_2];
                    }
                    accountApi = new AccountApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
                    impersonatedAccount = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, accountApi.login(account, undefined)];
                case 2:
                    superUserAccount = _a.sent();
                    return [4 /*yield*/, accountApi.getCustomerByEmail(impersonatedCustomerEmail)];
                case 3:
                    impersonatedAccount = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    if (error_1.code === 'account_authentication_error') {
                        response_3 = {
                            statusCode: 401,
                            body: JSON.stringify(error_1.message),
                            sessionData: __assign(__assign({}, request.sessionData), { account: undefined, superUser: undefined }),
                        };
                        return [2 /*return*/, response_3];
                    }
                    throw error_1;
                case 5:
                    response = {
                        statusCode: 200,
                        body: JSON.stringify(account),
                        sessionData: __assign(__assign({}, request.sessionData), { account: impersonatedAccount, superUser: {
                                email: superUserAccount.email,
                                firstName: superUserAccount.firstName,
                                lastName: superUserAccount.lastName,
                            } }),
                    };
                    return [2 /*return*/, response];
            }
        });
    });
}
export var loginCSR = function (config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var accountLoginBody, account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!request.body) return [3 /*break*/, 2];
                    accountLoginBody = JSON.parse(request.body);
                    account = {
                        email: accountLoginBody.email,
                        password: accountLoginBody.password,
                    };
                    return [4 /*yield*/, loginCSRAccount(request, actionContext, account, accountLoginBody.impersonatedCustomerEmail, config)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
            }
        });
    }); };
};
export var getSuperuser = function (config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        var _a;
        return __generator(this, function (_b) {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    isSuperuser: false,
                    superUser: (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.superUser,
                }),
                sessionData: __assign({}, request.sessionData),
            };
            return [2 /*return*/, response];
        });
    }); };
};
export var loginHookWithCSRCheck = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, account, AccountApi, accountApi, customerAccount, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 3];
                    account = JSON.parse(originalResult.body);
                    AccountApi = extractDependency('AccountApi', config === null || config === void 0 ? void 0 : config.dependencies);
                    accountApi = new AccountApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
                    return [4 /*yield*/, accountApi.getCustomerByEmail(account.email)];
                case 2:
                    customerAccount = _a.sent();
                    if (customerAccount.customerGroupId && customerAccount.customerGroupId === (config === null || config === void 0 ? void 0 : config.props.csrCustomerGroupId)) {
                        response = {
                            statusCode: 300,
                            body: JSON.stringify('CSR'),
                            sessionData: __assign(__assign({}, request.sessionData), { account: undefined, superUser: undefined }),
                        };
                        return [2 /*return*/, response];
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
export var logoutWithCSRCheck = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    if (originalResult.statusCode === 200) {
                        return [2 /*return*/, {
                                statusCode: 200,
                                body: originalResult.body,
                                sessionData: __assign(__assign({}, originalResult.sessionData), { superUser: undefined }),
                            }];
                    }
                    return [2 /*return*/, originalResult];
            }
        });
    }); };
};
