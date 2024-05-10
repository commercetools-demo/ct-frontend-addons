import { injectApprovalFlowApi } from './apis/ApprovalFlowApi';
import { injectApprovalRuleApi } from './apis/ApprovalRuleApi';
export var extractDependency = function (dependency, config) {
    if (config) {
        switch (dependency) {
            case 'ApprovalFlowApi':
                return injectApprovalFlowApi(config === null || config === void 0 ? void 0 : config.dependencies.BaseApi, config);
            case 'ApprovalRuleApi':
                return injectApprovalRuleApi(config === null || config === void 0 ? void 0 : config.dependencies.BaseApi, config);
            case 'CartMapper':
                return config === null || config === void 0 ? void 0 : config.dependencies.CartMapper;
        }
    }
};
