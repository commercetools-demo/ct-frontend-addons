var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import RefinementsDrawer from './refinements-drawer';
import Refinements from './refinements';
import CurrentRefinements from './current-refinements';
import FlowsTable from './flows-table';
var ApprovalFlows = function (_a) {
    var translate = _a.translate, components = _a.components, flows = _a.flows, onClearRefinements = _a.onClearRefinements, onStatusRefine = _a.onStatusRefine, onCreationDateRefine = _a.onCreationDateRefine, onSearch = _a.onSearch, sortOptions = _a.sortOptions, onSortBy = _a.onSortBy, filters = _a.filters, statusOptions = _a.statusOptions, totalItems = _a.totalItems, page = _a.page, onPageChange = _a.onPageChange, onRowsPerPageChange = _a.onRowsPerPageChange, limit = _a.limit;
    var refinementProps = {
        flows: flows,
        onClearRefinements: onClearRefinements,
        onSearch: onSearch,
        onStatusRefine: onStatusRefine,
        onCreationDateRefine: onCreationDateRefine,
        sortOptions: sortOptions,
        onSortBy: onSortBy,
        filters: filters,
        statusOptions: statusOptions,
        translate: translate,
        components: components,
    };
    var currentRefinementsProps = {
        translate: translate,
        onClearRefinements: onClearRefinements,
        filters: filters,
        onSearch: onSearch,
        onStatusRefine: onStatusRefine,
        onCreationDateRefine: onCreationDateRefine,
    };
    var tableProps = { flows: flows, totalItems: totalItems, page: page, limit: limit, components: components, onPageChange: onPageChange, onRowsPerPageChange: onRowsPerPageChange, translate: translate };
    return (React.createElement("div", { className: "w-full" },
        React.createElement(RefinementsDrawer, __assign({}, refinementProps)),
        React.createElement(Refinements, __assign({}, refinementProps)),
        React.createElement(CurrentRefinements, __assign({}, currentRefinementsProps)),
        React.createElement(FlowsTable, __assign({}, tableProps))));
};
export default ApprovalFlows;
