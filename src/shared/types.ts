import { Currency } from '@commercetools/frontend-sdk/lib/types/Currency';
import { Category, Variant } from '@commercetools/frontend-domain-types/product';
import { Product as DomainProduct } from '@commercetools/frontend-domain-types/product/Product';
import { Cart as DomainCart } from '@commercetools/frontend-domain-types/cart/Cart';
import { LineItem as DomainLineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Address } from '@commercetools/frontend-domain-types/account/Address';

export type AccountLoginBody = {
  email?: string;
  password?: string;
  impersonatedCustomerEmail?: string;
};

export type Account = {
  accountId?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  customerGroupId?: string;
  customerGroupAssignmentIds?: string[];
};

export interface LineItem extends DomainLineItem {
  lineItemId: string;
  custom?: Record<string, any>;
  variant: {
    attributes: Record<string, any>;
    sku: string;
  };
  count: number;
  parentId?: string;
}

export interface Subscription {
  order?: Order;
  product?: DomainProduct;
  sku?: string;
  nextDeliveryDate?: string;
  isActive?: boolean;
}

export enum CartState {
  Active = 'Active',
  Frozen = 'Frozen',
  Merged = 'Merged',
  Ordered = 'Ordered',
}

export interface Cart extends DomainCart {
  lineItems: LineItem[];
  customerId?: string;
  directDiscounts?: number | undefined;
  itemShippingAddresses?: Address[];
  origin?: string;
  subscription?: Subscription;
  discountedAmount?: Money;
  cartState?: CartState;
  businessUnitKey?: string;
  storeKey?: string;
}

export interface Order extends Cart {
  cartId: string; //TODO: Rename
  orderVersion: string;
  orderState?: string;
  createdAt?: Date;
}

export interface Money {
  fractionDigits?: number;
  centAmount?: number;
  currencyCode?: string; // The currency code compliant to ISO 4217.
}

export interface Transaction {
  subtotal: { centAmount: number; currencyCode: Currency; fractionDigits: number };
  discount: { centAmount: number; currencyCode: Currency; fractionDigits: number };
  tax: { centAmount: number; currencyCode: Currency; fractionDigits: number };
  shipping: { centAmount: number; currencyCode: Currency; fractionDigits: number; isEstimated?: boolean };
  total: { centAmount: number; currencyCode: Currency; fractionDigits: number };
}
export interface Product extends DomainProduct {
  categories?: Category[];
  variants: Variant[];
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

