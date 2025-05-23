import { ProductDiscountedPrice } from '../cart/Discount';
import { Attributes } from './Attributes';
import { Money } from './Money';

export interface Variant {
  id?: string;
  sku: string;
  groupId?: string;
  price?: Money;
  discountedPrice?: ProductDiscountedPrice;
  attributes?: Attributes;
  images?: string[];
  assets?: string[];
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  isMatchingVariant?: boolean;
  pricesWithRecurringPolicies?: {
    price: Money;
    discountedPrice?: ProductDiscountedPrice;
    recurrencePolicyId: string;
  }[];
}
