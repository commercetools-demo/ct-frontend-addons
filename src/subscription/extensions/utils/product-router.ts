import { Product, Variant } from '@commercetools/frontend-domain-types/product';
import { Context, Request } from '@frontastic/extension-types';
import { getCurrency, getLocale, getPath } from '../../../utils/request';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';

export class ProductRouter {
  static getBundles = async (
    request: Request,
    frontasticContext: Context,
    product: Product,
    config: Configuration,
  ): Promise<Record<string, Product[]>> => {
    const urlMatches = getPath(request)?.match(config.props.product.productDetailsPageRegex);

    const ProductApi = extractDependency('ProductApi', config);
    if (!ProductApi) {
      throw new Error('ProductApi not found');
    }

    const referencedProductsMapping: { name: string; key: string; productIds: string[] }[] = [
      { name: 'subscriptions', key: config.props.product.attributeNameOnParentProduct, productIds: [] },
    ];

    if (urlMatches) {
      const variants = product.variants;
      if (variants.length) {
        variants.forEach((variant) => {
          // Store product IDs in referencedProductsMapping for each reference
          referencedProductsMapping.forEach((referenceProductMap) => {
            const attributes = referenceProductMap.key.split(',');
            if (attributes?.length) {
              const attributeKeys = Object.keys(variant.attributes || {}).filter((attributeKey) =>
                attributes.includes(attributeKey),
              );
              referenceProductMap.productIds = this.getProductIdsFromReferencedAttributes(attributeKeys, variant);
            }
          });
        });

        // store all product IDs in one array
        const allProductIds = referencedProductsMapping
          .reduce((prev: string[], current) => {
            prev = prev.concat(current.productIds);
            return prev;
          }, [])
          .filter((item, index, self) => self.indexOf(item) === index);

        // Fetch all products at once
        if (allProductIds.length) {
          const productApi = new ProductApi(frontasticContext, getLocale(request), getCurrency(request));
          const products = await productApi
            .query({ productIds: allProductIds })
            .then((result: { items: Product[] }) => result.items as Product[]);

          // return each product set in a map
          if (products.length) {
            return referencedProductsMapping.reduce((prev: Record<string, Product[]>, current) => {
              prev[current.name] = products.filter((product: Product) => current.productIds.includes(product.productId!));
              return prev;
            }, {});
          }
        }
      }
    }

    return {};
  };

  private static getProductIdsFromReferencedAttributes = (attributeNames: string[], variant: Variant): string[] => {
    return attributeNames.reduce((prev: string[], attributeKey) => {
      const attributeValue = variant.attributes?.[attributeKey];
      if (attributeValue && Array.isArray(attributeValue)) {
        prev = prev.concat(attributeValue?.map((item: Record<string, string>) => item.id));
      } else if (attributeValue) {
        prev.push(attributeValue.id);
      }
      return prev;
    }, []);
  };
}
