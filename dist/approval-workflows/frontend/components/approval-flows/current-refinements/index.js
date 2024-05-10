import React, { useMemo } from 'react';
import { XMarkIcon as CloseIcon } from '@heroicons/react/24/solid';
var CurrentRefinements = function (_a) {
    var _b;
    var filters = _a.filters, onClearRefinements = _a.onClearRefinements, onStatusRefine = _a.onStatusRefine, onCreationDateRefine = _a.onCreationDateRefine, translate = _a.translate;
    var appliedFilters = useMemo(function () {
        var _a;
        var result = [];
        if (!filters)
            return result;
        if ((_a = filters.status) === null || _a === void 0 ? void 0 : _a.length)
            result.push.apply(result, filters.status.map(function (status) { return ({
                name: (translate === null || translate === void 0 ? void 0 : translate("dashbaord.flows.status.".concat(status.toLowerCase()))) || status,
                onRefine: function () { return onStatusRefine === null || onStatusRefine === void 0 ? void 0 : onStatusRefine(status); },
            }); }));
        if (filters.createdFrom || filters.createdTo) {
            result.push({
                name: "".concat(filters.createdFrom ? new Date(filters.createdFrom).toLocaleDateString() : '', " : ").concat(filters.createdTo ? new Date(filters.createdTo).toLocaleDateString() : ''),
                onRefine: function () { return onCreationDateRefine === null || onCreationDateRefine === void 0 ? void 0 : onCreationDateRefine({ from: undefined, to: undefined }); },
            });
        }
        return result;
    }, [filters, onStatusRefine, onCreationDateRefine, translate]);
    if (!((_b = filters === null || filters === void 0 ? void 0 : filters.status) === null || _b === void 0 ? void 0 : _b.length) && !(filters === null || filters === void 0 ? void 0 : filters.createdFrom) && !(filters === null || filters === void 0 ? void 0 : filters.createdTo))
        return React.createElement(React.Fragment, null);
    return (React.createElement("div", { className: "mt-5 lg:mt-8" },
        React.createElement("div", { className: "flex flex-wrap gap-3" },
            React.createElement("div", { className: "cursor-pointer rounded-md border border-gray-300 px-2 py-[6px] text-14 leading-[20px] text-gray-700", onClick: onClearRefinements }, translate === null || translate === void 0 ? void 0 : translate('dashboard.clear.all')),
            appliedFilters.map(function (_a) {
                var name = _a.name, onRefine = _a.onRefine;
                return (React.createElement("div", { key: name, className: "flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-200 px-2 py-[6px] text-14 leading-[20px] text-gray-700" },
                    React.createElement("span", null, name),
                    React.createElement(CloseIcon, { className: "cursor-pointer text-gray-700", width: 16, height: 16, onClick: onRefine })));
            }))));
};
export default CurrentRefinements;
