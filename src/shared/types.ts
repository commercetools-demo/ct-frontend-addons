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
};

export interface LineItem {
  lineItemId: string;
  variant: {
      attributes: Record<string, any>
      sku?: string
  };
  count: number;
  parentId?: string;
}


export type Cart = {
  cartId: string;
  cartVersion: string;
  lineItems: LineItem[];
};

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

