import { DynamicPageContext, DynamicPageSuccessResult, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';
export declare const injectProductDetailPageHandler: (request: Request, context: DynamicPageContext, originalResult: DynamicPageSuccessResult, config: Configuration) => Promise<{
    dynamicPageType: string;
    dataSourcePayload: any;
    pageMatchingPayload: any;
}>;
//# sourceMappingURL=index.d.ts.map