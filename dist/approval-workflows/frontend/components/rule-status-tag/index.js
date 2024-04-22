import React from 'react';
var RuleStatusTag = function (_a) {
    var status = _a.status, translate = _a.translate, components = _a.components;
    var statusVariant = {
        Inactive: 'warning',
        Active: 'primary',
    };
    return (React.createElement(components.Tag, { className: "capitalize", variant: statusVariant[status] }, translate === null || translate === void 0 ? void 0 : translate("dashboard.rules.status.".concat(status.toLowerCase()))));
};
export default RuleStatusTag;
