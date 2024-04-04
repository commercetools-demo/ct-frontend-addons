type AccountLoginBody = {
    email?: string;
    password?: string;
    impersonatedCustomerEmail?: string;
};
type Account = {
    accountId?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
};
interface LineItem {
    lineItemId: string;
    variant: {
        attributes: Record<string, any>;
        sku?: string;
    };
    count: number;
    parentId?: string;
}
type Cart = {
    cartId: string;
    cartVersion: string;
    lineItems: LineItem[];
};
interface Order extends Cart {
    cartId: string;
    orderVersion: string;
    orderState?: string;
    createdAt?: Date;
}
interface Money {
    fractionDigits?: number;
    centAmount?: number;
    currencyCode?: string;
}

export type { Account, AccountLoginBody, Cart, LineItem, Money, Order };
