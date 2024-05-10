import ApprovalRouter from '../ApprovalRouter';
export var injectFlowPageHandler = function (request, context, config) {
    if (ApprovalRouter.identifyFlowFrom(request)) {
        return ApprovalRouter.loadFlowFor(request, context.frontasticContext, config).then(function (flow) {
            if (flow) {
                return {
                    dynamicPageType: 'frontastic/approval-flow-page',
                    dataSourcePayload: {
                        flow: flow,
                    },
                    pageMatchingPayload: {
                        flow: flow,
                    },
                };
            }
            return null;
        });
    }
};
export var injectRulePageHandler = function (request, context, config) {
    if (ApprovalRouter.identifyRuleFrom(request)) {
        return ApprovalRouter.loadRuleFor(request, context.frontasticContext, config).then(function (rule) {
            if (rule) {
                return {
                    dynamicPageType: 'frontastic/approval-rule-page',
                    dataSourcePayload: {
                        rule: rule,
                    },
                    pageMatchingPayload: {
                        rule: rule,
                    },
                };
            }
            return null;
        });
    }
};
