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
import React, { useEffect, useState } from 'react';
import { useApprovals } from '../../hooks/useApprovals';
import ApprovalFlows from '.';
import useRefinements from '../../hooks/useRefinements';
import useStatusesOptions from '../../hooks/useStatusesOptions';
var ApprovalFlowsClientWrapper = function (_a) {
    var _b, _c, _d;
    var businessUnitKey = _a.businessUnitKey, storeKey = _a.storeKey, sdk = _a.sdk, components = _a.components, translate = _a.translate;
    var getApprovalFlows = useApprovals(sdk, businessUnitKey, storeKey).getApprovalFlows;
    var _e = useRefinements(), page = _e.page, limit = _e.limit, setLimit = _e.setLimit, cursor = _e.cursor, setCursor = _e.setCursor, clearRefinements = _e.clearRefinements, states = _e.states, addState = _e.addState, removeState = _e.removeState, search = _e.search, debouncedSearch = _e.debouncedSearch, setSearch = _e.setSearch, date = _e.date, ISODate = _e.ISODate, onCreationDateRefine = _e.onCreationDateRefine;
    var _f = useState([]), flows = _f[0], setFlows = _f[1];
    var flowStatusOptions = useStatusesOptions(translate).flowStatusOptions;
    var previousCursor = flows.previousCursor;
    var nextCursor = flows.nextCursor;
    var total = (_b = flows.total) !== null && _b !== void 0 ? _b : 0;
    useEffect(function () {
        if (businessUnitKey) {
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var results;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getApprovalFlows(__assign(__assign(__assign({ limit: limit, cursor: cursor }, (states.length ? { states: states } : {})), (debouncedSearch ? { ids: [debouncedSearch.trim()] } : {})), { createdFrom: ISODate.from, createdTo: ISODate.to }))];
                        case 1:
                            results = _a.sent();
                            setFlows(results);
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
    }, [businessUnitKey, limit, cursor, states, debouncedSearch, ISODate.from, ISODate.to]);
    if (!businessUnitKey) {
        return null;
    }
    return (React.createElement(ApprovalFlows, { translate: translate, components: components, flows: flows.items || [], filters: { search: search, status: states, createdFrom: (_c = date.from) === null || _c === void 0 ? void 0 : _c.toString(), createdTo: (_d = date.to) === null || _d === void 0 ? void 0 : _d.toString() }, sortOptions: [], statusOptions: flowStatusOptions, onSearch: function (val) { return setSearch(val); }, onStatusRefine: function (status) {
            var isRefined = states.includes(status);
            if (!isRefined)
                addState(status);
            else
                removeState(status);
        }, onClearRefinements: clearRefinements, onCreationDateRefine: onCreationDateRefine, page: page, totalItems: total, limit: limit, onPageChange: function (newPage) {
            var isNext = newPage > page;
            if (isNext && nextCursor)
                setCursor(nextCursor);
            else if (!isNext && previousCursor)
                setCursor(previousCursor);
        }, onRowsPerPageChange: function (newLimit) { return setLimit(+newLimit); } }));
};
export default ApprovalFlowsClientWrapper;
