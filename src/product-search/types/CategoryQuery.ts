import { PaginatedQuery } from '@commercetools/frontend-domain-types/query';

export enum CategoryQueryFormat {
  FLAT = 'flat',
  TREE = 'tree',
}

export interface CategoryQuery extends PaginatedQuery {
  parentId?: string;
  stokeKey?: string;
  slug?: string;
  format?: CategoryQueryFormat;
}
