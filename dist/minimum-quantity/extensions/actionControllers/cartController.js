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
import { getCurrency, getLocale } from '../../../utils/request';
export var addToCart = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, cart, CartApi, response_1, cartApi, changes_1, res, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 3];
                    cart = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    CartApi = extractDependency('CartApi', config === null || config === void 0 ? void 0 : config.dependencies);
                    if (!CartApi) {
                        response_1 = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: CartApi'),
                        };
                        return [2 /*return*/, response_1];
                    }
                    cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
                    changes_1 = [];
                    cart.lineItems.forEach(function (lineItem) {
                        var _a, _b, _c;
                        // Find the 'minimo' attribute within the line item's attributes.
                        var minimoAttribute = (_b = (_a = lineItem.variant) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b[((_c = config === null || config === void 0 ? void 0 : config.props) === null || _c === void 0 ? void 0 : _c.attributeName) || ''];
                        // Ensure the 'minimo' attribute exists and has a valid integer value.
                        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
                            // Check if the quantity of the line item is less than the 'minimo' value.
                            if (lineItem.count < minimoAttribute) {
                                // Add an action to update the quantity of the line item to the 'minimo' value.
                                changes_1.push({
                                    lineItemId: lineItem.lineItemId,
                                    quantity: minimoAttribute,
                                });
                            }
                        }
                    });
                    return [4 /*yield*/, cartApi.addMinimumQuantityToCart(cart, changes_1)];
                case 2:
                    res = _a.sent();
                    response = __assign(__assign({}, originalResult), { statusCode: 200, body: JSON.stringify(res) });
                    return [2 /*return*/, response];
                case 3: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
export var updateLineItem = function (originalCb, config) {
    return function (request, actionContext) { return __awaiter(void 0, void 0, void 0, function () {
        var originalResult, cart, CartApi, response_2, cartApi, changes_2, res, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, originalCb(request, actionContext)];
                case 1:
                    originalResult = _a.sent();
                    if (!(originalResult.statusCode === 200 && (originalResult === null || originalResult === void 0 ? void 0 : originalResult.body))) return [3 /*break*/, 3];
                    cart = JSON.parse(originalResult === null || originalResult === void 0 ? void 0 : originalResult.body);
                    CartApi = extractDependency('CartApi', config === null || config === void 0 ? void 0 : config.dependencies);
                    if (!CartApi) {
                        response_2 = {
                            statusCode: 401,
                            body: JSON.stringify('Dependencies not provided: CartApi'),
                        };
                        return [2 /*return*/, response_2];
                    }
                    cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
                    changes_2 = [];
                    cart.lineItems.forEach(function (lineItem) {
                        var _a, _b, _c;
                        // Find the 'minimo' attribute within the line item's attributes.
                        var minimoAttribute = (_b = (_a = lineItem.variant) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b[((_c = config === null || config === void 0 ? void 0 : config.props) === null || _c === void 0 ? void 0 : _c.attributeName) || ''];
                        // Ensure the 'minimo' attribute exists and has a valid integer value.
                        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
                            // Check if the quantity of the line item is less than the 'minimo' value.
                            if (lineItem.count < minimoAttribute) {
                                // Add an action to update the quantity of the line item to the 'minimo' value.
                                changes_2.push({
                                    lineItemId: lineItem.lineItemId,
                                    quantity: minimoAttribute,
                                });
                            }
                        }
                    });
                    return [4 /*yield*/, cartApi.addMinimumQuantityToCart(cart, changes_2)];
                case 2:
                    res = _a.sent();
                    response = __assign(__assign({}, originalResult), { statusCode: 200, body: JSON.stringify(res) });
                    return [2 /*return*/, response];
                case 3: return [2 /*return*/, originalResult];
            }
        });
    }); };
};
