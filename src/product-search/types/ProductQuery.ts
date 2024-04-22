import {  Facet, PaginatedQuery, SortAttributes } from '@commercetools/frontend-domain-types/query';
import { PaginatedResult } from '../../utils/types';
import { Product } from '@commercetools/frontend-domain-types/product';
import { Filter } from './Filter';

export interface ChannelRef {
  channelId: string;
  channelName?: string;
  storeId: string;
}

export interface ProductQuery extends PaginatedQuery {
  categories?: string[];
  productIds?: string[];
  skus?: string[];
  query?: string;
  filters?: Filter[];
  facets?: Facet[];
  sortAttributes?: SortAttributes;
  storeKey?: string;
  storeIds?: string[];
  distributionChannelId?: string;
  distributionChannelIds?: ChannelRef[];
  supplyChannelId?: string;
  supplyChannelIds?: ChannelRef[];
  productSelectionIds?: string[];
}

export interface ProductPaginatedResult extends PaginatedResult<Product> {
	facets?: any[];
  }
