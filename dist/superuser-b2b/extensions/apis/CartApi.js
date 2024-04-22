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
export var injectCartApi = function (BaseCartApi) {
    return /** @class */ (function (_super) {
        __extends(CartApi, _super);
        function CartApi() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.createSuperuserCart = function (storeKey, superuser) { return __awaiter(_this, void 0, void 0, function () {
                var locale, cartDraft;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCommercetoolsLocal()];
                        case 1:
                            locale = _a.sent();
                            cartDraft = {
                                currency: locale.currency,
                                country: locale.country,
                                locale: locale.language,
                                store: {
                                    key: storeKey,
                                    typeId: 'store',
                                },
                                inventoryMode: 'ReserveOnOrder',
                            };
                            if (!superuser) {
                                cartDraft.customerId = this.accountId;
                            }
                            else {
                                cartDraft.origin = 'Merchant';
                            }
                            return [4 /*yield*/, this.associateEndpoints(this.accountId, this.businessUnitKey)
                                    .carts()
                                    .post({
                                    queryArgs: {
                                        expand: [
                                            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
                                            'discountCodes[*].discountCode',
                                            'paymentInfo.payments[*]',
                                        ],
                                    },
                                    body: cartDraft,
                                })
                                    .execute()
                                    .then(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.buildCartWithAvailableShippingMethods(response.body, locale)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                }); }); })
                                    .catch(function (error) {
                                    throw new Error(error.message);
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            }); };
            _this.setOriginalCustomerData = function (comercetoolsCart, email, customType, originalEmailFieldKey) { return __awaiter(_this, void 0, void 0, function () {
                var cartUpdate;
                var _a;
                return __generator(this, function (_b) {
                    cartUpdate = {
                        version: +comercetoolsCart.version,
                        actions: [
                            {
                                action: 'setCustomType',
                                type: {
                                    typeId: 'type',
                                    key: customType,
                                },
                                fields: (_a = {},
                                    _a[originalEmailFieldKey] = email,
                                    _a),
                            },
                        ],
                    };
                    return [2 /*return*/, this.requestBuilder()
                            .carts()
                            .withId({ ID: comercetoolsCart.id })
                            .post({ body: cartUpdate })
                            .execute()
                            .then(function (response) { return response.body; })
                            .catch(function (error) {
                            throw new Error(error.message);
                        })];
                });
            }); };
            _this.setSuperUserEmailOnOrder = function (orderId, orderVersion, originalOwnerEmail, superUserEmail, customType, customField) { return __awaiter(_this, void 0, void 0, function () {
                var orderUpdate;
                var _a;
                return __generator(this, function (_b) {
                    orderUpdate = {
                        version: +orderVersion,
                        actions: [
                            {
                                action: 'setCustomType',
                                type: {
                                    typeId: 'type',
                                    key: customType,
                                },
                                fields: (_a = {},
                                    _a[customField] = superUserEmail,
                                    _a),
                            },
                        ],
                    };
                    if (originalOwnerEmail) {
                        orderUpdate.actions.push({
                            action: 'setCustomerEmail',
                            email: originalOwnerEmail,
                        });
                    }
                    return [2 /*return*/, this.requestBuilder()
                            .orders()
                            .withId({ ID: orderId })
                            .post({ body: orderUpdate })
                            .execute()
                            .then(function (response) { return response.body; })
                            .catch(function (error) {
                            throw new Error(error.message);
                        })];
                });
            }); };
            _this.setOriginalCustomerDataOnCart = function (cartId, cartversion, originalOwnerEmail) { return __awaiter(_this, void 0, void 0, function () {
                var cartUpdate;
                return __generator(this, function (_a) {
                    cartUpdate = {
                        version: +cartversion,
                        actions: [
                            {
                                action: 'setCustomerEmail',
                                email: originalOwnerEmail,
                            },
                        ],
                    };
                    return [2 /*return*/, this.requestBuilder()
                            .carts()
                            .withId({ ID: cartId })
                            .post({ body: cartUpdate })
                            .execute()
                            .then(function (response) { return response.body; })
                            .catch(function (error) {
                            throw new Error(error.message);
                        })];
                });
            }); };
            return _this;
        }
        CartApi.prototype.getByPureId = function (cartId) {
            return __awaiter(this, void 0, void 0, function () {
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
                                    return _this.buildCartWithAvailableShippingMethods(response.body, locale);
                                })
                                    .catch(function (error) {
                                    throw new Error(error.message);
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        CartApi.prototype.getCommercetoolsCartById = function (cartId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requestBuilder()
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
                                return response.body;
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        CartApi.prototype.getCommercetoolsOrderById = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requestBuilder()
                                .orders()
                                .withId({
                                ID: orderId,
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
                                return response.body;
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        CartApi.prototype.getAllSuperuserCartsInStore = function (storeKey) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            where = ["cartState=\"Active\"", "store(key=\"".concat(storeKey, "\")"), "businessUnit(key=\"".concat(this.businessUnitKey, "\")")];
                            return [4 /*yield*/, this.requestBuilder()
                                    .carts()
                                    .get({
                                    queryArgs: {
                                        limit: 15,
                                        expand: [
                                            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
                                            'discountCodes[*].discountCode',
                                            'paymentInfo.payments[*]',
                                            'createdBy.associate',
                                        ],
                                        where: where,
                                        sort: 'createdAt desc',
                                    },
                                })
                                    .execute()
                                    .then(function (response) {
                                    if (response.body.count >= 1) {
                                        return response.body.results;
                                    }
                                    return [];
                                })
                                    .catch(function (error) {
                                    throw new Error(error.message);
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return CartApi;
    }(BaseCartApi));
};
