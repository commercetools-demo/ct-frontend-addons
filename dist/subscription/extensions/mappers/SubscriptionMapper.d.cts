import { Cart } from '@commercetools/platform-sdk';
import { Cart as Cart$1 } from '../../../shared/types.cjs';
import { Locale } from '../../../utils/locale.cjs';
import { Configuration } from '../../types.cjs';
import '@commercetools/frontend-domain-types/product';
import '@commercetools/frontend-domain-types/product/Product';
import '@commercetools/frontend-domain-types/cart/Cart';
import '@commercetools/frontend-domain-types/cart/LineItem';
import '@commercetools/frontend-domain-types/account/Address';
import '../../../types-B2_pD38A.cjs';
import '@frontastic/extension-types';

interface SubscriptionMapperType {
    commercetoolsCartToCart(commercetoolsCart: Cart, locale: Locale, originalOrderFieldKey?: string, subscriptionSKUFieldKey?: string, subscriptionProductFieldKey?: string, nextRecurrenceFieldKey?: string, isActiveFieldKey?: string): Cart$1;
}
declare const createSubscriptionMapper: (configuration: Configuration) => SubscriptionMapperType;

export { createSubscriptionMapper };
