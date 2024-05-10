var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useEffect, useMemo, useState } from 'react';
var useCartPredicateBuilder = function (sdk, translate) {
    var _a = useState({
        currencies: [],
        countries: [],
        states: [],
    }), projectSettings = _a[0], setProjectSettings = _a[1];
    var fields = useMemo(function () {
        var countries = projectSettings.countries, currencies = projectSettings.currencies;
        if (!countries.length || !currencies.length)
            return {};
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
    var isReady = useMemo(function () {
        return Object.keys(fields).length > 0;
    }, [fields]);
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sdk.callAction({
                            actionName: "project/getProjectSettings",
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.isError) {
                            return [2 /*return*/];
                        }
                        setProjectSettings(result.data);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    return {
        fields: fields,
        isReady: isReady,
    };
};
export default useCartPredicateBuilder;
