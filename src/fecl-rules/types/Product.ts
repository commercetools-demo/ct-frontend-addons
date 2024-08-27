import { Product as DomainProduct } from '@commercetools/frontend-domain-types/product';

export interface Product extends DomainProduct {
  productTypeId?: string;
}
