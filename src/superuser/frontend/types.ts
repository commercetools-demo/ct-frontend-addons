import { SDK } from '@commercetools/frontend-sdk';
import { ComposableCommerce, ComposableCommerceEvents } from '@commercetools/frontend-composable-commerce';
export interface SuperUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface SuperUserReturn {
  superUserData?: SuperUser;
  setSuperUser?: (superUser: SuperUser) => void;
}

export interface SuperUserDatasource {
  superuser?: {
    dataSource?: {
      superUser?: SuperUser;
    };
  };
}


export interface LineItem {
  lineItemId?: string;
}

export interface Money {
  fractionDigits?: number;
  centAmount?: number;
  currencyCode?: string; // The currency code compliant to ISO 4217.
}
