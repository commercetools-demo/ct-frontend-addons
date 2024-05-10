import { injectAccountApi } from "./apis/AccountApi";
import { injectCartApi } from "./apis/CartApi";
import { injectAccountMapper } from "./mappers/AccountMapper";
import { injectCartMapper } from "./mappers/CartMapper";
export var extractDependency = function (dependency, dependencies) {
    if (dependencies === null || dependencies === void 0 ? void 0 : dependencies[dependency]) {
        switch (dependency) {
            case 'CartApi':
                return injectCartApi(dependencies.CartApi, extractDependency('CartMapper', dependencies));
            case 'AccountApi':
                return injectAccountApi(dependencies.AccountApi, extractDependency('AccountMapper', dependencies));
            case 'AccountMapper':
                return injectAccountMapper(dependencies.AccountMapper);
            case 'CartMapper':
                return injectCartMapper(dependencies.CartMapper);
        }
    }
};
