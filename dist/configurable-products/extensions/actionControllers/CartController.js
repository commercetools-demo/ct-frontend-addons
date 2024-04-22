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
import { extractDependency } from '../utils';
import { getCartApi } from '../../../shared/utils/getCartApi';
import parseRequestBody from '../../../utils/parseRequestBody';
import { CartMapper } from '../mappers/CartMapper';
import { fetchCartIdFromSession } from '../../../utils/request';
export var getCart = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, cart, CartApi, response_1, cartApi, commercetoolsCart, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 3];
                    cart = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    CartApi = extractDependency('CartApi', config);
                    if (!CartApi) {
                        response_1 = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: CartApi'),
                        };
                        return [2 /*return*/, response_1];
                    }
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cart.cartId)];
                case 2:
                    commercetoolsCart = _a.sent();
                    cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
                    response = __assign(__assign({}, originalResult), { statusCode: 200, body: JSON.stringify(cart) });
                    return [2 /*return*/, response];
                case 3: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
export var addToCart = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, body, cart, CartApi, response_2, cartApi, commercetoolsCart, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    body = parseRequestBody(request.body);
                    if (!body) {
                        return [2 /*return*/, originalResult];
                    }
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 3];
                    cart = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    CartApi = extractDependency('CartApi', config);
                    if (!CartApi) {
                        response_2 = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: CartApi'),
                        };
                        return [2 /*return*/, response_2];
                    }
                    if (!(config === null || config === void 0 ? void 0 : config.props.lineItem.customTypeKey) || !(config === null || config === void 0 ? void 0 : config.props.lineItem.parentIdCustomFieldKey)) {
                        return [2 /*return*/, originalResult];
                    }
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cart.cartId)];
                case 2:
                    commercetoolsCart = _a.sent();
                    cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
                    response = __assign(__assign({}, originalResult), { statusCode: 200, body: JSON.stringify(cart) });
                    return [2 /*return*/, response];
                case 3: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
export var addComponentsToCart = function (config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var body, CartApi, response_3, response_4, cartApi, cartId, commercetoolsCart, lineItemId, cart, response_5, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = parseRequestBody(request.body);
                    CartApi = extractDependency('CartApi', config);
                    if (!CartApi) {
                        response_3 = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: CartApi'),
                        };
                        return [2 /*return*/, response_3];
                    }
                    if (!(config === null || config === void 0 ? void 0 : config.props.lineItem.customTypeKey) || !(config === null || config === void 0 ? void 0 : config.props.lineItem.parentIdCustomFieldKey)) {
                        response_4 = {
                            statusCode: 401,
                            body: JSON.stringify('Config not provided: lineItem.customTypeKey or lineItem.parentIdCustomFieldKey'),
                        };
                        return [2 /*return*/, response_4];
                    }
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    cartId = fetchCartIdFromSession(request);
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cartId)];
                case 1:
                    commercetoolsCart = _b.sent();
                    if (!commercetoolsCart) return [3 /*break*/, 4];
                    lineItemId = findNewLineItem(commercetoolsCart, body);
                    if (!(lineItemId && ((_a = body === null || body === void 0 ? void 0 : body.configurableComponents) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 4];
                    return [4 /*yield*/, cartApi.addLinkedLineitemsToCart(commercetoolsCart.id, commercetoolsCart.version, lineItemId, body.configurableComponents)];
                case 2:
                    cart = _b.sent();
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cartId)];
                case 3:
                    commercetoolsCart = _b.sent();
                    cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
                    response_5 = {
                        statusCode: 200,
                        body: JSON.stringify(cart),
                        sessionData: request.sessionData,
                    };
                    return [2 /*return*/, response_5];
                case 4:
                    response = {
                        statusCode: 503,
                        body: JSON.stringify({
                            statusCode: 503,
                            message: 'Error in addComponentsToCart',
                        }),
                        sessionData: request.sessionData,
                    };
                    return [2 /*return*/, response];
            }
        });
    }); };
};
export var removeLineItem = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, body, cart, CartApi, response, cartApi, commercetoolsCart, lineItemId, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _b.sent();
                    body = parseRequestBody(request.body);
                    if (!body) {
                        return [2 /*return*/, originalResult];
                    }
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 4];
                    cart = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    CartApi = extractDependency('CartApi', config);
                    if (!CartApi) {
                        response = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: CartApi'),
                        };
                        return [2 /*return*/, response];
                    }
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cart.cartId)];
                case 2:
                    commercetoolsCart = _b.sent();
                    cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
                    lineItemId = (_a = body.lineItem) === null || _a === void 0 ? void 0 : _a.id;
                    if (!lineItemId) return [3 /*break*/, 4];
                    return [4 /*yield*/, cartApi.removeLinkedLineitemsFromCart(cart, lineItemId)];
                case 3:
                    cart = _b.sent();
                    cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
                    response = __assign(__assign({}, originalResult), { statusCode: 200, body: JSON.stringify(cart) });
                    return [2 /*return*/, response];
                case 4: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
export var updateLineItem = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, body, cart, CartApi, response, cartApi, commercetoolsCart, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    body = parseRequestBody(request.body);
                    if (!body) {
                        return [2 /*return*/, originalResult];
                    }
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 5];
                    cart = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    CartApi = extractDependency('CartApi', config);
                    if (!CartApi) {
                        response = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: CartApi'),
                        };
                        return [2 /*return*/, response];
                    }
                    cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cart.cartId)];
                case 2:
                    commercetoolsCart = _a.sent();
                    cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
                    if (!body.lineItem) return [3 /*break*/, 5];
                    return [4 /*yield*/, cartApi.updateLinkedLineitemsInCart(cart, body.lineItem)];
                case 3:
                    cart = _a.sent();
                    return [4 /*yield*/, cartApi.getCommercetoolsCartById(cart.cartId)];
                case 4:
                    commercetoolsCart = _a.sent();
                    cart = CartMapper.mergeParentIdToCart(cart, commercetoolsCart, config);
                    response = __assign(__assign({}, originalResult), { statusCode: 200, body: JSON.stringify(cart) });
                    return [2 /*return*/, response];
                case 5: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
var findNewLineItem = function (cart, body) {
    var _a;
    return (_a = cart.lineItems.find(function (item) {
        return body === null || body === void 0 ? void 0 : body.lineItems.find(function (bodyItem) { var _a; return item.variant.sku === ((_a = bodyItem.variant) === null || _a === void 0 ? void 0 : _a.sku); });
    })) === null || _a === void 0 ? void 0 : _a.id;
};
