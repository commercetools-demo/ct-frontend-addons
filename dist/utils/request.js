import parseQueryParams from './parseRequestParams';
export var getPath = function (request) {
    var _a;
    return (_a = getHeader(request, 'frontastic-path')) !== null && _a !== void 0 ? _a : request.query.path;
};
export var getLocale = function (request) {
    var _a, _b;
    var locale = (_a = getHeader(request, 'frontastic-locale')) !== null && _a !== void 0 ? _a : request.query.locale;
    if (locale !== undefined) {
        return (_b = getHeader(request, 'frontastic-locale')) !== null && _b !== void 0 ? _b : request.query.locale;
    }
    throw new Error("Locale is missing from request ".concat(request));
};
export var getCurrency = function (request) {
    var _a, _b;
    var currency = (_a = getHeader(request, 'frontastic-currency')) !== null && _a !== void 0 ? _a : request.query['currency'];
    if (currency !== undefined) {
        return (_b = getHeader(request, 'frontastic-currency')) !== null && _b !== void 0 ? _b : request.query['currency'];
    }
    return 'USD'; //hardcoded for testing
    throw new Error("Currency is missing from request ".concat(request));
};
var getHeader = function (request, header) {
    if ((request === null || request === void 0 ? void 0 : request.headers) && header in request.headers) {
        // @ts-ignore
        var foundHeader = request.headers[header];
        if (Array.isArray(foundHeader)) {
            return foundHeader[0];
        }
        return foundHeader;
    }
    return null;
};
export var getBusinessUnitKey = function (request) {
    var _a;
    if (request !== undefined) {
        var businessUnitKey = parseQueryParams(request.query).businessUnitKey;
        return businessUnitKey !== null && businessUnitKey !== void 0 ? businessUnitKey : (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.businessUnitKey;
    }
    return null;
};
export var getStoreKey = function (request) {
    var _a;
    if (request !== undefined) {
        var storeKey = parseQueryParams(request.query).storeKey;
        return storeKey !== null && storeKey !== void 0 ? storeKey : (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.storeKey;
    }
    return null;
};
export var getStoreId = function (request) {
    var _a;
    if (request !== undefined) {
        var storeId = parseQueryParams(request.query).storeId;
        return storeId !== null && storeId !== void 0 ? storeId : (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.storeId;
    }
    return null;
};
export var getDistributionChannelId = function (request) {
    var _a;
    if (request !== undefined) {
        var distributionChannelId = parseQueryParams(request.query).distributionChannelId;
        return distributionChannelId !== null && distributionChannelId !== void 0 ? distributionChannelId : (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.distributionChannelId;
    }
    return null;
};
export var getSupplyChannelId = function (request) {
    var _a;
    if (request !== undefined) {
        var supplyChannelId = parseQueryParams(request.query).supplyChannelId;
        return supplyChannelId !== null && supplyChannelId !== void 0 ? supplyChannelId : (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.supplyChannelId;
    }
    return null;
};
export function fetchAccountFromSession(request) {
    var _a;
    if (((_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.account) !== undefined) {
        return request.sessionData.account;
    }
    return undefined;
}
export function fetchCartIdFromSession(request) {
    var _a;
    if (((_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.cartId) !== undefined) {
        return request.sessionData.cartId;
    }
    return undefined;
}
export var getSuperuserFromSession = function (request) {
    var _a;
    return (_a = request.sessionData) === null || _a === void 0 ? void 0 : _a.superuser;
};
