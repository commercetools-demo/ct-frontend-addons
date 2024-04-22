import { injectCartApi } from "./apis/CartApi";
export var extractDependency = function (dependency, dependencies) {
    if (dependencies === null || dependencies === void 0 ? void 0 : dependencies[dependency]) {
        return injectCartApi(dependencies[dependency]);
    }
};
