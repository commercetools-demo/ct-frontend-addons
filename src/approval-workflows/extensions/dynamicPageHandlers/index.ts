import { DynamicPageContext, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import ApprovalRouter from '../ApprovalRouter';
import { ApprovalFlow } from '../../types/approval/Flow';
import { ApprovalRule } from '../../types/approval/Rule';

export const injectFlowPageHandler = (request: Request, context: DynamicPageContext, config: Configuration) => {
  if (ApprovalRouter.identifyFlowFrom(request)) {
    return ApprovalRouter.loadFlowFor(request, context.frontasticContext!, config).then((flow: ApprovalFlow | null) => {
      if (flow) {
        return {
          dynamicPageType: 'frontastic/approval-flow-page',
          dataSourcePayload: {
            flow,
          },
          pageMatchingPayload: {
            flow,
          },
        };
      }

      return null;
    });
  }
};


export const injectRulePageHandler = (request: Request, context: DynamicPageContext, config: Configuration) => {
  if (ApprovalRouter.identifyRuleFrom(request)) {
    return ApprovalRouter.loadRuleFor(request, context.frontasticContext!, config).then((rule: ApprovalRule | null) => {
      if (rule) {
        return {
          dynamicPageType: 'frontastic/approval-rule-page',
          dataSourcePayload: {
            rule,
          },
          pageMatchingPayload: {
            rule,
          },
        };
      }

      return null;
    });
  }
};
