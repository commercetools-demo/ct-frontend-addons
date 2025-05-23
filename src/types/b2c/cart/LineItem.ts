import { DiscountedPricePerCount, ProductDiscountedPrice } from './Discount';
import { Money, Variant } from '../product';
import { Tax } from './Tax';
import { TaxRate } from './TaxRate';
import { RecurringPolicy } from '../recurring-order/policy';
export interface LineItem {
  recurringPolicyId?: string;
  lineItemId?: string;
  productId?: string;
  productSlug?: string;
  name?: string;
  type?: string;
  count?: number;
  price?: Money; // Price of a single item
  discountedPrice?: ProductDiscountedPrice; // Discounted price per item
  discountedPricePerCount?: DiscountedPricePerCount[];
  totalPrice?: Money;
  taxed?: Tax;
  taxRate?: TaxRate;
  variant?: Variant;
  isGift?: boolean;
  _url?: string;
  recurrencePolicy?: RecurringPolicy;
}
