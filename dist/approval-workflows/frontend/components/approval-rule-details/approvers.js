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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect } from 'react';
var Approvers = function (_a) {
    var initialTiers = _a.tiers, onUpdate = _a.onUpdate, onPreview = _a.onPreview, associateRoles = _a.associateRoles, translate = _a.translate, components = _a.components;
    var _b = useState(initialTiers), tiers = _b[0], setTiers = _b[1];
    var addTier = function () {
        var newTiers = __spreadArray(__spreadArray([], tiers, true), [
            {
                id: new Date().getTime(),
                and: [],
            },
        ], false);
        setTiers(newTiers);
    };
    var removeTier = function (id) {
        var newTiers = tiers.filter(function (tier) { return tier.id !== id; });
        setTiers(newTiers);
    };
    var addAndGroup = function (id) {
        var newTiers = tiers.map(function (tier) {
            if (tier.id === id) {
                return {
                    id: id,
                    and: __spreadArray(__spreadArray([], tier.and, true), [
                        {
                            id: new Date().getTime(),
                            or: [],
                        },
                    ], false),
                };
            }
            return tier;
        });
        setTiers(newTiers);
    };
    var removeAndGroup = function (tierId, andId) {
        var newTiers = tiers.map(function (tier) {
            if (tier.id === tierId) {
                return {
                    id: tierId,
                    and: tier.and.filter(function (and) { return and.id !== andId; }),
                };
            }
            return tier;
        });
        setTiers(newTiers);
    };
    var addOrGroup = function (tierId, andGroupId) {
        var newTiers = tiers.map(function (tier) {
            if (tier.id === tierId) {
                return {
                    id: tierId,
                    and: tier.and.map(function (and) {
                        if (and.id === andGroupId) {
                            return {
                                id: andGroupId,
                                or: __spreadArray(__spreadArray([], and.or, true), [
                                    {
                                        id: new Date().getTime(),
                                        associateRole: {
                                            typeId: 'associate-role',
                                            key: associateRoles === null || associateRoles === void 0 ? void 0 : associateRoles[0].value,
                                        },
                                    },
                                ], false),
                            };
                        }
                        return and;
                    }),
                };
            }
            return tier;
        });
        // @ts-ignore
        setTiers(newTiers);
    };
    var removeOrGroup = function (tierId, andGroupId, orGroupId) {
        var newTiers = tiers.map(function (tier) {
            if (tier.id === tierId) {
                return {
                    id: tierId,
                    and: tier.and.map(function (and) {
                        if (and.id === andGroupId) {
                            return {
                                id: andGroupId,
                                or: and.or.filter(function (or) { return or.id !== orGroupId; }),
                            };
                        }
                        return and;
                    }),
                };
            }
            return tier;
        });
        // @ts-ignore
        setTiers(newTiers);
    };
    var updateAssociateRole = function (tierId, andGroupId, orGroupId, value) {
        var newTiers = tiers.map(function (tier) {
            if (tier.id === tierId) {
                return {
                    id: tierId,
                    and: tier.and.map(function (and) {
                        if (and.id === andGroupId) {
                            return {
                                id: andGroupId,
                                or: and.or.map(function (or) {
                                    if (or.id === orGroupId) {
                                        return __assign(__assign({}, or), { associateRole: __assign(__assign({}, or.associateRole), { key: value }) });
                                    }
                                    return or;
                                }),
                            };
                        }
                        return and;
                    }),
                };
            }
            return tier;
        });
        // @ts-ignore
        setTiers(newTiers);
    };
    useEffect(function () {
        if (tiers) {
            onUpdate(tiers);
        }
    }, [tiers]);
    if (!(associateRoles === null || associateRoles === void 0 ? void 0 : associateRoles.length)) {
        return null;
    }
    return (React.createElement("div", { className: "border-primary-400 flex w-full flex-col items-end border p-2" },
        React.createElement("div", { className: "flex w-full flex-row-reverse justify-between" },
            React.createElement(components.Button, { type: "button", variant: "primary", size: "s", onClick: addTier, "data-cy": "approvers-add-tier" },
                React.createElement("span", { className: "text-xs" }, translate('dashboard.rule.details.add.tier')))),
        !!tiers.length && (React.createElement("div", { className: "mt-2 flex w-full flex-col" }, tiers.map(function (tier, i) { return (React.createElement("div", { className: "border-primary-300 mt-2 flex w-full flex-col border p-2", key: tier.id },
            React.createElement("div", { className: "flex w-full flex-row justify-between" },
                React.createElement("div", { className: "py-1/2 px-1 " },
                    React.createElement("span", null, "Tier ".concat(i + 1))),
                React.createElement("div", { className: "flex gap-x-1" },
                    React.createElement(components.Button, { type: "button", variant: "warning", size: "s", onClick: function () { return removeTier(tier.id); } },
                        React.createElement("span", { className: "whitespace-nowrap text-xs" }, translate('dashboard.rule.details.remove.tier'))),
                    React.createElement(components.Button, { type: "button", variant: "secondary", size: "s", onClick: function () { return addAndGroup(tier.id); }, "data-cy": "approvers-add-and" },
                        React.createElement("span", { className: "whitespace-nowrap text-xs" }, translate('dashboard.rule.details.add.and'))))),
            React.createElement("div", null,
                React.createElement("div", { className: "my-4 flex w-full grow flex-col" },
                    React.createElement("span", { className: "py-1/2 w-fit bg-primary px-1 text-neutral-100 rounded-md" }, translate('dashboard.rule.details.conjunctions')),
                    tier.and.map(function (and) { return (React.createElement("div", { className: "approvers__group-item ml-6 ", key: and.id },
                        React.createElement("div", { className: "approvers__group-wrapper border-primary-300 mb-2 flex grow flex-col border" },
                            React.createElement("div", { className: "flex w-full grow flex-row justify-end gap-x-2 p-2" },
                                React.createElement(components.Button, { type: "button", variant: "warning", size: "s", onClick: function () { return removeAndGroup(tier.id, and.id); } },
                                    React.createElement("span", { className: "whitespace-nowrap text-xs" }, translate('dashboard.rule.details.remove.and'))),
                                React.createElement(components.Button, { type: "button", variant: "secondary", size: "s", onClick: function () { return addOrGroup(tier.id, and.id); }, "data-cy": "approvers-add-or" },
                                    React.createElement("span", { className: "text-xs" }, translate('dashboard.rule.details.add.or')))),
                            !!and.or.length && (React.createElement("div", { className: "ml-2" },
                                React.createElement("span", { className: "py-1/2 w-fit bg-primary px-1 text-neutral-100 rounded-md" }, translate('dashboard.rule.details.disjunctions')),
                                React.createElement("div", { className: "flex flex-col pl-6" }, and.or.map(function (or) { return (React.createElement("div", { key: or.id, className: "approvers__group-item flex flex-row items-center gap-x-2 pb-2" },
                                    React.createElement("span", { className: "approvers__group-wrapper" }, translate('dashboard.rule.details.associate.role')),
                                    React.createElement("div", { className: "w-1/2" },
                                        React.createElement(components.Select, { options: associateRoles, value: or.associateRole.key, onChange: function (e) { return updateAssociateRole(tier.id, and.id, or.id, e); } })),
                                    React.createElement(components.Button, { type: "button", variant: "warning", size: "s", onClick: function () { return removeOrGroup(tier.id, and.id, or.id); } },
                                        React.createElement("span", { className: "whitespace-nowrap text-xs" }, translate('dashboard.rule.details.remove.or'))))); }))))))); }))))); }))),
        React.createElement("div", { className: "mt-2 w-full border-t pt-2" },
            React.createElement(components.Button, { type: "button", variant: "primary", onClick: onPreview, "data-cy": "approvers-preview" }, translate('dashboard.rule.details.preview')))));
};
export default Approvers;
