import React from 'react';
var Refinements = function (_a) {
    var _b;
    var filters = _a.filters, onSearch = _a.onSearch, statusOptions = _a.statusOptions, onStatusRefine = _a.onStatusRefine, onCreationDateRefine = _a.onCreationDateRefine, translate = _a.translate, components = _a.components;
    var refinements = [
        {
            title: 'flows.label',
            Component: (React.createElement(components.SearchInput, { className: "h-[38px] w-[360px]", searchValue: (_b = filters === null || filters === void 0 ? void 0 : filters.search) !== null && _b !== void 0 ? _b : '', variant: "xs", placeholder: "".concat(translate === null || translate === void 0 ? void 0 : translate('dashboard.search.for.flows'), "..."), handleOnChange: function (val) { return onSearch === null || onSearch === void 0 ? void 0 : onSearch(val); } })),
        },
        {
            title: 'common.status',
            Component: (React.createElement(components.RefinementDropdown, { size: "lg", className: "w-[200px]", options: (statusOptions !== null && statusOptions !== void 0 ? statusOptions : []).map(function (_a) {
                    var _b;
                    var name = _a.name, value = _a.value, count = _a.count;
                    return ({
                        name: name,
                        value: value,
                        count: count,
                        selected: !!((_b = filters === null || filters === void 0 ? void 0 : filters.status) === null || _b === void 0 ? void 0 : _b.includes(value)),
                        onSelected: function () { return onStatusRefine === null || onStatusRefine === void 0 ? void 0 : onStatusRefine(value); },
                    });
                }) }, translate === null || translate === void 0 ? void 0 : translate('common.select'))),
        },
        {
            title: 'dashboard.creation.date',
            Component: (React.createElement(components.Dropdown, { size: "lg", className: "w-[200px]" },
                React.createElement(components.Dropdown.Button, null, translate === null || translate === void 0 ? void 0 : translate('common.select')),
                React.createElement(components.Dropdown.Options, { className: "max-h-[unset] w-max" },
                    React.createElement(components.DatePicker, { mode: "range", selected: {
                            from: (filters === null || filters === void 0 ? void 0 : filters.createdFrom) ? new Date(filters === null || filters === void 0 ? void 0 : filters.createdFrom) : undefined,
                            to: (filters === null || filters === void 0 ? void 0 : filters.createdTo) ? new Date(filters === null || filters === void 0 ? void 0 : filters.createdTo) : undefined,
                        }, onSelect: function (range) { return onCreationDateRefine === null || onCreationDateRefine === void 0 ? void 0 : onCreationDateRefine({ from: range === null || range === void 0 ? void 0 : range.from, to: range === null || range === void 0 ? void 0 : range.to }); } })))),
        },
    ];
    return (React.createElement("div", { className: "hidden gap-3 lg:flex" }, refinements.map(function (_a, index) {
        var title = _a.title, Component = _a.Component;
        return (React.createElement("div", { key: index },
            React.createElement("h5", { className: "text-14 text-gray-700" }, translate === null || translate === void 0 ? void 0 : translate(title)),
            React.createElement("div", { className: "mt-2" }, Component)));
    })));
};
export default Refinements;
