import {
  AttributeGroup,
  Category as CommercetoolsCategory,
  CategoryReference,
  ProductVariant as CommercetoolsProductVariant,
  TypedMoney,
  ProductSearchRequest,
  ProductSearchFacetExpression,
  ProductSearchFacetRangesExpression,
  ProductSearchFacetDistinctExpression,
  ProductSearchFacetCountExpression,
  SearchNumberRangeExpression,
  SearchExactExpression,
  ProductSearchFacetResultBucket,
  _SearchQuery,
  SearchAndExpression,
  ProductSearchFacetResultCount,
  ProductSearchFacetResult,
  ProductSearchMatchingVariants as CommercetoolsProductSearchMatchingVariants,
  ProductSearchResult as CommercetoolsProductSearchResult,
} from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
import { Product, Variant } from '@commercetools/frontend-domain-types/product';
import { ProductRouter } from '../../../configurable-products/extensions/utils/product-router';
import { FacetDefinition } from '../../types/FacetDefinition';
import { Facet, FacetTypes } from '../../types/result/Facet';
import { RangeFacet } from '../../types/result/RangeFacet';
import { TermFacet } from '../../types/result/TermFacet';
import { Term } from '../../types/result/Term';

type FacetExpressionReturn =
  | ProductSearchFacetRangesExpression
  | ProductSearchFacetCountExpression
  | ProductSearchFacetDistinctExpression
  | undefined;
