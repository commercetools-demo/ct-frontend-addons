import { Request, DynamicPageContext, DynamicPageSuccessResult } from '@frontastic/extension-types';
import { Configuration } from '../../types.js';
import '../../../types-B2_pD38A.js';

declare const injectProductDetailPageHandler: (request: Request, context: DynamicPageContext, originalResult: DynamicPageSuccessResult, config: Configuration) => Promise<{
    dynamicPageType: string;
    dataSourcePayload: any;
    pageMatchingPayload: any;
}>;

export { injectProductDetailPageHandler };
