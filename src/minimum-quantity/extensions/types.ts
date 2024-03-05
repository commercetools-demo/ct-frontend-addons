export interface LineItem {
    lineItemId: string;
    variant: {
        attributes: Record<string, any>
    };
    count: number;
}
export interface Cart {
    cartId: string;
    cartVersion: string;
    lineItems: LineItem[];
}