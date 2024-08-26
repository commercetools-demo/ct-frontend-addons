import { Locale } from '../../../utils/locale';
import { Configuration } from '../types';
import { ProductProjection as CommercetoolsProductProjection } from '@commercetools/platform-sdk';
import { Product } from '../../types/Product';
export const injectProductMapper = (BaseProductMapper: any, config?: Configuration): typeof BaseProductMapper => {
  return class ProductMapper extends BaseProductMapper {
    static commercetoolsProductProjectionToProduct: (
      commercetoolsProduct: CommercetoolsProductProjection,
      productIdField: string,
      categoryIdField: string,
      locale: Locale,
      defaultLocale: string,
    ) => Product = (
      commercetoolsProduct: CommercetoolsProductProjection,
      productIdField: string,
      categoryIdField: string,
      locale: Locale,
      defaultLocale: string,
    ) => {
      return {
        ...super.commercetoolsProductProjectionToProduct(
          commercetoolsProduct,
          productIdField,
          categoryIdField,
          locale,
          defaultLocale,
        ),
        productTypeId: commercetoolsProduct?.productType?.id,
      };
    };
  };
};
