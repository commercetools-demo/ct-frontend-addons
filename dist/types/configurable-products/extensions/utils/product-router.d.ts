import { Product } from '@commercetools/frontend-domain-types/product';
import { Context, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';
export declare class ProductRouter {
    static getBundles: (request: Request, frontasticContext: Context, product: Product, config: Configuration) => Promise<Product[]>;
    private static getProductIdsFromReferencedAttribute;
}
//# sourceMappingURL=product-router.d.ts.map