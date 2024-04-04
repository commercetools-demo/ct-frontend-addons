import { Money } from '@commercetools/frontend-domain-types/product';

declare class CurrencyHelpers {
    private static formatNumberForCurrency;
    private static formatStringForCurrency;
    private static getLocaleFromShortenedLocale;
    private static formatMoneyCurrency;
    /**
     * formatForCurrency formats a string of number into a cost representation. If
     * passing a string it must be numeric only.
     */
    static formatForCurrency: (costInCents: string | number | Money, locale?: string, currencyCode?: string, fractionDigits?: number) => string;
    static addCurrency: (value1?: Money, value2?: Money) => Money;
    static subtractCurrency: (value1: Money, value2: Money) => Money;
    static multiplyCurrency: (value: Money, numberOfItems: number) => Money;
}

export { CurrencyHelpers };
