import { DynamicPageContext, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { ApprovalFlow } from '../../types/approval/Flow';
export declare const injectFlowPageHandler: (request: Request, context: DynamicPageContext, config: Configuration) => Promise<{
    dynamicPageType: string;
    dataSourcePayload: {
        flow: ApprovalFlow;
    };
    pageMatchingPayload: {
        flow: ApprovalFlow;
    };
} | null> | undefined;
export declare const injectRulePageHandler: (request: Request, context: DynamicPageContext, config: Configuration) => Promise<{
    dynamicPageType: string;
    dataSourcePayload: {
        rule: import("@commercetools/platform-sdk").ApprovalRule;
    };
    pageMatchingPayload: {
        rule: import("@commercetools/platform-sdk").ApprovalRule;
    };
} | null> | undefined;
//# sourceMappingURL=index.d.ts.map