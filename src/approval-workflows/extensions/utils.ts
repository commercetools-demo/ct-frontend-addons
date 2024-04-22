import { Configuration, Dependencies } from '../types';
import { injectApprovalFlowApi } from './apis/ApprovalFlowApi';
import { injectApprovalRuleApi } from './apis/ApprovalRuleApi';

export const extractDependency = (dependency: keyof Dependencies, config?: Configuration): any => {
  if (config) {
    switch (dependency) {
      case 'ApprovalFlowApi':
        return injectApprovalFlowApi(config?.dependencies.BaseApi, config);
      case 'ApprovalRuleApi':
        return injectApprovalRuleApi(config?.dependencies.BaseApi, config);
      case 'CartMapper':
        return config?.dependencies.CartMapper
    }
  }
};


