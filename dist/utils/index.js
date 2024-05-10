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
export var mergeExtensions = function (extensionRegirstry, addOnRegistry, config) {
    var actionNamespaces = mergeActions(extensionRegirstry, addOnRegistry, config);
    var dataSources = mergeDataSources(extensionRegirstry, addOnRegistry, config);
    var dynamicPageHandlers = mergeDynamicPageHandlers(extensionRegirstry, addOnRegistry, config);
    return __assign(__assign({}, extensionRegirstry), { actions: actionNamespaces, 'data-sources': dataSources, 'dynamic-page-handler': dynamicPageHandlers });
};
function mergeActions(extensionRegirstry, addOnRegistry, config) {
    var actionNamespaces = extensionRegirstry.actions || {};
    addOnRegistry.actions.forEach(function (hook) {
        var _a, _b;
        var _c;
        if (!actionNamespaces[hook.actionNamespace]) {
            actionNamespaces[hook.actionNamespace] = {};
        }
        if (hook.create) {
            var newAction = hook.hook(config);
            actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], (_a = {},
                _a[hook.action] = newAction,
                _a));
        }
        else if ((_c = actionNamespaces[hook.actionNamespace]) === null || _c === void 0 ? void 0 : _c[hook.action]) {
            var newAction = hook.hook(actionNamespaces[hook.actionNamespace][hook.action], config);
            actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], (_b = {},
                _b[hook.action] = newAction,
                _b));
        }
    });
    return actionNamespaces;
}
function mergeDataSources(extensionRegirstry, addOnRegistry, config) {
    var _a, _b;
    var dataSources = extensionRegirstry['data-sources'] || {};
    if (addOnRegistry.dataSources) {
        for (var ds in addOnRegistry.dataSources) {
            if (addOnRegistry.dataSources[ds].create) {
                var newDataSource = addOnRegistry.dataSources[ds].hook(config);
                dataSources = Object.assign({}, dataSources, (_a = {},
                    _a[ds] = newDataSource,
                    _a));
            }
            else if (dataSources[ds]) {
                var newDataSource = addOnRegistry.dataSources[ds].hook(dataSources[ds], config);
                dataSources = Object.assign({}, dataSources, (_b = {},
                    _b[ds] = newDataSource,
                    _b));
            }
        }
    }
    return dataSources;
}
function mergeDynamicPageHandlers(extensionRegirstry, addOnRegistry, config) {
    var _this = this;
    var originalDynamicPageHandler = extensionRegirstry['dynamic-page-handler'];
    return function (request, context) { return __awaiter(_this, void 0, void 0, function () {
        var originalResult, result, index, key;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, originalDynamicPageHandler(request, context)];
                case 1:
                    originalResult = _d.sent();
                    if (addOnRegistry.dynamicPageHandlers &&
                        originalResult &&
                        'dynamicPageType' in originalResult &&
                        ((_a = addOnRegistry.dynamicPageHandlers) === null || _a === void 0 ? void 0 : _a[originalResult.dynamicPageType])) {
                        return [2 /*return*/, addOnRegistry.dynamicPageHandlers[originalResult.dynamicPageType].hook(request, context, originalResult, config)];
                    }
                    if (!!originalResult) return [3 /*break*/, 6];
                    result = null;
                    index = 0;
                    _d.label = 2;
                case 2:
                    if (!(index < Object.keys(addOnRegistry.dynamicPageHandlers || {}).length)) return [3 /*break*/, 5];
                    key = Object.keys(addOnRegistry.dynamicPageHandlers || {})[index];
                    if (!((_c = (_b = addOnRegistry.dynamicPageHandlers) === null || _b === void 0 ? void 0 : _b[key]) === null || _c === void 0 ? void 0 : _c.create)) return [3 /*break*/, 4];
                    return [4 /*yield*/, addOnRegistry.dynamicPageHandlers[key].hook(request, context, config)];
                case 3:
                    result = _d.sent();
                    if (result) {
                        return [3 /*break*/, 5];
                    }
                    _d.label = 4;
                case 4:
                    index++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, result];
                case 6: return [2 /*return*/, originalResult];
            }
        });
    }); };
}
