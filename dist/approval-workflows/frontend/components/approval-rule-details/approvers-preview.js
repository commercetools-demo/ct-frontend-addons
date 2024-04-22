import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Tree, TreeNode } from 'react-organizational-chart';
var ApproversPreview = function (_a) {
    var tiers = _a.tiers, isPreview = _a.isPreview, previewApprovedRoles = _a.previewApprovedRoles, previewRejecteddRoles = _a.previewRejecteddRoles, onEdit = _a.onEdit, translate = _a.translate, components = _a.components;
    return (React.createElement("div", { className: "border border-primary-300 p-2" },
        React.createElement("span", null, translate('dashboard.rule.details.approvers')),
        React.createElement("div", { className: "flex flex-row flex-wrap" }, tiers === null || tiers === void 0 ? void 0 : tiers.map(function (tier, i) {
            var _a;
            return (React.createElement("div", { className: tiers.length > 1 ? 'w-1/2' : 'w-full', key: i },
                React.createElement(Tree, { lineWidth: '2px', lineColor: 'var(--accent-500)', lineBorderRadius: '10px', label: "Tier ".concat(i + 1) }, (_a = tier.and) === null || _a === void 0 ? void 0 : _a.map(function (and, idx) {
                    var _a;
                    return (React.createElement(TreeNode, { key: idx, label: "AND" }, (_a = and.or) === null || _a === void 0 ? void 0 : _a.map(function (or, index) { return (React.createElement(TreeNode, { key: index, label: "OR" },
                        React.createElement("div", { className: "mx-auto mt-1 flex items-center border border-accent-300 p-1" },
                            React.createElement("span", null, or.associateRole.key),
                            !!(previewApprovedRoles === null || previewApprovedRoles === void 0 ? void 0 : previewApprovedRoles.length) && previewApprovedRoles.includes(or.associateRole.key) && (React.createElement(CheckIcon, { className: "ml-2 h-4 w-4 text-green-600" })),
                            !!(previewRejecteddRoles === null || previewRejecteddRoles === void 0 ? void 0 : previewRejecteddRoles.length) && previewRejecteddRoles.includes(or.associateRole.key) && (React.createElement(XMarkIcon, { className: "ml-2 h-4 w-4 text-red-600" }))))); })));
                }))));
        })),
        !isPreview && (React.createElement("div", { className: "mt-2 w-full border-t" },
            React.createElement(components.Button, { variant: "primary", size: "s", type: "button", onClick: onEdit }, translate('dashboard.rule.details.edit'))))));
};
export default ApproversPreview;
