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
import React, { useMemo } from 'react';
import Refinements from './refinements';
import CurrentRefinements from './current-refinements';
import RulesTable from './rules-table';
var ApprovalRules = function (_a) {
    var translate = _a.translate, permissions = _a.permissions, components = _a.components, rules = _a.rules, onClearRefinements = _a.onClearRefinements, onStatusRefine = _a.onStatusRefine, onCreationDateRefine = _a.onCreationDateRefine, onSearch = _a.onSearch, sortOptions = _a.sortOptions, onSortBy = _a.onSortBy, filters = _a.filters, statusOptions = _a.statusOptions, totalItems = _a.totalItems, page = _a.page, onPageChange = _a.onPageChange, onRowsPerPageChange = _a.onRowsPerPageChange, limit = _a.limit;
    var refinementProps = {
        rules: rules,
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
    var tableProps = { rules: rules, totalItems: totalItems, page: page, limit: limit, components: components, onPageChange: onPageChange, onRowsPerPageChange: onRowsPerPageChange, translate: translate };
    var viewOnly = useMemo(function () { return !(permissions === null || permissions === void 0 ? void 0 : permissions.UpdateApprovalRules); }, [permissions]);
    var buttonLink = '/create-approval-rule';
    return (React.createElement("div", { className: "w-full" },
        React.createElement(Refinements, __assign({}, refinementProps),
            React.createElement(components.Link, { href: !viewOnly ? buttonLink : '', className: "block w-full md:w-fit", underlineOnHover: false },
                React.createElement(components.Button, { size: "m", className: "w-full px-6", disabled: viewOnly }, translate('dashboard.new.rule')))),
        React.createElement(CurrentRefinements, __assign({}, currentRefinementsProps)),
        React.createElement(RulesTable, __assign({}, tableProps))));
};
export default ApprovalRules;
