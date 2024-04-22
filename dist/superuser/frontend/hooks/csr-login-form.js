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
import { useState } from 'react';
import { mutate } from 'swr';
export var useCSRLoginForm = function (_a) {
    var sdk = _a.sdk, data = _a.data, setError = _a.setError, formatMessage = _a.formatMessage, onLogin = _a.onLogin;
    //CSR
    var _b = useState(false), isCSRLogin = _b[0], setIsCSRLogin = _b[1];
    var csrErrorHandler = function (error) {
        if (error.message.includes('CSR')) {
            setIsCSRLogin(true);
            setError(formatMessage({ id: 'csr.login', defaultMessage: "Please enter the customer's email address" }));
            return;
        }
    };
    //login user
    var loginUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var extensions, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    extensions = sdk.composableCommerce;
                    return [4 /*yield*/, extensions.account.login({ email: data.email, password: data.password, remember: data.rememberMe })];
                case 1:
                    response = _a.sent();
                    mutate('/action/account/getAccount');
                    mutate('/action/cart/getCart');
                    mutate('/action/wishlist/getWishlist');
                    if (response.isError) {
                        throw response.error;
                    }
                    if (response.data.accountId)
                        onLogin === null || onLogin === void 0 ? void 0 : onLogin();
                    else {
                        setError(formatMessage({ id: 'auth.wrong', defaultMessage: 'Wrong email address or password' }));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    csrErrorHandler(err_1);
                    setError(formatMessage({ id: 'wentWrong', defaultMessage: 'Sorry. Something went wrong..' }));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var loginCSR = function (email, password, impersonatedCustomerEmail) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = {
                        email: email,
                        password: password,
                        impersonatedCustomerEmail: impersonatedCustomerEmail,
                    };
                    return [4 /*yield*/, sdk.callAction({ actionName: 'account/loginCSR', payload: payload })];
                case 1:
                    res = _a.sent();
                    mutate('/action/account/getAccount');
                    mutate('/action/cart/getCart');
                    mutate('/action/wishlist/getWishlist');
                    if (res.isError) {
                        throw res.error;
                    }
                    else {
                        return [2 /*return*/, res.data];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var login = function () {
        if (isCSRLogin) {
            loginCSR(data.email, data.password, data.impersonatedCustomerEmail);
        }
        else {
            loginUser();
        }
    };
    return {
        isCSRLogin: isCSRLogin,
        csrErrorHandler: csrErrorHandler,
        login: login,
    };
};
