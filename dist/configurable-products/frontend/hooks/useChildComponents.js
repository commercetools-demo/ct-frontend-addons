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
import { useBundledItemsContext } from '../providers/bundled-items';
export var childComponentsAttributeName = 'bundled_components';
var useChildComponents = function () {
    var cart = useBundledItemsContext().cart;
    var swrBundleMiddleware = function (useSWRNext) { return function (key, fetcher, config) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var swr = useSWRNext(key, fetcher, config);
        if (swr.error || !swr.data)
            return swr;
        return __assign(__assign({}, swr), { data: bundleComponentsIntoLineItems(swr.data) });
    }; };
    var getBundledPrice = function (lineItem) {
        var _a, _b, _c, _d, _e, _f, _g;
        var originalLineItem = (_a = cart === null || cart === void 0 ? void 0 : cart.lineItems) === null || _a === void 0 ? void 0 : _a.find(function (li) { return li.lineItemId === lineItem.id; });
        if (!originalLineItem)
            return { price: 0, discountedPrice: 0 };
        var discountedPrice = (_c = (_b = originalLineItem.variant) === null || _b === void 0 ? void 0 : _b.discountedPrice) === null || _c === void 0 ? void 0 : _c.centAmount;
        if (!((_e = (_d = originalLineItem.variant) === null || _d === void 0 ? void 0 : _d.attributes) === null || _e === void 0 ? void 0 : _e[childComponentsAttributeName])) {
            return { price: 0, discountedPrice: 0 };
        }
        var bundleCentAmount = ((_g = (_f = originalLineItem.variant) === null || _f === void 0 ? void 0 : _f.attributes) === null || _g === void 0 ? void 0 : _g[childComponentsAttributeName]).reduce(function (prev, curr) { var _a; return prev + (((_a = curr.price) === null || _a === void 0 ? void 0 : _a.centAmount) || 0); }, 0);
        return {
            price: bundleCentAmount,
            discountedPrice: discountedPrice ? discountedPrice + bundleCentAmount : undefined,
        };
    };
    var bundleComponentsIntoLineItems = function (cart) {
        var lineItems = cart.lineItems;
        if (cart && (lineItems === null || lineItems === void 0 ? void 0 : lineItems.length)) {
            var bundles_1 = lineItems === null || lineItems === void 0 ? void 0 : lineItems.filter(function (item) { return !!item.parentId; });
            var items = lineItems === null || lineItems === void 0 ? void 0 : lineItems.filter(function (item) { return !item.parentId; });
            return __assign(__assign({}, cart), { lineItems: items === null || items === void 0 ? void 0 : items.map(function (item) {
                    var _a, _b;
                    if (!((_a = item.variant) === null || _a === void 0 ? void 0 : _a.attributes)) {
                        item = __assign(__assign({}, item), { variant: __assign(__assign({}, item.variant), { sku: item.sku, attributes: {} }) });
                    }
                    var itemBundles = bundles_1 === null || bundles_1 === void 0 ? void 0 : bundles_1.filter(function (bundle) { return bundle.parentId === item.lineItemId; });
                    if ((_b = item.variant) === null || _b === void 0 ? void 0 : _b.attributes) {
                        item.variant.attributes[childComponentsAttributeName] = [];
                    }
                    itemBundles === null || itemBundles === void 0 ? void 0 : itemBundles.forEach(function (bundle) {
                        var _a, _b;
                        (_b = (_a = item.variant) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b[childComponentsAttributeName].push(bundle);
                    });
                    return __assign({}, item);
                }) });
        }
        return cart;
    };
    return {
        bundleComponentsIntoLineItems: bundleComponentsIntoLineItems,
        getBundledPrice: getBundledPrice,
        swrBundleMiddleware: swrBundleMiddleware,
    };
};
export default useChildComponents;
