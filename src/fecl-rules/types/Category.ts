import { Category as BaseCategory } from '@commercetools/frontend-domain-types/product';

export interface Category extends BaseCategory {
  parentId?: string;
}
