import React from 'react';
import FlowStatusTag from '../../flow-status-tag';
var FlowsTable = function (_a) {
    var flows = _a.flows, _b = _a.totalItems, totalItems = _b === void 0 ? 0 : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, onPageChange = _a.onPageChange, onRowsPerPageChange = _a.onRowsPerPageChange, translate = _a.translate, components = _a.components, _d = _a.limit, limit = _d === void 0 ? 25 : _d;
    var Table = components === null || components === void 0 ? void 0 : components.Table;
    return (React.createElement(Table, { className: "mt-8" },
        React.createElement(Table.Container, { className: "table-fixed rounded-md" },
            React.createElement(Table.Head, { className: "border-b text-12 font-bold" },
                React.createElement(Table.Cell, null, translate === null || translate === void 0 ? void 0 : translate('common.status')),
                React.createElement(Table.Cell, null, translate === null || translate === void 0 ? void 0 : translate('common.id')),
                React.createElement(Table.Cell, null, translate === null || translate === void 0 ? void 0 : translate('common.date')),
                React.createElement(Table.Cell, null, translate === null || translate === void 0 ? void 0 : translate('common.order.number')),
                React.createElement(Table.Cell, { isButtonsHead: true })),
            React.createElement(Table.Body, null, (flows !== null && flows !== void 0 ? flows : []).map(function (_a) {
                var id = _a.id, status = _a.status, order = _a.order, createdAt = _a.createdAt;
                return (React.createElement(Table.Row, { key: id },
                    React.createElement(Table.Cell, null,
                        React.createElement("div", { className: "flex items-center justify-between gap-2" },
                            React.createElement(FlowStatusTag, { status: status, components: components, translate: translate }))),
                    React.createElement(Table.Cell, null,
                        React.createElement("span", { className: "block max-w-full truncate" }, id)),
                    React.createElement(Table.Cell, null, new Date(createdAt).toLocaleDateString()),
                    React.createElement(Table.Cell, null, order.orderNumber),
                    React.createElement(Table.Cell, { isButtonsCell: true },
                        React.createElement("div", { className: "flex justify-end" },
                            React.createElement(components.Link, { href: "/approval-flow/".concat(id.replace(/\s+/g, '-')), underlineOnHover: false },
                                React.createElement(components.Button, { variant: "secondary" }, translate === null || translate === void 0 ? void 0 : translate('common.view')))))));
            }))),
        React.createElement(Table.Pagination, { page: page, limit: limit, totalItems: totalItems, onNext: function () { return onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(page + 1); }, onPrevious: function () { return onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(page - 1); }, onRowsPerPageChange: onRowsPerPageChange })));
};
export default FlowsTable;
