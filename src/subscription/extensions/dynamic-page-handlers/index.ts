import { DynamicPageContext, DynamicPageSuccessResult, Request } from '@frontastic/extension-types';
import { ProductRouter } from '../utils/product-router';
import { Configuration } from '../../types';

export const injectProductDetailPageHandler = (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration
) => {
    const product = originalResult.dataSourcePayload.product;
    return ProductRouter.getBundles(request, context.frontasticContext!, product, config).then(
        ({ subscriptions }) => {
          return {
            dynamicPageType: originalResult.dynamicPageType,
            dataSourcePayload: {
              ...originalResult.dataSourcePayload,
              subscriptions,
            },
            pageMatchingPayload: originalResult.pageMatchingPayload,
          };
        },
      );
};
