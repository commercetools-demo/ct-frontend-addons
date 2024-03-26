import { Product } from '@commercetools/frontend-domain-types/product';
import { Request, Context } from '@frontastic/extension-types';
import { Configuration } from '../../types.cjs';
import '../../../types-B2_pD38A.cjs';

declare class ProductRouter {
    static getBundles: (request: Request, frontasticContext: Context, product: Product, config: Configuration) => Promise<Record<string, Product[]>>;
    private static getProductIdsFromReferencedAttributes;
}

export { ProductRouter };
