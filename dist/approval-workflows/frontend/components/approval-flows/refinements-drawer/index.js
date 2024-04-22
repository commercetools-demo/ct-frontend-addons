import React from 'react';
import { AdjustmentsHorizontalIcon as FiltersIcon } from '@heroicons/react/24/outline';
import useDisclosure from '../../../hooks/useDisclosure';
var RefinementsDrawer = function (_a) {
    var _b;
    var flows = _a.flows, sortOptions = _a.sortOptions, filters = _a.filters, onSortBy = _a.onSortBy, onSearch = _a.onSearch, onClearRefinements = _a.onClearRefinements, statusOptions = _a.statusOptions, onStatusRefine = _a.onStatusRefine, onCreationDateRefine = _a.onCreationDateRefine, translate = _a.translate, components = _a.components;
    var _c = useDisclosure(), isOpen = _c.isOpen, onOpen = _c.onOpen, onClose = _c.onClose;
    var _d = useDisclosure(), isDatePickerOpen = _d.isOpen, onCloseDatePicker = _d.onClose, onToggleDatePicker = _d.onToggle;
    var refinements = [
        {
            title: 'product.sortBy',
            Component: (React.createElement("div", { className: "flex flex-col gap-7" }, (sortOptions !== null && sortOptions !== void 0 ? sortOptions : []).map(function (_a) {
                var name = _a.name, value = _a.value;
                return (React.createElement(components.Radio, { key: value, label: name, checked: value === (filters === null || filters === void 0 ? void 0 : filters.sort), onSelected: function () { return onSortBy === null || onSortBy === void 0 ? void 0 : onSortBy(value); } }));
            }))),
        },
        {
            title: 'dashboard.quote.search',
            Component: (React.createElement(components.SearchInput, { searchValue: (_b = filters === null || filters === void 0 ? void 0 : filters.search) !== null && _b !== void 0 ? _b : '', variant: "sm", placeholder: "".concat(translate === null || translate === void 0 ? void 0 : translate('dashboard.search.for.flows'), "..."), handleOnChange: function (val) { return onSearch === null || onSearch === void 0 ? void 0 : onSearch(val); } })),
        },
        {
            title: 'dashboard.order.status',
            Component: (React.createElement("div", { className: "flex flex-col gap-7" }, (statusOptions !== null && statusOptions !== void 0 ? statusOptions : []).map(function (_a) {
                var _b;
                var name = _a.name, value = _a.value;
                return (React.createElement(components.Checkbox, { key: value, label: name, checked: (_b = filters === null || filters === void 0 ? void 0 : filters.status) === null || _b === void 0 ? void 0 : _b.includes(value), onChecked: function (checked) { return onStatusRefine === null || onStatusRefine === void 0 ? void 0 : onStatusRefine(checked ? value : ''); } }));
            }))),
        },
        {
            title: 'dashboard.creation.date',
            Component: (React.createElement("div", null,
                React.createElement("div", { onClick: onToggleDatePicker, className: "rounded-md border border-gray-300 px-3 py-2 text-14 text-gray-600" }, (filters === null || filters === void 0 ? void 0 : filters.createdFrom) || (filters === null || filters === void 0 ? void 0 : filters.createdTo)
                    ? "".concat(filters.createdFrom ? new Date(filters.createdFrom).toLocaleDateString() : '', " : ").concat(filters.createdTo ? new Date(filters.createdTo).toLocaleDateString() : '')
                    : 'dd/mm/yy'),
                isDatePickerOpen && (React.createElement("div", null,
                    React.createElement(components.DatePicker, { mode: "range", selected: {
                            from: (filters === null || filters === void 0 ? void 0 : filters.createdFrom) ? new Date(filters === null || filters === void 0 ? void 0 : filters.createdFrom) : undefined,
                            to: (filters === null || filters === void 0 ? void 0 : filters.createdTo) ? new Date(filters === null || filters === void 0 ? void 0 : filters.createdTo) : undefined,
                        }, onSelect: function (range) { return onCreationDateRefine === null || onCreationDateRefine === void 0 ? void 0 : onCreationDateRefine({ from: range === null || range === void 0 ? void 0 : range.from, to: range === null || range === void 0 ? void 0 : range.to }); } }),
                    React.createElement("div", { className: "mt-2 flex items-center justify-end gap-8 pr-8" },
                        React.createElement("span", { className: "text-14 font-medium uppercase text-primary", onClick: onCloseDatePicker }, translate === null || translate === void 0 ? void 0 : translate('common.cancel')),
                        React.createElement("span", { className: "text-14 font-medium uppercase text-primary", onClick: function () {
                                onCloseDatePicker();
                            } }, translate === null || translate === void 0 ? void 0 : translate('common.save'))))))),
        },
    ];
    return (React.createElement("div", { className: "lg:hidden" },
        React.createElement("button", { className: "flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 p-2 text-14 text-gray-600 transition hover:bg-gray-50 md:w-fit md:grow-0", onClick: onOpen },
            React.createElement("span", null, translate === null || translate === void 0 ? void 0 : translate('product.sortAndFilter')),
            React.createElement(FiltersIcon, { width: 20 })),
        React.createElement(components.Drawer, { isOpen: isOpen, onClose: onClose, direction: "left", headline: translate === null || translate === void 0 ? void 0 : translate('product.sortAndFilter'), className: "h-[100vh] w-[90vw] max-w-[350px]", headerClassName: "border-y border-neutral-400" },
            React.createElement("div", { className: "flex h-full flex-col" },
                React.createElement("div", { className: "grow overflow-y-auto px-4 lg:px-5" }, refinements.map(function (_a, index) {
                    var title = _a.title, Component = _a.Component;
                    return (React.createElement("div", { key: index, className: "border-b border-neutral-400" },
                        React.createElement(components.Accordion, { className: "border-none" },
                            React.createElement(components.Accordion.Button, { className: "py-5", defaultSpacing: false },
                                React.createElement("span", { className: "text-14 font-bold" }, translate === null || translate === void 0 ? void 0 : translate(title))),
                            React.createElement(components.Accordion.Panel, { defaultSpacing: false, className: "pb-6" }, Component))));
                })),
                React.createElement("div", { className: "flex items-center gap-3 border-t border-neutral-400 p-4 lg:p-5" },
                    React.createElement(components.Button, { variant: "secondary", className: "flex-1", onClick: function () {
                            onClearRefinements === null || onClearRefinements === void 0 ? void 0 : onClearRefinements();
                            onClose();
                        } }, translate === null || translate === void 0 ? void 0 : translate('product.clear.all')),
                    React.createElement(components.Button, { variant: "primary", className: "flex-1", onClick: onClose }, translate === null || translate === void 0 ? void 0 :
                        translate('common.view'),
                        " (", flows === null || flows === void 0 ? void 0 :
                        flows.length,
                        ")"))))));
};
export default RefinementsDrawer;
