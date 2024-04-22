import { Context, DynamicPageContext, DynamicPageSuccessResult, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { SearchRouter } from '../../../utils/routers/SearchRouter';
import { ProductQueryFactory } from '../utils/ProductQueryFactory';
import { ProductPaginatedResult, ProductQuery } from '../../types/ProductQuery';
import { getCurrency, getLocale, getPath } from '../../../utils/request';
import { extractDependency } from '../utils';
import { CategoryRouter } from '../../../utils/routers/CategoryRouter';
import { CategoryQuery } from '../../types/CategoryQuery';
import { Category, Product } from '@commercetools/frontend-domain-types/product';
import { ProductRouter } from '../../../configurable-products/extensions/utils/product-router';


export const injectProductSearchHandler = (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration
) => {

  const loadFor = async (
    request: Request,
    commercetoolsFrontendContext: Context,
  ): Promise<ProductPaginatedResult | null> => {
    const ProductApi = extractDependency('ProductApi', config.dependencies);

    const productApi = new ProductApi(commercetoolsFrontendContext, getLocale(request), getCurrency(request), request);

    const urlMatches = getPath(request)?.match(/\/search/);

    if (urlMatches) {
      const productQuery = ProductQueryFactory.queryFromParams({
        ...request,
        query: { ...request.query, query: request.query.query || request.query.q },
      });
      return productApi.query(productQuery);
    }

    return null;
  }

  if (SearchRouter.identifyFrom(request)) {
    return loadFor(request, context.frontasticContext).then((result: ProductPaginatedResult | null) => {
      if (result) {
        return {
          dynamicPageType: 'frontastic/search',
          dataSourcePayload: result,
          pageMatchingPayload: result,
        };
      }
      return null;
    });
  }
};

export const injectCategoryPageHandler = (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration
) => {

  const loadFor = async (
    request: Request,
    commercetoolsFrontendContext: Context,
  ): Promise<ProductPaginatedResult | null> => {
    const ProductApi = extractDependency('ProductApi', config.dependencies);
    const productApi = new ProductApi(commercetoolsFrontendContext, getLocale(request), getCurrency(request), request);

    // We are using the last subdirectory of the path to identify the category slug
    const urlMatches = getPath(request)?.match(/[^/]+(?=\/$|$)/);

    if (urlMatches) {
      const categoryQuery: CategoryQuery = {
        slug: urlMatches[0],
      };

      const categoryQueryResult = await productApi.queryCategories(categoryQuery);

      if (categoryQueryResult.items.length == 0) return null;
      request.query.category = (categoryQueryResult.items[0] as Category).categoryId;

      const productQuery = ProductQueryFactory.queryFromParams({
        ...request,
      });

      return await productApi.query(productQuery);
    }

    return null;
  }

  if (CategoryRouter.identifyFrom(request)) {
    return loadFor(request, context.frontasticContext).then((result: ProductPaginatedResult | null) => {
      if (result) {
        return {
          dynamicPageType: 'frontastic/search',
          dataSourcePayload: result,
          pageMatchingPayload: result,
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
  config: Configuration
) => {

  const loadFor = async (
    request: Request,
    commercetoolsFrontendContext: Context,
  ): Promise<Product | null> => {
    const ProductApi = extractDependency('ProductApi', config.dependencies);
    const productApi = new ProductApi(commercetoolsFrontendContext, getLocale(request), getCurrency(request), request);

    const urlMatches = getPath(request)?.match(/\/p\/([^\/]+)/);

    if (urlMatches) {
      const productQuery: ProductQuery = {
        skus: [urlMatches[1]],
      };
      return productApi.getProduct(productQuery);
    }

    return null;
  }

  if (ProductRouter.identifyFrom(request)) {
    return loadFor(request, context.frontasticContext).then((product: Product) => {
      if (product) {
        return {
          dynamicPageType: 'frontastic/product-detail-page',
          dataSourcePayload: {
            product: product,
          },
          pageMatchingPayload: {
            product: product,
            categories: product?.categories?.map((cat) => cat.categoryId),
            slug: product.slug,
          },
        };
      }
      return null;
    })
  }
};
