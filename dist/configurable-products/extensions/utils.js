import { injectCartApi } from './apis/CartApi';
export var extractDependency = function (dependency, config) {
    var _a;
    if ((_a = config === null || config === void 0 ? void 0 : config.dependencies) === null || _a === void 0 ? void 0 : _a[dependency]) {
        switch (dependency) {
            case 'CartApi':
                return injectCartApi(config === null || config === void 0 ? void 0 : config.dependencies.CartApi, config);
            case 'ProductApi':
                return config === null || config === void 0 ? void 0 : config.dependencies.ProductApi;
        }
    }
};