export const injectProductMapper = (BaseProductMapper: any): typeof BaseProductMapper => {
  return class ProductMapper extends BaseProductMapper {
    static commercetoolsProductSearchResultToProduct(
      commercetoolsProduct: CommercetoolsProductSearchResult,
      productIdField: string,
      categoryIdField: string,
      locale: Locale,
      supplyChannelId?: string,
    ): Product {
      const product: Product = {
        productId: commercetoolsProduct?.productProjection?.[productIdField],
        version: commercetoolsProduct?.productProjection?.version?.toString(),
        name: commercetoolsProduct?.productProjection?.name?.[locale.language],
        slug: commercetoolsProduct?.productProjection?.slug?.[locale.language],
        description: commercetoolsProduct?.productProjection?.description?.[locale.language],
        categories: this.commercetoolsCategoryReferencesToCategories(
          commercetoolsProduct.productProjection?.categories,
          categoryIdField,
          locale,
        ),
        variants: this.commercetoolsProductProjectionToVariants(commercetoolsProduct, locale, supplyChannelId),
      };

      product._url = ProductRouter.generateUrlFor(product);

      return product;
    }

    static commercetoolsProductProjectionToVariants(
      commercetoolsProduct: CommercetoolsProductSearchResult,
      locale: Locale,
      supplyChannelId?: string,
    ): Variant[] {
      const variants: Variant[] = [];

      if (commercetoolsProduct?.productProjection?.masterVariant) {
        variants.push(
          this.commercetoolsProductVariantToVariant(
            commercetoolsProduct.productProjection.masterVariant,
            locale,
            supplyChannelId,
            commercetoolsProduct.matchingVariants,
          ),
        );
      }

      for (let i = 0; i < commercetoolsProduct.productProjection?.variants.length; i++) {
        variants.push(
          this.commercetoolsProductVariantToVariant(
            commercetoolsProduct.productProjection?.variants[i],
            locale,
            supplyChannelId,
            commercetoolsProduct.matchingVariants,
          ),
        );
      }

      return variants;
    }

    static commercetoolsProductVariantToVariant(
      commercetoolsVariant: CommercetoolsProductVariant,
      locale: Locale,
      supplyChannelId?: string,
      matchingVariants?: CommercetoolsProductSearchMatchingVariants,
    ): Variant {
      const attributes = this.commercetoolsAttributesToAttributes(commercetoolsVariant.attributes, locale);
      const { price, discountedPrice, discounts } = this.extractPriceAndDiscounts(commercetoolsVariant, locale);

      return {
        id: commercetoolsVariant.id?.toString(),
        sku: commercetoolsVariant.sku?.toString(),
        images: [
          ...commercetoolsVariant.assets.map((asset) => asset.sources?.[0].uri),
          ...commercetoolsVariant.images.map((image) => image.url),
        ],
        groupId: attributes?.baseId || undefined,
        attributes: attributes,
        price: price,
        discountedPrice: discountedPrice,
        discounts: discounts,
        isOnStock: supplyChannelId
          ? commercetoolsVariant.availability?.channels?.[supplyChannelId]?.isOnStock
          : commercetoolsVariant.availability?.isOnStock || undefined,
        restockableInDays: supplyChannelId
          ? commercetoolsVariant.availability?.channels?.[supplyChannelId]?.restockableInDays
          : commercetoolsVariant.availability?.restockableInDays || undefined,
        availableQuantity: supplyChannelId
          ? commercetoolsVariant.availability?.channels?.[supplyChannelId]?.availableQuantity
          : commercetoolsVariant.availability?.availableQuantity || undefined,
        isMatchingVariant: matchingVariants?.matchedVariants.some((variant) => variant.id === commercetoolsVariant.id),
      } as Variant;
    }
    static commercetoolsFacetResultsToFacets(
      commercetoolsFacetResults: ProductSearchFacetResult[],
      commercetoolsProductSearchRequest: ProductSearchRequest,
      facetDefinitions: FacetDefinition[],
    ): Facet[] {
      return commercetoolsFacetResults
        .map((commercetoolsFacetResult) => {
          const commercetoolsFacetExpression = this.findCommercetoolsFacetExpression(
            commercetoolsProductSearchRequest.facets,
            commercetoolsFacetResult.name,
          );

          if (commercetoolsFacetExpression) {
            if ('ranges' in commercetoolsFacetExpression) {
              return this.commercetoolsFacetResultBucketToRangeFacet(
                commercetoolsFacetExpression as ProductSearchFacetRangesExpression,
                commercetoolsFacetResult as ProductSearchFacetResultBucket,
              );
            }
            if ('count' in commercetoolsFacetExpression) {
              return this.commercetoolsFacetResultCountToFacet(
                commercetoolsFacetExpression as ProductSearchFacetCountExpression,
                commercetoolsFacetResult as ProductSearchFacetResultCount,
                facetDefinitions,
              );
            }
            if ('distinct' in commercetoolsFacetExpression) {
              return this.commercetoolsFacetResultBucketToTermFacet(
                commercetoolsFacetExpression as ProductSearchFacetDistinctExpression,
                commercetoolsFacetResult as ProductSearchFacetResultBucket,
              );
            }
          }
          return null;
        })
        .filter((facet) => facet);
    }

    static findCommercetoolsFacetExpression = (
      commercetoolsFacetExpression: ProductSearchFacetExpression[],
      facetName: string,
    ): FacetExpressionReturn => {
      return commercetoolsFacetExpression.find(
        (facet) =>
          (facet as ProductSearchFacetRangesExpression).ranges?.name === facetName ||
          (facet as ProductSearchFacetCountExpression).count?.name === facetName ||
          (facet as ProductSearchFacetDistinctExpression).distinct?.name === facetName,
      ) as FacetExpressionReturn;
    };

    static commercetoolsFacetResultBucketToRangeFacet = (
      commercetoolsFacetRangesExpression: ProductSearchFacetRangesExpression,
      commercetoolsFacetResultBucket: ProductSearchFacetResultBucket,
    ): RangeFacet => {
      const min = parseInt(
        commercetoolsFacetResultBucket.buckets[0].key.substring(
          0,
          commercetoolsFacetResultBucket.buckets[0].key.indexOf('-'),
        ),
      );
      const max = parseInt(
        commercetoolsFacetResultBucket.buckets[0].key.substring(
          commercetoolsFacetResultBucket.buckets[0].key.indexOf('-') + 1,
        ),
      );
      const selected = this.getSelectedFilterFromFacetSearchQuery(
        commercetoolsFacetResultBucket.name,
        commercetoolsFacetRangesExpression,
        'ranges',
      ) as SearchNumberRangeExpression[];
      return {
        type: FacetTypes.RANGE,
        identifier: commercetoolsFacetResultBucket.name,
        label: commercetoolsFacetResultBucket.name,
        key: commercetoolsFacetResultBucket.name,
        min: isNaN(min) ? 0 : min,
        max: isNaN(max) ? Number.MAX_SAFE_INTEGER : max,
        selected: !!selected,
        minSelected: selected ? selected[0]?.range?.gt : undefined,
        maxSelected: selected ? selected[0]?.range?.lt : undefined,
      };
    };

    static getSelectedFilterFromFacetSearchQuery = (
      facetResultName: string,
      facetQuery:
        | ProductSearchFacetRangesExpression
        | ProductSearchFacetCountExpression
        | ProductSearchFacetDistinctExpression,
      type: 'ranges' | 'count' | 'distinct',
    ): _SearchQuery[] | undefined => {
      if (facetQuery) {
        let filterExpression: _SearchQuery;
        let fieldType: string;
        switch (type) {
          case 'ranges':
            filterExpression = (facetQuery as ProductSearchFacetRangesExpression).ranges.filter;
            fieldType = (facetQuery as ProductSearchFacetRangesExpression).ranges.fieldType;
            break;
          case 'count':
            filterExpression = (facetQuery as ProductSearchFacetCountExpression).count.filter;
            break;
          case 'distinct':
            filterExpression = (facetQuery as ProductSearchFacetDistinctExpression).distinct.filter;
            fieldType = (facetQuery as ProductSearchFacetDistinctExpression).distinct.fieldType;
            break;
        }

        const facetResultIdentifier = this.getfacetIdentifier(facetResultName, fieldType);

        if (filterExpression) {
          if ('and' in filterExpression) {
            return (filterExpression as SearchAndExpression).and.filter((andQuery) => {
              return (
                (andQuery as SearchNumberRangeExpression).range?.field === facetResultIdentifier ||
                (andQuery as SearchExactExpression).exact?.field === facetResultIdentifier
              );
            });
          }
          return (filterExpression as SearchExactExpression).exact?.field === facetResultIdentifier
            ? [filterExpression]
            : (filterExpression as SearchNumberRangeExpression).range?.field === facetResultIdentifier
              ? [filterExpression]
              : undefined;
        }
      }
      return undefined;
    };

    private static getfacetIdentifier(facetResultName: string, fieldType: string) {
      switch (fieldType) {
        case 'enum':
          return `${facetResultName}.label`;
        default:
          return facetResultName;
      }
    }

    static commercetoolsFacetResultCountToFacet = (
      commercetoolsFacetCountExpression: ProductSearchFacetCountExpression,
      commercetoolsFacetResultCount: ProductSearchFacetResultCount,
      facetDefinitions: FacetDefinition[],
    ): Facet => {
      const selected = this.getSelectedFilterFromFacetSearchQuery(
        commercetoolsFacetResultCount.name,
        commercetoolsFacetCountExpression,
        'count',
      );
      const definition = facetDefinitions.find(
        (facetDefinition) => facetDefinition.attributeId === commercetoolsFacetResultCount.name,
      );
      return {
        type: definition?.attributeType === FacetTypes.BOOLEAN ? FacetTypes.BOOLEAN : FacetTypes.TERM,
        identifier: commercetoolsFacetResultCount.name,
        label: commercetoolsFacetResultCount.name,
        key: commercetoolsFacetResultCount.name,
        count: commercetoolsFacetResultCount.value,
        selected: !!selected,
      };
    };

    static commercetoolsFacetResultBucketToTermFacet = (
      commercetoolsFacetDistinctExpression: ProductSearchFacetDistinctExpression,
      commercetoolsFacetResultBucket: ProductSearchFacetResultBucket,
    ): TermFacet => {
      const selected = this.getSelectedFilterFromFacetSearchQuery(
        commercetoolsFacetResultBucket.name,
        commercetoolsFacetDistinctExpression,
        'distinct',
      );

      return {
        type: FacetTypes.TERM,
        identifier: commercetoolsFacetResultBucket.name,
        label: commercetoolsFacetResultBucket.name,
        key: commercetoolsFacetResultBucket.name,
        selected: commercetoolsFacetDistinctExpression !== undefined,
        terms: commercetoolsFacetResultBucket.buckets.map((facetResultTerm) => {
          const term: Term = {
            identifier: facetResultTerm.key.toString(),
            label: facetResultTerm.key.toString(),
            count: facetResultTerm.count,
            key: facetResultTerm.key.toString(),
            selected: selected?.some(
              (andQuery) => 'exact' in andQuery && andQuery.exact?.value === facetResultTerm.key,
            ),
          };
          return term;
        }),
      };
    };
  };
};
