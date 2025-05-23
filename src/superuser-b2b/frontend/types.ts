import { Cart } from '@commercetools/platform-sdk';

export interface SuperuserStatus {
  isSuperuser?: boolean;
  carts: Cart[];
}
