'use client';
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useApprovals } from '../../hooks/useApprovals';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
import { useParams } from 'next/navigation';
import FlowStatusTag from '../flow-status-tag';
// necessary for react-organizational-chart in ssr
var ApproversPreview = dynamic(function () { return import('./approvers-preview'); }, { ssr: false });
var formatLocalDate = function (date) {
    var dateToFormat = date instanceof Date ? date : new Date(date);
    var _a = [
        dateToFormat.getDate().toString().padStart(2, '0'),
        (dateToFormat.getMonth() + 1).toString().padStart(2, '0'),
        dateToFormat.getFullYear().toString(),
    ], day = _a[0], month = _a[1], year = _a[2];
    return "".concat(day, "-").concat(month, "-").concat(year);
};
var FlowDetailsModal = function (_a) {
    var _b, _c, _d;
    var sdk = _a.sdk, activeBusinessUnit = _a.activeBusinessUnit, storeKey = _a.storeKey, flow = _a.flow, translate = _a.translate, calculateTransaction = _a.calculateTransaction, components = _a.components, accountId = _a.accountId, permissions = _a.permissions;
    var _e = useApprovals(sdk, activeBusinessUnit.key, storeKey), approveFlow = _e.approveFlow, rejectFlow = _e.rejectFlow;
    var _f = useState(false), isShowingReason = _f[0], setIsShowingReason = _f[1];
    var _g = useState(''), reason = _g[0], setReason = _g[1];
    var _h = useState([]), approvedRoles = _h[0], setApprovedRoles = _h[1];
    var _j = useState([]), rejectedRoles = _j[0], setRejectedRoles = _j[1];
    var _k = useState([]), accountRoles = _k[0], setAccountRoles = _k[1];
    var _l = useState({ approve: false, reject: false }), loading = _l[0], setLoading = _l[1];
    var locale = useParams().locale;
    var viewOnly = useMemo(function () { return !(permissions === null || permissions === void 0 ? void 0 : permissions.UpdateApprovalFlows); }, [permissions]);
    var handleApproveFlow = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(__assign(__assign({}, loading), { approve: true }));
                    return [4 /*yield*/, approveFlow(flow.id)];
                case 1:
                    _a.sent();
                    setLoading(__assign(__assign({}, loading), { approve: false }));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleRejectFlow = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(__assign(__assign({}, loading), { reject: true }));
                    return [4 /*yield*/, rejectFlow(flow.id, reason)];
                case 1:
                    _a.sent();
                    setReason('');
                    setLoading(__assign(__assign({}, loading), { reject: false }));
                    return [2 /*return*/];
            }
        });
    }); };
    var hasAccountApprovedAlready = useMemo(function () {
        return approvedRoles.some(function (approvedRole) { return accountRoles.includes(approvedRole); });
    }, [approvedRoles, accountRoles]);
    var transaction = useMemo(function () {
        var _a, _b, _c;
        var _d = calculateTransaction(flow.order), total = _d.total, shipping = _d.shipping, subtotal = _d.subtotal, tax = _d.tax, discount = _d.discount;
        var currencyCode = ((_c = (_b = (_a = flow.order) === null || _a === void 0 ? void 0 : _a.sum) === null || _b === void 0 ? void 0 : _b.currencyCode) !== null && _c !== void 0 ? _c : 'USD');
        return __assign(__assign(__assign(__assign({ currency: currencyCode, subtotal: subtotal.centAmount * 100 }, (subtotal.centAmount > 0 ? { taxCosts: tax.centAmount * 100 } : {})), (shipping.centAmount > 0 ? { shippingCosts: shipping.centAmount * 100 } : {})), (discount.centAmount > 0 ? { discount: discount.centAmount * 100 } : {})), { total: total.centAmount * 100 });
    }, [flow.order]);
    useEffect(function () {
        var _a;
        if (activeBusinessUnit && accountId) {
            var accountAssociate = activeBusinessUnit.associates.find(function (associate) { return associate.accountId === accountId; });
            if (accountAssociate) {
                setAccountRoles(((_a = accountAssociate.roles) === null || _a === void 0 ? void 0 : _a.map(function (role) { return role.key || ''; })) || []);
            }
        }
    }, [activeBusinessUnit, accountId]);
    useEffect(function () {
        var _a;
        if (flow) {
            setApprovedRoles(!((_a = flow.approvals) === null || _a === void 0 ? void 0 : _a.length)
                ? []
                : flow.approvals.reduce(function (prev, curr) {
                    return prev.concat(curr.approver.associateRoleAssignments.map(function (associate) { return associate.associateRole.key; }));
                }, []));
            setRejectedRoles(!flow.rejection
                ? []
                : flow.rejection.rejecter.associateRoleAssignments.map(function (associate) { return associate.associateRole.key; }));
        }
    }, [flow]);
    if (!flow) {
        return null;
    }
    return (React.createElement("div", { className: "" },
        viewOnly && (React.createElement(components.InfoBanner, { className: "mt-3" },
            React.createElement("b", null, translate('common.view.only')),
            " ",
            translate('dashboard.flow.details.view.only.desc'))),
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("h1", { className: "py-6 text-18 font-extrabold text-gray-800 md:py-7 md:text-20 lg:py-9 lg:text-24" }, translate('dashboard.flow.details')),
            React.createElement("div", { className: "flex items-center justify-normal gap-x-3" },
                React.createElement(components.PreviousPageLink, null),
                !isShowingReason && (React.createElement(React.Fragment, null,
                    React.createElement(components.Button, { size: "s", variant: "secondary", disabled: hasAccountApprovedAlready || flow.status !== 'Pending', onClick: function () { return setIsShowingReason(true); }, loading: loading.reject }, translate('dashboard.flow.details.reject')),
                    React.createElement(components.Button, { size: "s", variant: "primary", disabled: hasAccountApprovedAlready || flow.status !== 'Pending', onClick: handleApproveFlow, loading: loading.approve }, translate('dashboard.flow.details.approve')))),
                isShowingReason && (React.createElement("div", { className: "flex w-full flex-col gap-2 md:w-[280px]" },
                    React.createElement(components.Input, { name: "reason", className: "md:w-[180px]", label: translate('flow.reject.reason'), required: true, value: reason, onChange: function (e) { return setReason(e.target.value); } }),
                    React.createElement(components.Button, { size: "s", variant: "warning", disabled: hasAccountApprovedAlready || flow.status !== 'Pending', onClick: handleRejectFlow, loading: loading.reject }, translate('dashboard.flow.details.reject')))))),
        React.createElement("h3", { className: "text-14 text-gray-600" },
            translate('dashboard.flow.details.id'),
            ": ",
            flow.id),
        flow.createdAt && (React.createElement("h3", { className: "mt-4 text-14 text-gray-600" },
            translate('dashboard.flow.details.date'),
            ": ",
            formatLocalDate(flow.createdAt))),
        React.createElement("h3", { className: "mt-4 text-14 text-gray-600" },
            translate('dashboard.flow.details.business_unit'),
            ": ",
            flow.businessUnit.key),
        React.createElement("h2", { className: "pt-6 text-16 font-extrabold text-gray-800 md:pt-7 md:text-18 lg:pt-9 lg:text-20" }, translate('dashboard.flow.details.status.title')),
        hasAccountApprovedAlready && (React.createElement("h3", { className: "flex items-center gap-2 text-14 text-gray-600" }, translate('dashboard.flow.details.account.already.approved'))),
        React.createElement("h3", { className: "mt-4 flex items-center gap-2 text-14 text-gray-600" },
            translate('dashboard.flow.details.status'),
            ":",
            ' ',
            React.createElement(FlowStatusTag, { status: flow.status, components: components, translate: translate })),
        !!flow.rejection && (React.createElement(React.Fragment, null,
            React.createElement("h3", { className: "mt-4 text-14 text-gray-600" },
                translate('dashboard.flow.details.rejection.date'),
                ": ",
                formatLocalDate(flow.rejection.rejectedAt)),
            !!flow.rejection.reason && (React.createElement("h3", { className: "mt-4 text-14 text-gray-600" },
                translate('dashboard.flow.details.rejection.reason'),
                ": ",
                flow.rejection.reason)))),
        !!((_b = flow.approvals) === null || _b === void 0 ? void 0 : _b.length) &&
            flow.approvals.map(function (approval, i) { return (React.createElement("h3", { className: "mt-4 text-14 text-gray-600", key: "approval-".concat(i) },
                translate('dashboard.flow.details.approval.date'),
                ": ",
                formatLocalDate(approval.approvedAt),
                ' ',
                translate('dashboard.flow.details.approval.by.role'),
                ":",
                ' ',
                approval.approver.associateRoleAssignments.map(function (item) { return item.associateRole.key; }).join(', '))); }),
        !!flow.rules.length &&
            flow.rules.map(function (rule, i) { return (React.createElement(React.Fragment, null,
                React.createElement("h2", { key: "rule-".concat(i), className: "pt-6 text-16 font-extrabold text-gray-800 md:pt-7 md:text-18 lg:pt-9 lg:text-20" },
                    translate('dashboard.flow.details.rule.title'),
                    ": ",
                    rule.name),
                React.createElement("h3", { className: "mt-4 text-14 text-gray-600", key: "rule-desc-".concat(i) },
                    translate('dashboard.flow.details.rule.description'),
                    ": ",
                    rule.description),
                React.createElement("h3", { className: "my-4 text-14 text-gray-600", key: "rule-predicate-".concat(i) },
                    translate('dashboard.flow.details.rule.predicate'),
                    ": ",
                    rule.predicate),
                React.createElement(ApproversPreview, { key: "rule-preview-".concat(i), components: components, translate: translate, isPreview: true, tiers: rule.approvers.tiers, previewApprovedRoles: approvedRoles, previewRejecteddRoles: rejectedRoles }))); }),
        !!((_d = (_c = flow.order) === null || _c === void 0 ? void 0 : _c.lineItems) === null || _d === void 0 ? void 0 : _d.length) && (React.createElement(React.Fragment, null,
            React.createElement("h2", { className: "pt-6 text-16 font-extrabold text-gray-800 md:pt-7 md:text-18 lg:pt-9 lg:text-20" }, translate('dashboard.flow.details.order.details')),
            React.createElement("table", { className: "w-full" },
                React.createElement("thead", null,
                    React.createElement("tr", { className: "border-b border-neutral-400 p-4 text-12 font-semibold uppercase text-gray-500" },
                        React.createElement("th", { className: "p-4 text-left" }, translate('common.product')),
                        React.createElement("th", { className: "hidden p-4 text-left md:table-cell" }, translate('common.sku')),
                        React.createElement("th", { className: "hidden p-4 text-right md:table-cell" }, translate('common.qty')),
                        React.createElement("th", { className: "hidden p-4 text-right lg:table-cell" }, translate('common.price')))),
                React.createElement("tbody", null, flow.order.lineItems.map(function (_a) {
                    var _b;
                    var lineItemId = _a.lineItemId, variant = _a.variant, name = _a.name, count = _a.count, price = _a.price;
                    return (React.createElement("tr", { key: lineItemId, className: "border-b border-neutral-400 p-4 text-14 text-gray-600" },
                        React.createElement("td", { className: "p-4 text-left" },
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement("span", { className: "relative block h-[40px] w-[40px]" },
                                    React.createElement("img", { src: (_b = variant === null || variant === void 0 ? void 0 : variant.images) === null || _b === void 0 ? void 0 : _b[0], alt: name !== null && name !== void 0 ? name : '' })),
                                React.createElement("span", null, name))),
                        React.createElement("td", { className: "hidden p-4 text-left md:table-cell" }, variant === null || variant === void 0 ? void 0 : variant.sku),
                        React.createElement("td", { className: "hidden p-4 text-right md:table-cell" }, count),
                        React.createElement("td", { className: "hidden p-4 text-right lg:table-cell" }, CurrencyHelpers.formatForCurrency(price !== null && price !== void 0 ? price : 0))));
                }))),
            React.createElement("div", { className: "flex justify-end border-neutral-400 pb-7 pt-6" },
                React.createElement("div", { className: "flex w-full flex-col gap-2 md:px-4 lg:w-[420px] lg:pl-0" },
                    React.createElement("div", { className: "flex items-center justify-between text-14 text-gray-600" },
                        React.createElement("span", null, translate('common.subtotal')),
                        React.createElement("span", null, CurrencyHelpers.formatForCurrency(transaction.subtotal, locale, transaction.currency))),
                    transaction.shippingCosts && transaction.shippingCosts > 0 && (React.createElement("div", { className: "flex items-center justify-between text-14 text-gray-600" },
                        React.createElement("span", null, translate('common.shipping')),
                        React.createElement("span", null, CurrencyHelpers.formatForCurrency(transaction.shippingCosts, locale, transaction.currency)))),
                    transaction.taxCosts && transaction.taxCosts > 0 && (React.createElement("div", { className: "flex items-center justify-between text-14 text-gray-600" },
                        React.createElement("span", null, translate('common.tax')),
                        React.createElement("span", null, CurrencyHelpers.formatForCurrency(transaction.taxCosts, locale, transaction.currency)))),
                    transaction.discount && transaction.discount > 0 && (React.createElement("div", { className: "flex items-center justify-between text-14 text-gray-600" },
                        React.createElement("span", null, translate('common.discount')),
                        React.createElement("span", null,
                            "-",
                            CurrencyHelpers.formatForCurrency(transaction.discount, locale, transaction.currency)))),
                    React.createElement("div", { className: "flex items-center justify-between font-medium text-gray-700" },
                        React.createElement("span", null,
                            translate('common.total'),
                            ":"),
                        React.createElement("span", null, CurrencyHelpers.formatForCurrency(transaction.total, locale, transaction.currency)))))))));
};
export default FlowDetailsModal;
