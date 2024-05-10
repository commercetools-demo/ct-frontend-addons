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
import { getCurrency, getDistributionChannelId, getLocale, getPath, getStoreId, getStoreKey, getSupplyChannelId } from '../../../utils/request';
import { extractDependency } from '../utils';
var ProductRouter = /** @class */ (function () {
    function ProductRouter() {
    }
    var _a;
    _a = ProductRouter;
    ProductRouter.getBundles = function (request, frontasticContext, product, config) { return __awaiter(void 0, void 0, void 0, function () {
        var urlMatches, ProductApi, productIds, variants, uniqueIds, productApi, products;
        var _this = _a;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    urlMatches = (_b = getPath(request)) === null || _b === void 0 ? void 0 : _b.match(config.props.product.productDetailsPageRegex);
                    ProductApi = extractDependency('ProductApi', config);
                    if (!ProductApi) {
                        throw new Error('ProductApi not found');
                    }
                    productIds = [];
                    if (!urlMatches) return [3 /*break*/, 2];
                    variants = product.variants;
                    if (!variants.length) return [3 /*break*/, 2];
                    variants.forEach(function (variant) {
                        // Store product IDs in referencedProductsMapping for each reference
                        var attribute = config.props.product.attributeName;
                        productIds.push.apply(productIds, _this.getProductIdsFromReferencedAttribute(attribute, variant));
                    });
                    uniqueIds = productIds.filter(function (item, index, self) { return self.indexOf(item) === index; });
                    if (!uniqueIds.length) return [3 /*break*/, 2];
                    productApi = new ProductApi(frontasticContext, getLocale(request), getCurrency(request), request);
                    return [4 /*yield*/, productApi
                            .query({
                            productIds: uniqueIds,
                            storeKey: getStoreKey(request),
                            storeId: getStoreId(request),
                            distributionChannelId: getDistributionChannelId(request),
                            supplyChannelId: getSupplyChannelId(request),
                        })
                            .then(function (result) { return result.items; })];
                case 1:
                    products = _c.sent();
                    // return each product set in a map
                    return [2 /*return*/, products];
                case 2: return [2 /*return*/, []];
            }
        });
    }); };
    ProductRouter.getProductIdsFromReferencedAttribute = function (attributeName, variant) {
        var _b;
        var attributeValue = (_b = variant.attributes) === null || _b === void 0 ? void 0 : _b[attributeName];
        if (attributeValue && Array.isArray(attributeValue)) {
            return attributeValue === null || attributeValue === void 0 ? void 0 : attributeValue.map(function (item) { return item.id; });
        }
        else if (attributeValue) {
            return [attributeValue.id];
        }
        return [];
    };
    return ProductRouter;
}());
export { ProductRouter };
