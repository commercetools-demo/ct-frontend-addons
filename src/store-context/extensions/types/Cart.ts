import { Cart as DomainCart } from '@commercetools/frontend-domain-types/cart';

export interface Cart extends DomainCart {
  storeKey?: string;
}
