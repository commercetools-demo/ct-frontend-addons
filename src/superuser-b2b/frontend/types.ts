import { LineItem as DomainLineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Money } from '@commercetools/frontend-domain-types/product';
import { Cart } from '@commercetools/platform-sdk';

export type LineItem = DomainLineItem & {
  parentId?: string;
  price?: Money;
  discountedPrice?: Money;
  sku: string;
};

export interface SuperuserStatus {
  isSuperuser?: boolean;
  carts: Cart[];
}
