import { Context, Request } from '@frontastic/extension-types';
import { getApprovalApi } from './utils/getApprovalApi';
import { ApprovalFlow } from '../types/approval/Flow';
import { extractDependency } from './utils';
import { Configuration } from '../types';
import { getPath } from '../../utils/request';
import { ApprovalRule } from '../types/approval/Rule';

const flowRegex = /\/approval-flow\/([^\/]+)/;
const ruleRegex = /\/approval-rule\/([^\/]+)/;

export default class ApprovalRouter {
  static identifyRuleFrom(request: Request) {
    if (getPath(request)?.match(ruleRegex)) {
      return true;
    }

    return false;
  }

  static identifyFlowFrom(request: Request) {
    if (getPath(request)?.match(flowRegex)) {
      return true;
    }

    return false;
  }

  static loadFlowFor = async (
    request: Request,
    frontasticContext: Context,
    configuration: Configuration,
  ): Promise<ApprovalFlow | null> => {
    const ApprovalFlowApi = extractDependency('ApprovalFlowApi', configuration);
    const approvalFlowApi = getApprovalApi(request, frontasticContext, ApprovalFlowApi);

    const urlMatches = getPath(request)?.match(flowRegex);

    if (urlMatches) {
      return await approvalFlowApi.get(urlMatches[1]);
    }

    return null;
  };

  static loadRuleFor = async (
    request: Request,
    frontasticContext: Context,
    configuration: Configuration,
  ): Promise<ApprovalRule | null> => {
    const ApprovalRuleApi = extractDependency('ApprovalRuleApi', configuration);
    const approvalRuleApi = getApprovalApi(request, frontasticContext, ApprovalRuleApi);

    const urlMatches = getPath(request)?.match(ruleRegex);

    if (urlMatches) {
      return await approvalRuleApi.get(urlMatches[1]);
    }

    return null;
  };
}
