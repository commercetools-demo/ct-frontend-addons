var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '../useDebounce';
var useRefinements = function () {
    var _a = useState(25), limit = _a[0], setLimit = _a[1];
    var _b = useState('offset:0'), cursor = _b[0], setCursor = _b[1];
    var _c = useState([]), states = _c[0], setStates = _c[1];
    var _d = useState(''), search = _d[0], setSearch = _d[1];
    var _e = useState({ from: undefined, to: undefined }), date = _e[0], setDate = _e[1];
    var debouncedSearch = useDebounce(search);
    var page = Math.floor(+cursor.split(':')[1] / limit) + 1;
    var addState = useCallback(function (state) { return setStates(__spreadArray(__spreadArray([], states, true), [state], false)); }, [states]);
    var removeState = useCallback(function (state) { return setStates(states.filter(function (s) { return s !== state; })); }, [states]);
    var extractDate = useCallback(function (date) {
        var _a = [
            date.getDate().toString().padStart(2, '0'),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getFullYear(),
        ], day = _a[0], month = _a[1], year = _a[2];
        return "".concat(year, "-").concat(month, "-").concat(day);
    }, []);
    var ISODate = useMemo(function () {
        var result = {};
        if (date.from)
            result.from = "".concat(extractDate(date.from), "T00:00:00.000Z");
        if (date.to)
            result.to = "".concat(extractDate(date.to), "T23:59:59.999Z");
        return result;
    }, [date, extractDate]);
    var clearRefinements = useCallback(function () {
        setLimit(25);
        setStates([]);
        setSearch('');
        setDate({ from: undefined, to: undefined });
    }, []);
    return {
        limit: limit,
        page: page,
        setLimit: setLimit,
        cursor: cursor,
        setCursor: setCursor,
        states: states,
        addState: addState,
        removeState: removeState,
        setStates: setStates,
        search: search,
        debouncedSearch: debouncedSearch,
        setSearch: setSearch,
        date: date,
        ISODate: ISODate,
        onCreationDateRefine: setDate,
        clearRefinements: clearRefinements,
    };
};
export default useRefinements;
