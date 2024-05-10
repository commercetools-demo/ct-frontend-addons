import { Order as CommercetoolsOrder } from '@commercetools/platform-sdk';
import { Order } from '../../../shared/types';
import { Locale } from '../../../utils/locale';

export const injectCartMapper = (BaseCartMapper: any): typeof BaseCartMapper => {
  return class CartMapper extends BaseCartMapper {
    static commercetoolsOrderToOrder: (
      commercetoolsOrder: CommercetoolsOrder,
      locale: Locale,
      defaultLocale: string,
    ) => Order = (commercetoolsOrder: CommercetoolsOrder, locale: Locale, defaultLocale: string) => {
      return {
        ...super.commercetoolsOrderToOrder(commercetoolsOrder, locale, defaultLocale),
        superUserEmail: commercetoolsOrder.custom?.fields?.superUserEmail,
      } as Order;
    };
  };
};
