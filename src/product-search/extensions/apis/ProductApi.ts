import { ProductPaginatedResult, ProductQuery } from '../../types/ProductQuery';
import { FacetDefinition } from '../../types/FacetDefinition';
import { ExternalError } from '../../../utils/Errors';
import { TermFilter } from '../../types/TermFilter';
import { Filter } from '../../types/Filter';
import { extractDependency } from '../utils';
import { Dependencies } from '../../types';
import { ProductSearchFactory } from '../utils/ProductSearchQueryFactory';
import { ProductSearchFacetResultBucket, ProductSearchRequest } from '@commercetools/platform-sdk';
import { CategoryQuery, CategoryQueryFormat } from '../../types/CategoryQuery';
import { PaginatedResult } from '../../../utils/types';
import { Category } from '../../types/Category';

export const injectProductApi = (BaseProductApi: any, dependencies?: Dependencies): typeof BaseProductApi => {
  const ProductMapper = extractDependency('ProductMapper', dependencies);
  return class ProductApi extends BaseProductApi {
    protected async getCommercetoolsProductTypes() {
      return await this.requestBuilder()
        .productTypes()
        .get()
        .execute()
        .then((response) => {
          const productTypes = response.body.results;

          return productTypes;
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    query: <T extends ProductQuery>(productQuery: T) => Promise<ProductPaginatedResult> = async <
      T extends ProductQuery,
    >(
      productQuery: T,
    ) => {
      const locale = await this.getCommercetoolsLocal();
      productQuery.categories = await this.hydrateCategories(productQuery);
      productQuery.filters = await this.hydrateFilters(productQuery);
      productQuery.productSelectionIds = await this.hydrateProductSelectionIds(productQuery);

      const facetDefinitions: FacetDefinition[] = [
        ...ProductMapper.commercetoolsProductTypesToFacetDefinitions(await this.getCommercetoolsProductTypes(), locale),
        // Include Price facet
        {
          attributeId: 'variants.prices',
          attributeType: 'money',
        },
      ];

      const commercetoolsProductSearchRequest =
        ProductSearchFactory.createCommercetoolsProductSearchRequestFromProductQuery(
          productQuery,
          facetDefinitions,
          locale,
          this.productIdField,
        );

      return this.requestBuilder()
        .products()
        .search()
        .post({
          body: commercetoolsProductSearchRequest,
        })
        .execute()
        .then((response) => {
          const items = response.body.results.map((product) =>
            ProductMapper.commercetoolsProductSearchResultToProduct(
              product,
              this.productIdField,
              this.categoryIdField,
              locale,
              productQuery.supplyChannelId,
            ),
          );
          const count = response.body.results.length;
          const result: ProductPaginatedResult = {
            total: response.body.total,
            items,
            count,
            facets: ProductMapper.commercetoolsFacetResultsToFacets(
              response.body.facets,
              commercetoolsProductSearchRequest,
              facetDefinitions,
            ),
            previousCursor: ProductMapper.calculatePreviousCursor(response.body.offset, count),
            nextCursor: ProductMapper.calculateNextCursor(response.body.offset, count, response.body.total),
            query: productQuery,
          };
          return result;
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    };

    protected async queryCategories(categoryQuery: CategoryQuery, buckets?: string[]): Promise<PaginatedResult<Category>> {
      const locale = await this.getCommercetoolsLocal();
  
      // TODO: get default from constant
      const limit = +categoryQuery.limit || 24;
      const where: string[] = [];
  
      if (categoryQuery.slug) {
        where.push(`slug(${locale.language}="${categoryQuery.slug}")`);
      }
  
      if (categoryQuery.parentId) {
        where.push(`parent(id="${categoryQuery.parentId}")`);
      }
      if (buckets?.length) {
        where.push(`id in (${buckets.map((b) => `"${b}"`).join(',')})`);
      }
  
      const methodArgs = {
        queryArgs: {
          limit: limit,
          offset: this.getOffsetFromCursor(categoryQuery.cursor),
          where: where.length > 0 ? where : undefined,
          expand: ['ancestors[*]', 'parent'],
        },
      };
  
      return await this.getCommercetoolsCategoryPagedQueryResponse(methodArgs)
        .then((response) => {
          const items =
            categoryQuery.format === CategoryQueryFormat.TREE
              ? ProductMapper.commercetoolsCategoriesToTreeCategory(response.body.results, this.categoryIdField, locale)
              : response.body.results.map((category) =>
                  ProductMapper.commercetoolsCategoryToCategory(category, this.categoryIdField, locale),
                );
  
          const result: PaginatedResult<Category> = {
            total: response.body.total,
            items: items,
            count: response.body.count,
            previousCursor: ProductMapper.calculatePreviousCursor(response.body.offset, response.body.count),
            nextCursor: ProductMapper.calculateNextCursor(response.body.offset, response.body.count, response.body.total),
            query: categoryQuery,
          };
  
          return result;
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    protected async hydrateCategories(productQuery: ProductQuery): Promise<string[]> {
      if (productQuery.categories !== undefined && productQuery.categories.length !== 0) {
        let categoryIds = productQuery.categories.filter(function uniqueCategories(value, index, self) {
          return self.indexOf(value) === index;
        });

        // commercetools only allows filter categories by id. If we are using something different as categoryIdField,
        // we need first to fetch the category to get the correspondent category id.
        if (this.categoryIdField !== 'id') {
          const categoriesMethodArgs = {
            queryArgs: {
              where: [`key in ("${categoryIds.join('","')}")`],
            },
          };

          categoryIds = await this.getCommercetoolsCategoryPagedQueryResponse(categoriesMethodArgs).then((response) => {
            return response.body.results.map((category) => {
              return category.id;
            });
          });
        }

        return categoryIds;
      }
      return [];
    }

    protected async hydrateProductSelectionIds(productQuery: ProductQuery): Promise<string[]> {
      if (productQuery.productSelectionIds !== undefined && productQuery.productSelectionIds.length !== 0) {
        let productSelectionIds = productQuery.productSelectionIds.filter(
          function uniqueCategories(value, index, self) {
            return self.indexOf(value) === index;
          },
        );

        // commercetools only allows filter productSelection by id. If we are using something different as productSelectionField,
        // we need first to fetch the productSelectionIds to get the correspondent productSelectionField id.
        if (this.productSelectionIdField !== 'id') {
          const categoriesMethodArgs = {
            queryArgs: {
              where: [`key in ("${productSelectionIds.join('","')}")`],
            },
          };

          productSelectionIds = await this.getCommercetoolsProductSelectionPagedQueryResponse(
            categoriesMethodArgs,
          ).then((response) => {
            return response.body.results.map((category) => {
              return category.id;
            });
          });
        }

        return productSelectionIds;
      }
      return [];
    }

    protected async hydrateFilters(productQuery: ProductQuery): Promise<Filter[]> {
      if (productQuery.filters !== undefined && productQuery.filters.length !== 0) {
        const categoryIds = productQuery.filters
          .filter((filter) => filter.identifier === 'categoriesSubTree')
          .map((filter) => (filter as TermFilter).terms?.map((term) => term))
          .filter(function uniqueCategories(value, index, self) {
            return self.indexOf(value) === index;
          });

        // commercetools only allows filter categories by id. If we are using something different as categoryIdField,
        // we need first to fetch the category to get the correspondent category id.
        if (this.categoryIdField !== 'id' && categoryIds.length !== 0) {
          const categoriesMethodArgs = {
            queryArgs: {
              where: [`key in ("${categoryIds.join('","')}")`],
            },
          };

          const categories = await this.getCommercetoolsCategoryPagedQueryResponse(categoriesMethodArgs).then(
            (response) => {
              return response.body.results;
            },
          );

          productQuery.filters = productQuery.filters.map((filter) => {
            if (filter.identifier === 'categoriesSubTree') {
              return {
                ...filter,
                terms: categories
                  ?.filter((category) => (filter as TermFilter).terms?.includes(category.key))
                  ?.map((category) => category.id),
              };
            }
            return filter;
          });
        }

        return productQuery.filters;
      }
      return [];
    }

    protected async getCommercetoolsCategoryPagedQueryResponse(methodArgs: object) {
      return await this.requestBuilder()
        .categories()
        .get(methodArgs)
        .execute()
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    protected async getCommercetoolsProductSelectionPagedQueryResponse(methodArgs: object) {
      return await this.requestBuilder()
        .productSelections()
        .get(methodArgs)
        .execute()
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    protected async queryFacetCategoriesForSubtree(storeId?: string): Promise<string[]> {
      if (!storeId) {
        return [];
      }
      const query: ProductSearchRequest = {
        query: {
          exact: {
            field: 'stores',
            value: storeId,
          },
        },
        facets: [
          {
            distinct: {
              name: 'categoriesSubTree',
              field: 'categoriesSubTree',
              level: 'products',
              attributeType: 'text',
            },
          },
        ],
      };
  
      const result = await this.requestBuilder()
        .products()
        .search()
        .post({
          body: query,
        })
        .execute();
  
      return (result?.body.facets?.find((r) => r.name === 'categoriesSubTree') as ProductSearchFacetResultBucket)?.buckets
        ?.filter((b) => b.count > 0)
        ?.map((b) => b.key);
    };
  };
};
