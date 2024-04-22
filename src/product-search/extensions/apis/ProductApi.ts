import { ProductQuery } from '@commercetools/frontend-domain-types/query';
import { Product } from '@commercetools/frontend-domain-types/product';

export interface PaginatedResult<T> {
  total?: number;
  previousCursor?: string;
  nextCursor?: string;
  count: number;
  items: T[];
  query?: any;
}

export interface ProductPaginatedResult extends PaginatedResult<Product> {
  facets?: any[];
}


export const injectProductApi = (BaseProductApi: any): typeof BaseProductApi => {
  return class CartApi extends BaseProductApi {
    query: <T extends ProductQuery>(productQuery: T) => Promise<ProductPaginatedResult> = async <T extends ProductQuery>(productQuery: T) => {
      const locale = await this.getCommercetoolsLocal();
      productQuery.categories = await this.hydrateCategories(productQuery);
      productQuery.filters = await this.hydrateFilters(productQuery);
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
            ProductMapper.commercetoolsProductProjectionToProduct(
              product.productProjection,
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
  };
};
