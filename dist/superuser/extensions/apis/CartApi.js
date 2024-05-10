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
import { ExternalError } from '../../../utils/Errors';
export var injectCartApi = function (BaseCartApi, CartMapper) {
    return /** @class */ (function (_super) {
        __extends(CartApi, _super);
        function CartApi() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.changeLineItemPrice = function (cart, lineItemId, externalPrice) { return __awaiter(_this, void 0, void 0, function () {
                var locale, cartUpdate, commercetoolsCart;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            cartUpdate = {
                                version: +cart.cartVersion,
                                actions: [
                                    {
                                        action: 'setLineItemPrice',
                                        lineItemId: lineItemId,
                                        externalPrice: externalPrice,
                                    },
                                ],
                            };
                            return [4 /*yield*/, this.updateCart(cart.cartId, cartUpdate, locale)];
                        case 2:
                            commercetoolsCart = _a.sent();
                            return [2 /*return*/, this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale)];
                    }
                });
            }); };
            _this.getOrderByID = function (id) { return __awaiter(_this, void 0, void 0, function () {
                var commercetoolsOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requestBuilder()
                                .orders()
                                .withId({ ID: id })
                                .get({
                                queryArgs: {
                                    expand: 'custom.type',
                                },
                            })
                                .execute()
                                .then(function (response) { return response.body; })
                                .catch(function (error) {
                                throw new ExternalError({ status: error.code, message: error.message, body: error.body });
                            })];
                        case 1:
                            commercetoolsOrder = _a.sent();
                            return [2 /*return*/, commercetoolsOrder];
                    }
                });
            }); };
            _this.getOrders = function (account) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requestBuilder()
                                .orders()
                                .get({
                                queryArgs: {
                                    expand: [
                                        'lineItems[*].discountedPrice.includedDiscounts[*].discount',
                                        'discountCodes[*].discountCode',
                                        'paymentInfo.payments[*]',
                                    ],
                                    where: "customerId=\"".concat(account.accountId, "\""),
                                    sort: 'createdAt desc',
                                },
                            })
                                .execute()
                                .then(function (response) {
                                return response.body.results.map(function (order) { return CartMapper.commercetoolsOrderToOrder(order); });
                            })
                                .catch(function (error) {
                                throw new ExternalError({ status: error.code, message: error.message, body: error.body });
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); };
            _this.setSuperUserEmailOnOrder = function (order, superUserEmail, customType, customField) { return __awaiter(_this, void 0, void 0, function () {
                var orderObj, fields, orderUpdate;
                var _a;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.getOrderByID(order.cartId)];
                        case 1:
                            orderObj = _f.sent();
                            fields = {};
                            if (((_d = (_c = (_b = orderObj.custom) === null || _b === void 0 ? void 0 : _b.type) === null || _c === void 0 ? void 0 : _c.obj) === null || _d === void 0 ? void 0 : _d.key) === customType) {
                                fields = __assign({}, (_e = orderObj.custom) === null || _e === void 0 ? void 0 : _e.fields);
                            }
                            orderUpdate = {
                                version: +order.orderVersion,
                                actions: [
                                    {
                                        action: 'setCustomType',
                                        type: {
                                            typeId: 'type',
                                            key: customType,
                                        },
                                        fields: __assign(__assign({}, fields), (_a = {}, _a[customField] = superUserEmail, _a)),
                                    },
                                ],
                            };
                            return [4 /*yield*/, this.requestBuilder()
                                    .orders()
                                    .withId({ ID: order.cartId })
                                    .post({ body: orderUpdate })
                                    .execute()
                                    .then(function (response) { return CartMapper.commercetoolsOrderToOrder(response.body); })
                                    .catch(function (error) {
                                    throw new ExternalError({ status: error.code, message: error.message, body: error.body });
                                })];
                        case 2:
                            order = _f.sent();
                            return [2 /*return*/, order];
                    }
                });
            }); };
            _this.getActiveCartById = function (cartId) { return __awaiter(_this, void 0, void 0, function () {
                var locale;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            return [4 /*yield*/, this.requestBuilder()
                                    .carts()
                                    .withId({
                                    ID: cartId,
                                })
                                    .get({
                                    queryArgs: {
                                        limit: 1,
                                        expand: [
                                            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
                                            'discountCodes[*].discountCode',
                                            'paymentInfo.payments[*]',
                                        ],
                                    },
                                })
                                    .execute()
                                    .then(function (response) {
                                    if (response.body.cartState !== 'Active') {
                                        throw new Error("Cart ".concat(cartId, " is not active."));
                                    }
                                    return _this.buildCartWithAvailableShippingMethods(response.body, locale);
                                })
                                    .catch(function (error) {
                                    throw new ExternalError({ status: error.code, message: error.message, body: error.body });
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            }); };
            return _this;
        }
        return CartApi;
    }(BaseCartApi));
};
