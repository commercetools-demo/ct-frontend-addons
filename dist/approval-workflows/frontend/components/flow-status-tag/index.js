import React from 'react';
var FlowStatusTag = function (_a) {
    var status = _a.status, translate = _a.translate, components = _a.components;
    var statusVariant = {
        Pending: 'warning',
        Approved: 'primary',
        Rejected: 'danger',
    };
    return (React.createElement(components.Tag, { className: "capitalize", variant: statusVariant[status] }, translate === null || translate === void 0 ? void 0 : translate("dashboard.flows.status.".concat(status.toLowerCase()))));
};
export default FlowStatusTag;
