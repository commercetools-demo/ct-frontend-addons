import { DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { DataSources as DataSourcesType } from '../../../utils/types';
import { extractDependency } from '../utils';
import { getCurrency, getLocale } from '../../../utils/request';
import { ProductQueryFactory } from '../utils/ProductQueryFactory';
import { ProductPaginatedResult } from '../../types/ProductQuery';
import { Product } from '@commercetools/frontend-domain-types/product';
import { DataSourcePreviewPayloadElement } from '@frontastic/extension-types/src/ts';

const getPreviewPayload = (queryResult: ProductPaginatedResult) => {
  return (queryResult.items as Product[]).map((product): DataSourcePreviewPayloadElement => {
    return {
      title: product.name,
      image: product?.variants?.[0]?.images?.[0],
    };
  });
};

export default {
  'frontastic/product-list': {
    create: false,
    hook: (configuration: Configuration) => async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const ProductApi = extractDependency('ProductApi', configuration.dependencies);
      try {
        const productApi = new ProductApi(
          context.frontasticContext,
          getLocale(context.request),
          getCurrency(context.request),
          context.request,
        );
        const productQuery = ProductQueryFactory.queryFromParams(context?.request, config);

        const queryResult = await productApi.query(productQuery);

        return !context.isPreview
          ? { dataSourcePayload: queryResult }
          : {
              dataSourcePayload: queryResult,
              previewPayload: getPreviewPayload(queryResult),
            };
      } catch (error) {
        return {
          dataSourcePayload: {
            statusCode: error.statusCode,
            body: JSON.stringify({
              statusCode: error.statusCode,
              message: error.message,
            }),
            sessionData: context.request?.sessionData,
          },
        };
      }
    },

    'frontastic/product': {
      create: false,
      hook: (configuration: Configuration) => async (config: DataSourceConfiguration, context: DataSourceContext) => {
        const ProductApi = extractDependency('ProductApi', configuration.dependencies);

        try {
          const productApi = new ProductApi(
            context.frontasticContext,
            getLocale(context.request),
            getCurrency(context.request),
            context.request,
          );
          const productQuery = ProductQueryFactory.queryFromParams(context?.request, config);

          const queryResult = await productApi.getProduct(productQuery);
          const payLoadResult = { dataSourcePayload: { product: queryResult } };

          return !context.isPreview
            ? payLoadResult
            : {
                payLoadResult,
                previewPayload: [
                  {
                    title: queryResult.name,
                    image: queryResult?.variants[0]?.images[0],
                  },
                ],
              };
        } catch (error) {
          return {
            dataSourcePayload: {
              statusCode: error.statusCode,
              body: JSON.stringify({
                statusCode: error.statusCode,
                message: error.message,
              }),
              sessionData: context.request?.sessionData,
            },
          };
        }
      },
    },

    'frontastic/other-products': {
      create: false,
      hook: (configuration: Configuration) => async (config: DataSourceConfiguration, context: DataSourceContext) => {
        const ProductApi = extractDependency('ProductApi', configuration.dependencies);

        try {
          const productApi = new ProductApi(
            context.frontasticContext,
            getLocale(context.request),
            getCurrency(context.request),
            context.request,
          );
          const productQuery = ProductQueryFactory.queryFromParams(context.request, config);

          const shuffleArray = (array: any) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
            return array;
          };

          const queryResult = await productApi.query(productQuery);

          return {
            dataSourcePayload: {
              ...queryResult,
              items: shuffleArray(queryResult.items),
            },
          };
        } catch (error) {
          return {
            dataSourcePayload: {
              statusCode: error.statusCode,
              body: JSON.stringify({
                statusCode: error.statusCode,
                message: error.message,
              }),
              sessionData: context.request?.sessionData,
            },
          };
        }
      },
    },
  },
} as DataSourcesType<Configuration>;
