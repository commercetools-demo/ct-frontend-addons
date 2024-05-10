import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { childComponentsAttributeName } from '../../hooks/useChildComponents';
import { useBundledItemsContext } from '../../providers/bundled-items';
import { useConfigurableProductAttribute } from '../../hooks/useConfigurableProductAttribute';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
var BundledItems = function (_a) {
    var _b, _c, _d, _e, _f;
    var item = _a.item;
    var _g = useBundledItemsContext(), cart = _g.cart, productAttributes = _g.productAttributes;
    var findAttributeLabel = useConfigurableProductAttribute({ productAttributes: productAttributes }).findAttributeLabel;
    var locale = useParams().locale;
    var lineItem = useMemo(function () { var _a; return (_a = cart === null || cart === void 0 ? void 0 : cart.lineItems) === null || _a === void 0 ? void 0 : _a.find(function (li) { return li.lineItemId === item.id; }); }, [cart, item]);
    if (!lineItem)
        return null;
    return (React.createElement("div", null, !!((_d = (_c = (_b = lineItem.variant) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c[childComponentsAttributeName]) === null || _d === void 0 ? void 0 : _d.length) &&
        ((_f = (_e = lineItem.variant) === null || _e === void 0 ? void 0 : _e.attributes) === null || _f === void 0 ? void 0 : _f[childComponentsAttributeName].map(function (bundle) {
            var _a, _b;
            return (React.createElement("div", { className: "flex items-center", key: bundle.lineItemId },
                React.createElement("p", { className: "text-12 font-semibold leading-loose text-gray-600" }, "".concat(bundle.name, ":"),
                    React.createElement("span", { className: "ml-2 text-10 font-normal" }, "".concat(findAttributeLabel((_a = bundle.variant) === null || _a === void 0 ? void 0 : _a.attributes)))),
                React.createElement("p", { className: "ml-2 text-10 font-normal leading-loose text-gray-600" }, !!((_b = bundle.price) === null || _b === void 0 ? void 0 : _b.centAmount) ? " ".concat(CurrencyHelpers.formatForCurrency(bundle.price, locale)) : '')));
        }))));
};
export default BundledItems;
