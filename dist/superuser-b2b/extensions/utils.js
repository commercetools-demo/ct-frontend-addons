import { injectCartApi } from './apis/CartApi';
export var extractDependency = function (dependency, config) {
    var _a;
    if ((_a = config === null || config === void 0 ? void 0 : config.dependencies) === null || _a === void 0 ? void 0 : _a[dependency]) {
        switch (dependency) {
            case 'BusinessUnitApi':
                return config === null || config === void 0 ? void 0 : config.dependencies.BusinessUnitApi;
            case 'CartApi':
                return injectCartApi(config.dependencies.CartApi);
            case 'CartMapper':
                return config === null || config === void 0 ? void 0 : config.dependencies.CartMapper;
            case 'EmailApiFactory':
                return config === null || config === void 0 ? void 0 : config.dependencies.EmailApiFactory;
        }
    }
};
