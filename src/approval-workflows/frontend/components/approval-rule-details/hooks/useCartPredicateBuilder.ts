import { useEffect, useMemo, useState } from 'react';

const useCartPredicateBuilder = (sdk: any, translate: (key: string) => string) => {
  const [projectSettings, setProjectSettings] = useState({
    currencies: [],
    countries: [],
    states: [],
  });

  const fields: Record<
    string,
    {
      label: string;
      type: string;
      fieldSettings?: {
        listValues?: string[];
      };
    } | undefined
  > = useMemo(() => {
    const { countries, currencies } = projectSettings;
    if (!countries.length || !currencies.length) return {};

    return {
      'total.price': {
        label: translate('common.total.price'),
        type: 'text',
      },
      country: {
        label: translate('common.country'),
        type: 'select',
        fieldSettings: {
          listValues: countries,
        },
      },
      currency: {
        label: translate('common.currency'),
        type: 'select',
        fieldSettings: {
          listValues: currencies,
        },
      },

      'totalPrice.centAmount': {
        label: translate('common.total.price.cent.amount'),
        type: 'number',
      },
      'totalPrice.currencyCode': {
        label: translate('common.total.price.currency.code'),
        type: 'select',
        fieldSettings: {
          listValues: currencies,
        },
      },
      'taxedPrice.net': {
        label: translate('common.net.taxed.price'),
        type: 'text',
      },
      'taxedPrice.net.centAmount': {
        label: translate('common.net.taxed.price.cent.amount'),
        type: 'number',
      },
      'taxedPrice.net.currencyCode': {
        label: translate('common.net.taxed.price.currency.code'),
        type: 'select',
        fieldSettings: {
          listValues: currencies,
        },
      },
      'taxedPrice.gross': {
        label: translate('common.gross.taxed.price'),
        type: 'text',
      },
      'taxedPrice.gross.centAmount': {
        label: translate('common.gross.taxed.price.cent.amount'),
        type: 'number',
      },
      'taxedPrice.gross.currencyCode': {
        label: translate('common.gross.taxed.price.currency.code'),
        type: 'select',
        fieldSettings: {
          listValues: currencies,
        },
      },
      createdAt: {
        label: translate('common.created.at'),
        type: 'datetime',
      },

      'shippingAddress.firstName': {
        label: translate('common.shipping.address.first.name'),
        type: 'text',
      },
      'shippingAddress.lastName': {
        label: translate('common.shipping.address.last.name'),
        type: 'text',
      },
      'shippingAddress.streetName': {
        label: translate('common.shipping.address.street.name'),
        type: 'text',
      },
      'shippingAddress.streetNumber': {
        label: translate('common.shipping.address.street.number'),
        type: 'text',
      },
      'shippingAddress.additionalStreetInfo': {
        label: translate('common.shipping.address.additional.street.info'),
        type: 'text',
      },
      'shippingAddress.postalCode': {
        label: translate('common.shipping.address.postal.code'),
        type: 'text',
      },
      'shippingAddress.city': {
        label: translate('common.shipping.address.city'),
        type: 'text',
      },
      'shippingAddress.state': {
        label: translate('common.shipping.address.state'),
        type: 'text',
      },
      'shippingAddress.country': {
        label: translate('common.shipping.address.country'),
        type: 'select',
        fieldSettings: {
          listValues: countries,
        },
      },
      'billingAddress.firstName': {
        label: translate('common.billing.address.first.name'),
        type: 'text',
      },
      'billingAddress.lastName': {
        label: translate('common.billing.address.last.name'),
        type: 'text',
      },
      'billingAddress.streetName': {
        label: translate('common.billing.address.street.name'),
        type: 'text',
      },
      'billingAddress.streetNumber': {
        label: translate('common.billing.address.street.number'),
        type: 'text',
      },
      'billingAddress.additionalStreetInfo': {
        label: translate('common.billing.address.additional.street.info'),
        type: 'text',
      },
      'billingAddress.postalCode': {
        label: translate('common.billing.address.postal.code'),
        type: 'text',
      },
      'billingAddress.city': {
        label: translate('common.billing.address.city'),
        type: 'text',
      },
      'billingAddress.state': {
        label: translate('common.billing.address.state'),
        type: 'text',
      },
      'billingAddress.country': {
        label: translate('common.billing.address.country'),
        type: 'select',
        fieldSettings: {
          listValues: countries,
        },
      },
      'billingAddress.company': {
        label: translate('common.billing.address.company'),
        type: 'text',
      },

      'shippingInfo.shippingMethodName': {
        label: translate('common.shipping.info.shipping.method.name'),
        type: 'text',
      },
      'shippingInfo.price': {
        label: translate('common.shipping.info.price'),
        type: 'text',
      },
      'shippingInfo.price.centAmount': {
        label: translate('common.shipping.info.price.cent.amount'),
        type: 'number',
      },
      'shippingInfo.price.currencyCode': {
        label: translate('common.shipping.info.price.currency.code'),
        type: 'select',
        fieldSettings: {
          listValues: currencies,
        },
      },
      'shippingInfo.shippingRate.price': {
        label: translate('common.shipping.info.shipping.rate.price'),
        type: 'text',
      },
      'shippingInfo.shippingRate.price.centAmount': {
        label: translate('common.shipping.info.shipping.rate.price.cent.amount'),
        type: 'number',
      },
      'shippingInfo.shippingRate.price.currencyCode': {
        label: translate('common.shipping.info.shipping.rate.price.currency.code'),
        type: 'select',
        fieldSettings: {
          listValues: currencies,
        },
      },
      'shippingInfo.shippingRate.freeAbove': {
        label: translate('common.shipping.info.shipping.rate.free.above'),
        type: 'text',
      },
      'shippingInfo.shippingRate.freeAbove.centAmount': {
        label: translate('common.shipping.info.shipping.rate.free.above.cent.amount'),
        type: 'number',
      },
      'shippingInfo.shippingRate.freeAbove.currencyCode': {
        label: translate('common.shipping.info.shipping.rate.free.above.currency.code'),
        type: 'select',
        fieldSettings: {
          listValues: currencies,
        },
      },
      'shippingInfo.taxRate.name': {
        label: translate('common.shipping.info.tax.rate.name'),
        type: 'text',
      },
      'shippingInfo.taxRate.amount': {
        label: translate('common.shipping.info.tax.rate.amount'),
        type: 'number',
      },
      'shippingInfo.taxRate.includedInPrice': {
        label: translate('common.shipping.info.tax.rate.included.in.price'),
        type: 'boolean',
      },
      'shippingInfo.taxRate.country': {
        label: translate('common.shipping.info.tax.rate.country'),
        type: 'select',
        fieldSettings: {
          listValues: countries,
        },
      },
      'shippingInfo.taxRate.state': {
        label: translate('common.shipping.info.tax.rate.state'),
        type: 'text',
      },

      'customer.email': {
        label: translate('common.customer.email'),
        type: 'text',
      },
      'customer.customerNumber': {
        label: translate('common.customer.number'),
        type: 'text',
      },
      'customer.customerGroup.key': {
        label: translate('common.customer.group.key'),
        type: 'text',
      },
      'customer.firstName': {
        label: translate('common.customer.first.name'),
        type: 'text',
      },
      'customer.lastName': {
        label: translate('common.customer.last.name'),
        type: 'text',
      },
      'customer.middleName': {
        label: translate('common.customer.middle.name'),
        type: 'text',
      },
      'customer.title': {
        label: translate('common.customer.title'),
        type: 'text',
      },
      'customer.isEmailVerified': {
        label: translate('common.customer.is.email.verified'),
        type: 'boolean',
      },
      'customer.externalId': {
        label: translate('common.customer.external.id'),
        type: 'text',
      },
      'customer.createdAt': {
        label: translate('common.customer.created.at'),
        type: 'datetime',
      },
      /*
            // Predicate functions
            lineItemCount: {
              label: 'lineItemCount',
              ruleTypes: createCartDiscountRuleDefinitions('lineItemCount', intl, {
                numberFormat: language,
                allowFloat: true,
                warnings: [],
              }),
              group: DiscountPredicateGroups.function,
            },
            customLineItemCount: {
              label: 'customLineItemCount',
              ruleTypes: createCartDiscountRuleDefinitions('customLineItemCount', intl, {
                numberFormat: language,
                allowFloat: true,
                warnings: [],
              }),
              group: DiscountPredicateGroups.function,
            },
            lineItemTotal: {
              label: 'lineItemTotal',
              ruleTypes: createCartDiscountRuleDefinitions('lineItemTotal', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            },
            customLineItemTotal: {
              label: 'customLineItemTotal',
              ruleTypes: createCartDiscountRuleDefinitions('customLineItemTotal', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            },
            lineItemNetTotal: {
              label: 'lineItemNetTotal',
              ruleTypes: createCartDiscountRuleDefinitions('lineItemNetTotal', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            },
            customLineItemNetTotal: {
              label: 'customLineItemNetTotal',
              ruleTypes: createCartDiscountRuleDefinitions('customLineItemNetTotal', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            },
            lineItemGrossTotal: {
              label: 'lineItemGrossTotal',
              ruleTypes: createCartDiscountRuleDefinitions('lineItemGrossTotal', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            },
            customLineItemGrossTotal: {
              label: 'customLineItemGrossTotal',
              ruleTypes: createCartDiscountRuleDefinitions('customLineItemGrossTotal', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            },
            lineItemExists: {
              label: 'lineItemExists',
              ruleTypes: createCartDiscountRuleDefinitions('lineItemExists', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            },
            forAllLineItems: {
              label: 'forAllLineItems',
              ruleTypes: createCartDiscountRuleDefinitions('forAllLineItems', intl, {
                isSearchable: true,
              }),
              group: DiscountPredicateGroups.function,
            }, */
    };
  }, [projectSettings.countries, projectSettings.currencies]);

  const isReady = useMemo(() => {
    return Object.keys(fields).length > 0;
  }, [fields]);

  useEffect(() => {
    (async () => {
      const result = await sdk.callAction({
        actionName: `project/getProjectSettings`,
      });
      if (result.isError) {
        return;
      }
      setProjectSettings(result.data);
    })();
  }, []);

  return {
    fields,
    isReady,
  };
};

export default useCartPredicateBuilder;
