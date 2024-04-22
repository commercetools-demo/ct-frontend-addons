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
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useSuperuserContext } from '../../provider';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
var CartBrowser = function (_a) {
    var setCart = _a.setCart, createSuperuserCart = _a.createSuperuserCart, cartId = _a.cartId, className = _a.className, associates = _a.associates, translate = _a.translate;
    var superuserStatus = useSuperuserContext().superuserStatus;
    var handleCartSelection = function (e, cartId) { return __awaiter(void 0, void 0, void 0, function () {
        var cart, associate;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    (_a = e === null || e === void 0 ? void 0 : e.preventDefault) === null || _a === void 0 ? void 0 : _a.call(e);
                    (_b = e === null || e === void 0 ? void 0 : e.stopPropagation) === null || _b === void 0 ? void 0 : _b.call(e);
                    cart = (_c = superuserStatus === null || superuserStatus === void 0 ? void 0 : superuserStatus.carts) === null || _c === void 0 ? void 0 : _c.find(function (c) { return c.id === cartId; });
                    associate = associates === null || associates === void 0 ? void 0 : associates.find(function (a) { return a.accountId === (cart === null || cart === void 0 ? void 0 : cart.customerId); });
                    return [4 /*yield*/, setCart(cartId, associate === null || associate === void 0 ? void 0 : associate.email)];
                case 1:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCreateNewCart = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createSuperuserCart()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    if (!(superuserStatus === null || superuserStatus === void 0 ? void 0 : superuserStatus.isSuperuser)) {
        return null;
    }
    return (React.createElement(Popover, { className: "relative ".concat(className) }, function (_a) {
        var _b;
        var open = _a.open;
        return (React.createElement(React.Fragment, null,
            React.createElement(Popover.Button, { className: "\n                      ".concat(open ? '' : 'text-opacity-90', "\n                      text-accent-400 flex flex-row text-sm font-medium focus:outline-none") },
                !open && React.createElement(ChevronDownIcon, { className: "mt-1 h-4 w-4" }),
                open && React.createElement(ChevronUpIcon, { className: "mt-1 h-4 w-4" })),
            React.createElement(Transition, { as: Fragment, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1" },
                React.createElement(Popover.Panel, { className: "dark:bg-primary-400 dark:shadow-3xl absolute right-0 top-6 z-50 mr-8 mt-2 max-h-[300px] w-72 origin-top-right overflow-scroll rounded-sm bg-white p-2 shadow-sm ring-1 ring-black/5 focus:outline-none" }, (_b = superuserStatus === null || superuserStatus === void 0 ? void 0 : superuserStatus.carts) === null || _b === void 0 ? void 0 :
                    _b.map(function (cart) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                        return (React.createElement("button", { type: "button", className: "inline w-full p-2 text-left text-xs hover:bg-neutral-300 ".concat(cart.id === cartId ? 'bg-neutral-300' : ''), disabled: cart.id === cartId, key: cart.id, onClick: function (e) { return handleCartSelection(e, cart.id); } }, "".concat(translate('common.cart'), " ").concat(cart.origin === 'Quote' ? " - ".concat(translate('cart.createdFromAQuote'), " ") : '', " ").concat(cart.origin === 'Merchant' ? " - ".concat(translate('cart.createdByAMerchant'), " ") : ''), "".concat(translate('cart.with'), " ").concat(CurrencyHelpers.formatForCurrency(cart.totalPrice) || 0, " ").concat(translate('cart.total.price')),
                            ((_c = (_b = (_a = cart.createdBy) === null || _a === void 0 ? void 0 : _a.associate) === null || _b === void 0 ? void 0 : _b.obj) === null || _c === void 0 ? void 0 : _c.firstName) && ((_f = (_e = (_d = cart.createdBy) === null || _d === void 0 ? void 0 : _d.associate) === null || _e === void 0 ? void 0 : _e.obj) === null || _f === void 0 ? void 0 : _f.lastName) && (React.createElement(React.Fragment, null,
                                React.createElement("span", { className: "font-semibold" }, " ".concat(translate('cart.name'), ": ")), "".concat((_j = (_h = (_g = cart.createdBy) === null || _g === void 0 ? void 0 : _g.associate) === null || _h === void 0 ? void 0 : _h.obj) === null || _j === void 0 ? void 0 : _j.firstName, " ").concat((_m = (_l = (_k = cart.createdBy) === null || _k === void 0 ? void 0 : _k.associate) === null || _l === void 0 ? void 0 : _l.obj) === null || _m === void 0 ? void 0 : _m.lastName))),
                            ((_q = (_p = (_o = cart.createdBy) === null || _o === void 0 ? void 0 : _o.associate) === null || _p === void 0 ? void 0 : _p.obj) === null || _q === void 0 ? void 0 : _q.email) && (React.createElement(React.Fragment, null,
                                React.createElement("span", { className: "font-semibold" }, " ".concat(translate('cart.email'), ": ")), (_t = (_s = (_r = cart.createdBy) === null || _r === void 0 ? void 0 : _r.associate) === null || _s === void 0 ? void 0 : _s.obj) === null || _t === void 0 ? void 0 :
                                _t.email)),
                            cart.id === cartId && React.createElement(CheckIcon, { className: "ml-2 inline h-4 w-4" })));
                    }),
                    React.createElement("button", { type: "button", className: "inline w-full p-2 text-left text-xs hover:bg-neutral-300", onClick: handleCreateNewCart }, translate('cart.createNewCart'))))));
    }));
};
export default CartBrowser;
