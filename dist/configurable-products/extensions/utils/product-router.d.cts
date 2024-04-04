import { Product } from '@commercetools/frontend-domain-types/product';
import { Request, Context } from '@frontastic/extension-types';
import { Configuration } from '../../types.cjs';
import '../../../types-Cz8jhXRC.cjs';

declare class ProductRouter {
    static getBundles: (request: Request, frontasticContext: Context, product: Product, config: Configuration) => Promise<Product[]>;
    private static getProductIdsFromReferencedAttribute;
}

export { ProductRouter };
