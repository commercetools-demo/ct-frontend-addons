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
import { useMemo } from 'react';
import { BasicConfig } from '@react-awesome-query-builder/ui';
var InitialConfig = BasicConfig;
export var useAwesomeQueryConfig = function (fields) {
    var config = useMemo(function () { return (__assign(__assign({}, InitialConfig), { settings: __assign(__assign({}, InitialConfig.settings), { showNot: false, showErrorMessage: true, forceShowConj: true, canReorder: false, deleteLabel: 'Remove rule', delGroupLabel: 'Remove group' }), types: __assign(__assign({}, InitialConfig.types), { text: __assign(__assign({}, InitialConfig.types.text), { valueSources: ['value'] }), select: __assign(__assign({}, InitialConfig.types.select), { valueSources: ['value'] }), number: __assign(__assign({}, InitialConfig.types.number), { valueSources: ['value'] }), boolean: __assign(__assign({}, InitialConfig.types.boolean), { valueSources: ['value'] }), datetime: __assign(__assign({}, InitialConfig.types.datetime), { valueSources: ['value'] }) }), fields: fields, widgets: __assign(__assign({}, InitialConfig.widgets), { text: __assign({}, InitialConfig.widgets.text), datetime: __assign(__assign({}, InitialConfig.widgets.datetime), { spelFormatValue: function (val) { return "\"".concat(new Date(val).toISOString(), "\""); } }) }), operators: __assign(__assign({}, InitialConfig.operators), { equal: __assign(__assign({}, InitialConfig.operators.equal), { labelForFormat: '=', spelFormatOp: function (f, o, v) { return "".concat(f, " = ").concat(v); } }), select_equals: __assign(__assign({}, InitialConfig.operators.select_equals), { labelForFormat: '=', spelFormatOp: function (f, o, v) { return "".concat(f, " = ").concat(v); } }), not_between: __assign(__assign({}, InitialConfig.operators.not_between), { spelFormatOp: function (f, o, v) { return "".concat(f, " < \"").concat(v[0], "\" and ").concat(f, " > \"").concat(v[1], "\""); } }), select_any_in: __assign(__assign({}, InitialConfig.operators.select_any_in), { spelFormatOp: function (field, op, values) {
                    var parsed = values.match(/\{(.*)\}\.\?\[true\]/);
                    if (parsed === null || parsed === void 0 ? void 0 : parsed[1]) {
                        var val = parsed[1].replaceAll("'", '').split(',');
                        return "".concat(field, " contains any (").concat(val.map(function (item) { return "\"".concat(item, "\""); }).join(', '), ")");
                    }
                    return '';
                } }), select_not_any_in: __assign(__assign({}, InitialConfig.operators.select_not_any_in), { spelFormatOp: function (field, op, values) {
                    var parsed = values.match(/\{(.*)\}\.\?\[true\]/);
                    if (parsed === null || parsed === void 0 ? void 0 : parsed[1]) {
                        var val = parsed[1].replaceAll("'", '').split(',');
                        return "not ".concat(field, " contains any (").concat(val.map(function (item) { return "\"".concat(item, "\""); }).join(', '), ")");
                    }
                    return '';
                } }) }), conjunctions: {
            AND: __assign(__assign({}, InitialConfig.conjunctions.AND), { spelFormatConj: function (children, conj, not, omitBrackets) {
                    if (not)
                        omitBrackets = false;
                    return children.size > 1
                        ? (not ? '!' : '') +
                            (omitBrackets ? '' : '(') +
                            children.join(' ' + 'and' + ' ') +
                            (omitBrackets ? '' : ')')
                        : (not ? '!(' : '') + children.first() + (not ? ')' : '');
                } }),
            OR: __assign(__assign({}, InitialConfig.conjunctions.OR), { spelFormatConj: function (children, conj, not, omitBrackets) {
                    if (not)
                        omitBrackets = false;
                    return children.size > 1
                        ? (not ? '!' : '') +
                            (omitBrackets ? '' : '(') +
                            children.join(' ' + 'or' + ' ') +
                            (omitBrackets ? '' : ')')
                        : (not ? '!(' : '') + children.first() + (not ? ')' : '');
                } }),
        } })); }, []);
    return {
        config: config,
    };
};
