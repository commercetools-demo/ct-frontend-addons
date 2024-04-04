import { Product } from '@commercetools/frontend-domain-types/product';
import { Request, Context } from '@frontastic/extension-types';
import { Configuration } from '../../types.js';
import '../../../types-Cz8jhXRC.js';

declare class ProductRouter {
    static getBundles: (request: Request, frontasticContext: Context, product: Product, config: Configuration) => Promise<Product[]>;
    private static getProductIdsFromReferencedAttribute;
}

export { ProductRouter };
