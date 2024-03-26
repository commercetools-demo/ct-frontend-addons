interface SuperUser {
    email: string;
    firstName: string;
    lastName: string;
}
interface SuperUserReturn {
    superUserData?: SuperUser;
    setSuperUser?: (superUser: SuperUser) => void;
}
interface SuperUserDatasource {
    superuser?: {
        dataSource?: {
            superUser?: SuperUser;
        };
    };
}
interface LineItem {
    lineItemId?: string;
}
interface Money {
    fractionDigits?: number;
    centAmount?: number;
    currencyCode?: string;
}

export type { LineItem, Money, SuperUser, SuperUserDatasource, SuperUserReturn };
