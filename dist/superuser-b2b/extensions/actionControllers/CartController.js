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
import { getLocale, getStoreKey, getSuperuserFromSession } from '../../../utils/request';
import { extractDependency } from '../utils';
import { getCartApi } from '../../../shared/utils/getCartApi';
import parseRequestBody from '../../../utils/parseRequestBody';
export var getAllSuperuserCartsInStore = function (config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var carts, CartApi, cartApi, storeKey, response_1, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    carts = [];
                    if (!getSuperuserFromSession(request)) return [3 /*break*/, 2];
                    CartApi = extractDependency('CartApi', config);
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    storeKey = getStoreKey(request);
                    return [4 /*yield*/, cartApi.getAllSuperuserCartsInStore(storeKey)];
                case 1:
                    carts = (_a.sent());
                    response_1 = {
                        statusCode: 200,
                        body: JSON.stringify(carts),
                        sessionData: __assign({}, request.sessionData),
                    };
                    return [2 /*return*/, response_1];
                case 2:
                    response = {
                        statusCode: 200,
                        body: JSON.stringify([]),
                        sessionData: __assign({}, request.sessionData),
                    };
                    return [2 /*return*/, response];
            }
        });
    }); };
};
export var setCart = function (config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var CartApi, cartApi, id, body, cart, commercetoolsCart, cartId, response_2, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!getSuperuserFromSession(request)) return [3 /*break*/, 5];
                    CartApi = extractDependency('CartApi', config);
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    id = (_a = request.query) === null || _a === void 0 ? void 0 : _a.id;
                    body = parseRequestBody(request.body);
                    return [4 /*yield*/, cartApi.getByPureId(id)];
                case 1:
                    cart = _b.sent();
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cart.cartId)];
                case 2:
                    commercetoolsCart = _b.sent();
                    cartId = cart.cartId;
                    if (!!!(body === null || body === void 0 ? void 0 : body.email)) return [3 /*break*/, 4];
                    return [4 /*yield*/, cartApi.setOriginalCustomerData(commercetoolsCart, (body === null || body === void 0 ? void 0 : body.email) || '', config === null || config === void 0 ? void 0 : config.props.cart.customTypeKey, config === null || config === void 0 ? void 0 : config.props.cart.originalEmailFieldKey)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    response_2 = {
                        statusCode: 200,
                        body: JSON.stringify(cart),
                        sessionData: __assign(__assign({}, request.sessionData), { cartId: cartId }),
                    };
                    return [2 /*return*/, response_2];
                case 5:
                    response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            statusCode: 500,
                            message: 'Not a superuser',
                        }),
                        sessionData: __assign({}, request.sessionData),
                    };
                    return [2 /*return*/, response];
            }
        });
    }); };
};
export var createSuperuserCart = function (config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var CartApi, cartApi, storeKey, cart, cartId, response_3, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!getSuperuserFromSession(request)) return [3 /*break*/, 2];
                    CartApi = extractDependency('CartApi', config);
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    storeKey = getStoreKey(request);
                    return [4 /*yield*/, cartApi.createSuperuserCart(storeKey, true)];
                case 1:
                    cart = _a.sent();
                    cartId = cart.cartId;
                    response_3 = {
                        statusCode: 200,
                        body: JSON.stringify(cart),
                        sessionData: __assign(__assign({}, request.sessionData), { cartId: cartId }),
                    };
                    return [2 /*return*/, response_3];
                case 2:
                    response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            statusCode: 500,
                            message: 'Not a superuser',
                        }),
                        sessionData: __assign({}, request.sessionData),
                    };
                    return [2 /*return*/, response];
            }
        });
    }); };
};
export var checkout = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var locale, CartApi, cartApi, cartId, originalCart, originalOwnerEmail, originalResult, order, isSuperuser, orderId, EmailApiFactory, emailApi;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    locale = getLocale(request);
                    CartApi = extractDependency('CartApi', config);
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    cartId = (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.cartId;
                    // If the cartId or the originalEmailFieldKey is not found, return the original callback.
                    if (!cartId || !(config === null || config === void 0 ? void 0 : config.props.cart.originalEmailFieldKey)) {
                        return [2 /*return*/, originalCb(request, actionContext)];
                    }
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cartId)];
                case 1:
                    originalCart = _f.sent();
                    originalOwnerEmail = (_c = (_b = originalCart === null || originalCart === void 0 ? void 0 : originalCart.custom) === null || _b === void 0 ? void 0 : _b.fields) === null || _c === void 0 ? void 0 : _c[config.props.cart.originalEmailFieldKey];
                    return [4 /*yield*/, originalCb(request, actionContext)];
                case 2:
                    originalResult = _f.sent();
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 4];
                    order = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    isSuperuser = getSuperuserFromSession(request);
                    if (!(isSuperuser && order)) return [3 /*break*/, 4];
                    orderId = order === null || order === void 0 ? void 0 : order.orderId;
                    if (!orderId) return [3 /*break*/, 4];
                    return [4 /*yield*/, cartApi.setSuperUserEmailOnOrder(orderId, order.orderVersion, originalOwnerEmail, (_e = (_d = request.sessionData) === null || _d === void 0 ? void 0 : _d.account) === null || _e === void 0 ? void 0 : _e.email, config === null || config === void 0 ? void 0 : config.props.cart.customTypeKey, config === null || config === void 0 ? void 0 : config.props.cart.superuserEmailFieldKey)];
                case 3:
                    _f.sent();
                    EmailApiFactory = extractDependency('EmailApiFactory', config);
                    emailApi = EmailApiFactory.getDefaultApi(actionContext.frontasticContext, locale);
                    emailApi.sendOrderConfirmationEmail(__assign(__assign({}, order), { email: originalOwnerEmail }));
                    _f.label = 4;
                case 4: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
export var reassignCart = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, originalRequstBody, cart, CartApi, cartApi, commercetoolsCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 5];
                    originalRequstBody = parseRequestBody(request.body);
                    cart = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    CartApi = extractDependency('CartApi', config);
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cart.cartId)];
                case 2:
                    commercetoolsCart = _a.sent();
                    if (!!!(originalRequstBody === null || originalRequstBody === void 0 ? void 0 : originalRequstBody.email)) return [3 /*break*/, 4];
                    return [4 /*yield*/, cartApi.setOriginalCustomerData(commercetoolsCart, originalRequstBody === null || originalRequstBody === void 0 ? void 0 : originalRequstBody.email, config === null || config === void 0 ? void 0 : config.props.cart.customTypeKey, config === null || config === void 0 ? void 0 : config.props.cart.originalEmailFieldKey)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, originalResult];
                case 5: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
