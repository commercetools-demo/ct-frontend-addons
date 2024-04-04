import { Request, DynamicPageContext, DynamicPageSuccessResult } from '@frontastic/extension-types';
import { Configuration } from '../../types.cjs';
import '../../../types-Cz8jhXRC.cjs';

declare const injectProductDetailPageHandler: (request: Request, context: DynamicPageContext, originalResult: DynamicPageSuccessResult, config: Configuration) => Promise<{
    dynamicPageType: string;
    dataSourcePayload: any;
    pageMatchingPayload: any;
}>;

export { injectProductDetailPageHandler };
