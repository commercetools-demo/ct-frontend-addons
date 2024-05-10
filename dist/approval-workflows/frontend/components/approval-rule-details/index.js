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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import Approvers from './approvers';
import useCartPredicateBuilder from './hooks/useCartPredicateBuilder';
import PredicateBuilder from './predicate-builder';
import { useApprovals } from '../../hooks/useApprovals';
// necessary for react-organizational-chart in ssr
var ApproversPreview = dynamic(function () { return import('./approvers-preview'); }, { ssr: false });
var ApprovalRuleDetails = function (_a) {
    var _b, _c, _d;
    var components = _a.components, sdk = _a.sdk, rule = _a.rule, translate = _a.translate, roleOptions = _a.roleOptions, activeBusinessUnit = _a.activeBusinessUnit, permissions = _a.permissions, storeKey = _a.storeKey, isEditing = _a.isEditing;
    var _e = useRouter(), back = _e.back, refresh = _e.refresh;
    var _f = useState(''), error = _f[0], setError = _f[1];
    var _g = useState(false), isApproversPreviewShown = _g[0], setIsApproversPreviewShown = _g[1];
    var _h = useState(false), isPredicatePreviewShown = _h[0], setIsPredicatePreviewShown = _h[1];
    var _j = useState({ duplicate: false, stateChange: false, save: false }), loading = _j[0], setLoading = _j[1];
    var _k = useState(), predicateJsonFormat = _k[0], setPredicateJsonFormat = _k[1];
    var _l = useCartPredicateBuilder(sdk, translate), fields = _l.fields, isReady = _l.isReady;
    var initialData = useMemo(function () {
        return rule
            ? {
                name: rule.name,
                description: rule.description,
                predicate: rule.predicate,
                status: rule.status,
                approvers: rule.approvers,
                requesters: rule.requesters,
            }
            : {
                name: '',
                description: '',
                predicate: '',
                status: 'Inactive',
                approvers: {
                    tiers: [],
                },
                requesters: [],
            };
    }, [rule]);
    var _m = useState(initialData), data = _m[0], setData = _m[1];
    var viewOnly = useMemo(function () { return !(permissions === null || permissions === void 0 ? void 0 : permissions.UpdateApprovalRules); }, [permissions]);
    var _o = useApprovals(sdk, activeBusinessUnit.key, storeKey), activateRule = _o.activateRule, deactivateRule = _o.deactivateRule, createRule = _o.createRule, updateRule = _o.updateRule;
    var handleStateChange = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(__assign(__assign({}, loading), { stateChange: true }));
                    if (!(rule.status === 'Active')) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, deactivateRule(rule.id)];
                case 2:
                    _a.sent();
                    setData(__assign(__assign({}, data), { status: 'Inactive' }));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 8];
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, activateRule(rule.id)];
                case 6:
                    _a.sent();
                    setData(__assign(__assign({}, data), { status: 'Active' }));
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 8];
                case 8:
                    setLoading(__assign(__assign({}, loading), { stateChange: false }));
                    refresh();
                    back();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleChange = useCallback(function (e) {
        var _a;
        setData(__assign(__assign({}, data), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    }, [data]);
    var handleRoleChange = useCallback(function (role) {
        var _a;
        var updatedRequesters = __spreadArray([], ((_a = data.requesters) !== null && _a !== void 0 ? _a : []), true);
        if (updatedRequesters.some(function (r) { return r.associateRole.key === role; }))
            updatedRequesters = updatedRequesters.filter(function (r) { return r.associateRole.key !== role; });
        else
            updatedRequesters = __spreadArray(__spreadArray([], updatedRequesters, true), [{ associateRole: { key: role, typeId: 'associate-role' } }], false);
        setData(__assign(__assign({}, data), { requesters: updatedRequesters }));
    }, [data]);
    var updateActive = function (checked) {
        setData(__assign(__assign({}, data), { status: checked ? 'Active' : 'Inactive' }));
    };
    var updateApprovers = function (tiers) {
        setData(__assign(__assign({}, data), { approvers: {
                tiers: tiers,
            } }));
    };
    var updatePredicate = function (predicate) {
        setData(__assign(__assign({}, data), { predicate: predicate }));
    };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(__assign(__assign({}, loading), { save: true }));
                    if (!isEditing) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, updateRule(rule.id, data)];
                case 2:
                    _a.sent();
                    refresh();
                    setError('');
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    setError(e_1.message);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(__assign(__assign({}, loading), { save: false }));
                    return [7 /*endfinally*/];
                case 5: return [3 /*break*/, 10];
                case 6:
                    _a.trys.push([6, 8, 9, 10]);
                    return [4 /*yield*/, createRule(data)];
                case 7:
                    _a.sent();
                    back();
                    setError('');
                    return [3 /*break*/, 10];
                case 8:
                    e_2 = _a.sent();
                    setError(e_2.message);
                    return [3 /*break*/, 10];
                case 9:
                    setLoading(__assign(__assign({}, loading), { save: false }));
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var handlePredicateError = function () {
        setError('Predicate cannot be displayed in the query builder');
        setIsPredicatePreviewShown(true);
    };
    return (React.createElement("div", { className: "" },
        viewOnly && (React.createElement(components.InfoBanner, { className: "mt-3" },
            React.createElement("b", null, translate('common.view.only')),
            " ",
            translate('dashboard.rule.details.view.only.desc'))),
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("h1", { className: "py-6 text-18 font-extrabold text-gray-800 md:py-7 md:text-20 lg:py-9 lg:text-24" }, translate('dashboard.rule.details')),
            React.createElement("div", { className: "flex items-center justify-normal gap-x-3" },
                React.createElement(components.PreviousPageLink, null),
                isEditing && (React.createElement(React.Fragment, null,
                    React.createElement(components.Button, { size: "s", variant: "warning", disabled: viewOnly, onClick: handleStateChange, loading: loading.stateChange }, rule.status === 'Active'
                        ? translate('dashboard.rule.details.deactivate')
                        : translate('dashboard.rule.details.activate')))),
                React.createElement(components.Button, { size: "s", variant: "primary", disabled: viewOnly, onClick: handleSave, loading: loading.save }, translate('dashboard.rule.details.save')))),
        !!error && (React.createElement(components.InfoBanner, { className: "mt-3" },
            React.createElement("b", null, error))),
        React.createElement("form", { className: "grid grid-cols-6 gap-x-2 gap-y-4 py-8" },
            React.createElement("div", { className: "col-span-3" },
                React.createElement(components.Input, { name: "name", label: translate('dashboard.rule.new.name'), disabled: viewOnly, required: true, value: (_b = data.name) !== null && _b !== void 0 ? _b : '', onChange: handleChange })),
            React.createElement("div", { className: "col-span-3" },
                React.createElement(components.Input, { name: "description", label: translate('dashboard.rule.new.description'), disabled: viewOnly, required: true, value: (_c = data.description) !== null && _c !== void 0 ? _c : '', onChange: handleChange })),
            React.createElement("div", { className: "col-span-3" },
                React.createElement(components.Label, { required: true }, translate('dashboard.roles')),
                React.createElement(components.RefinementDropdown, { disabled: viewOnly, options: roleOptions === null || roleOptions === void 0 ? void 0 : roleOptions.map(function (role) {
                        var _a;
                        return (__assign(__assign({}, role), { selected: ((_a = data.requesters) !== null && _a !== void 0 ? _a : []).some(function (requester) { var _a; return ((_a = requester === null || requester === void 0 ? void 0 : requester.associateRole) === null || _a === void 0 ? void 0 : _a.key) === role.value; }) }));
                    }), onChange: handleRoleChange }, ((_d = data.requesters) !== null && _d !== void 0 ? _d : []).map(function (requester) { var _a; return (_a = requester === null || requester === void 0 ? void 0 : requester.associateRole) === null || _a === void 0 ? void 0 : _a.key; }).join(', '))),
            React.createElement("div", { className: "col-span-3 flex items-end" },
                React.createElement(components.Checkbox, { label: "".concat(translate('dashboard.rule.details.status'), " = ").concat(translate("dashboard.rules.status.".concat(data.status.toLowerCase()))), disabled: viewOnly, checked: data.status === 'Active', onChecked: updateActive })),
            React.createElement("h2", { className: "col-span-6 py-6 text-16 font-extrabold text-gray-800 md:py-7 md:text-18 lg:py-9 lg:text-20" }, translate('dashboard.rule.details.predicate')),
            !isPredicatePreviewShown && isReady && !viewOnly && (React.createElement("div", { className: "col-span-6" },
                React.createElement(PredicateBuilder, { fields: fields, components: components, translate: translate, onError: handlePredicateError, predicate: data.predicate, predicateJsonFormat: predicateJsonFormat, onUpdate: updatePredicate, onUpdateJson: setPredicateJsonFormat, onPreview: function () { return setIsPredicatePreviewShown(true); } }))),
            (isPredicatePreviewShown || viewOnly) && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "col-span-5" },
                    React.createElement(components.Input, { type: "text", name: "predicate", disabled: viewOnly || !isEditing, label: translate('dashboard.rule.new.predicate'), value: data === null || data === void 0 ? void 0 : data.predicate, onChange: handleChange })),
                React.createElement("div", { className: "col-span-1 flex items-end" },
                    React.createElement(components.Button, { variant: "secondary", type: "button", size: "m", disabled: viewOnly, onClick: function () { return setIsPredicatePreviewShown(false); } }, translate('dashboard.rule.details.edit.predicate'))))),
            React.createElement("h2", { className: "col-span-6 py-6 text-16 font-extrabold text-gray-800 md:py-7 md:text-18 lg:py-9 lg:text-20" }, translate('dashboard.rule.details.approvers')),
            React.createElement("div", { className: "col-span-6" },
                !isApproversPreviewShown && !isEditing && (React.createElement(Approvers, { onUpdate: updateApprovers, onPreview: function () { return setIsApproversPreviewShown(true); }, tiers: data.approvers.tiers, associateRoles: roleOptions, translate: translate, components: components })),
                (isApproversPreviewShown || isEditing) && (React.createElement(ApproversPreview, { isPreview: isEditing, tiers: data.approvers.tiers, onEdit: function () { return setIsApproversPreviewShown(false); }, components: components, translate: translate }))))));
};
export default ApprovalRuleDetails;
