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
import { ProductRouter } from '../utils/product-router';
export var injectProductDetailPageHandler = function (request, context, originalResult, config) {
    var product = originalResult.dataSourcePayload.product;
    return ProductRouter.getBundles(request, context.frontasticContext, product, config).then(function (configurableComponents) {
        return {
            dynamicPageType: originalResult.dynamicPageType,
            dataSourcePayload: __assign(__assign({}, originalResult.dataSourcePayload), { configurableComponents: configurableComponents }),
            pageMatchingPayload: originalResult.pageMatchingPayload,
        };
    });
};
