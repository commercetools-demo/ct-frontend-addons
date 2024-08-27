import { Context, DynamicPageContext, DynamicPageSuccessResult, Request } from '@frontastic/extension-types';
import { Configuration } from '../types';
import { getCurrency, getLocale, getPath } from '../../../utils/request';
import { extractDependency } from '../utils';
import { CategoryRouter } from '../../../utils/routers/CategoryRouter';
import { ProductRouter } from '../../../configurable-products/extensions/utils/product-router';
import { ProductPaginatedResult } from '../../../product-search/types/ProductQuery';
import { CategoryQuery } from '@commercetools/frontend-domain-types/query';
import { ProductQueryFactory } from '../../../product-search/extensions/utils/ProductQueryFactory';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';

export const injectCategoryPageHandler = (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration,
) => {
  const loadFor = async (
    request: Request,
    commercetoolsFrontendContext: Context,
  ): Promise<{ result: ProductPaginatedResult | null; category: Category | null }> => {
    const ProductApi = extractDependency('ProductApi', config);
    const productApi = new ProductApi(commercetoolsFrontendContext, getLocale(request), getCurrency(request), request);

    // We are using the last subdirectory of the path to identify the category slug
    const urlMatches = getPath(request)?.match(/[^/]+(?=\/$|$)/);

    if (urlMatches) {
      const categoryQuery: CategoryQuery = {
        slug: urlMatches[0],
      };

      const categoryQueryResult = await productApi.queryCategories(categoryQuery);

      if (categoryQueryResult.items.length == 0) return { result: null, category: null };
      request.query.category = (categoryQueryResult.items[0] as Category).categoryId;

      const productQuery = ProductQueryFactory.queryFromParams({
        ...request,
      });

      const result = await productApi.query(productQuery);
      return { result, category: categoryQueryResult.items[0] };
    }

    return { result: null, category: null };
  };

  if (CategoryRouter.identifyFrom(request)) {
    return loadFor(request, context.frontasticContext).then(async ({ result, category }) => {
      if (result) {
        const AccountApi = extractDependency('AccountApi', config);
        const accountApi = new AccountApi(context.frontasticContext, getLocale(request), getCurrency(request), request);
        const accountPayload = await accountApi.getAccountPayload(request.sessionData.account);
        return {
          dynamicPageType: 'frontastic/category',
          dataSourcePayload: result,
          pageMatchingPayload: {
            ...result,
            ...accountPayload,
            category,
            isToplevel: category?.parentId === undefined,
            categoryKeyOrId: category?.categoryId,
            isVipCustomerGroup: accountPayload.customerGroupId === config.props.vipCustomerGroupId || false,
          },
        };
      }
      return null;
    });
  }
};

export const injectProductPageHandler = (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration,
) => {
  const loadFor = async (request: Request, commercetoolsFrontendContext: Context): Promise<Product | null> => {
    const ProductApi = extractDependency('ProductApi', config);

    const productApi = new ProductApi(commercetoolsFrontendContext, getLocale(request), getCurrency(request), request);

    const urlMatches = getPath(request)?.match(/\/p\/([^\/]+)/);

    const productQuery = ProductQueryFactory.queryFromParams({
      ...request,
    });

    if (urlMatches) {
      productQuery.skus = [urlMatches[1]];
      return productApi.getProduct(productQuery);
    }

    return null;
  };

  if (ProductRouter.identifyFrom(request)) {
    return loadFor(request, context.frontasticContext).then(async (product: Product) => {
      if (product) {
        const AccountApi = extractDependency('AccountApi', config);
        const accountApi = new AccountApi(context.frontasticContext, getLocale(request), getCurrency(request), request);
        const accountPayload = await accountApi.getAccountPayload(request.sessionData.account);
        return {
          dynamicPageType: 'frontastic/product-detail-page',
          dataSourcePayload: {
            product: product,
          },
          pageMatchingPayload: {
            ...accountPayload,
            categories: product?.categories?.map((cat) => cat.categoryId),
            productTypeId: product.productTypeId || '',
            slug: product.slug,
          },
        };
      }
      return null;
    });
  }
};
