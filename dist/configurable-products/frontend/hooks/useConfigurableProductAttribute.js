export var useConfigurableProductAttribute = function (_a) {
    var productAttributes = _a.productAttributes;
    var findAttributeLabel = function (attributes) {
        var attributeValue = '';
        Object.keys(attributes || {}).forEach(function (key) {
            if (productAttributes.includes(key)) {
                attributeValue = attributes === null || attributes === void 0 ? void 0 : attributes[key];
            }
        });
        return attributeValue;
    };
    return {
        findAttributeLabel: findAttributeLabel,
    };
};
