import { Product, Variant } from '@commercetools/frontend-domain-types/product';
import { Context, Request } from '@frontastic/extension-types';
import { getCurrency, getDistributionChannelId, getLocale, getPath, getStoreId, getStoreKey, getSupplyChannelId } from '../../../utils/request';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';

export class ProductRouter {
  static getBundles = async (
    request: Request,
    frontasticContext: Context,
    product: Product,
    config: Configuration,
  ): Promise<Product[]> => {
    const urlMatches = getPath(request)?.match(config.props.product.productDetailsPageRegex);

    const ProductApi = extractDependency('ProductApi', config);
    if (!ProductApi) {
      throw new Error('ProductApi not found');
    }

    const productIds: string[] = [];

    if (urlMatches) {
      const variants = product.variants;
      if (variants.length) {
        variants.forEach((variant) => {
          // Store product IDs in referencedProductsMapping for each reference
          const attribute = config.props.product.attributeName;
          productIds.push(...this.getProductIdsFromReferencedAttribute(attribute, variant));
        });

        // store all unique product IDs in one array
        const uniqueIds = productIds.filter((item, index, self) => self.indexOf(item) === index);

        // Fetch all products at once
        if (uniqueIds.length) {
          const productApi = new ProductApi(frontasticContext, getLocale(request), getCurrency(request));
          const products = await productApi
            .query({
              productIds: uniqueIds,
              storeKey: getStoreKey(request),
              storeId: getStoreId(request),
              distributionChannelId: getDistributionChannelId(request),
              supplyChannelId: getSupplyChannelId(request),
            })
            .then((result: { items: Product[] }) => result.items as Product[]);

          // return each product set in a map
          return products;
        }
      }
    }

    return [];
  };

  private static getProductIdsFromReferencedAttribute = (attributeName: string, variant: Variant): string[] => {
    const attributeValue = variant.attributes?.[attributeName];
    if (attributeValue && Array.isArray(attributeValue)) {
      return attributeValue?.map((item: Record<string, string>) => item.id);
    } else if (attributeValue) {
      return [attributeValue.id];
    }
    return [];
  };
}
