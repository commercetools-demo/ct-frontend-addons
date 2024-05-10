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
import React, { useCallback, useEffect, useState } from 'react';
import { Utils as QbUtils, Query, Builder } from '@react-awesome-query-builder/ui';
import { PredicateBuilderStyles } from './predicate-builder-styles';
import { useAwesomeQueryConfig } from './hooks/useAwesomeQueryConfig';
var PredicateBuilder = function (_a) {
    var fields = _a.fields, translate = _a.translate, predicateJsonFormat = _a.predicateJsonFormat, predicate = _a.predicate, components = _a.components, onUpdate = _a.onUpdate, onUpdateJson = _a.onUpdateJson, onError = _a.onError, onPreview = _a.onPreview;
    var config = useAwesomeQueryConfig(fields).config;
    var _b = useState({
        tree: QbUtils.checkTree(QbUtils.loadTree(predicateJsonFormat ? predicateJsonFormat : { id: QbUtils.uuid(), type: 'group' }), config),
        config: config,
    }), state = _b[0], setState = _b[1];
    var onChange = useCallback(function (immutableTree, conf) {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { tree: immutableTree, config: conf })); });
        try {
            var q = QbUtils.spelFormat(immutableTree, config);
            if (q) {
                onUpdate(q.replaceAll("'", '"'));
            }
            var jsonTree = QbUtils.getTree(immutableTree);
            onUpdateJson(jsonTree);
        }
        catch (e) {
            console.log(e);
        }
    }, [onUpdate]);
    useEffect(function () {
        if (config && predicate) {
            var spel = predicate.replace(/(?<![<=>!])=(?!=)/g, '==');
            var _a = QbUtils.loadFromSpel(spel, config), immutable = _a[0], errors = _a[1];
            var tree = QbUtils.checkTree(immutable, config);
            if (errors.length) {
                onError();
                return;
            }
            setState({ tree: tree, config: config });
        }
    }, []);
    var renderBuilder = useCallback(function (props) {
        return (React.createElement("div", { className: "query-builder-container mb-2" },
            React.createElement("div", { className: "query-builder qb-lite" },
                React.createElement(Builder, __assign({}, props)))));
    }, []);
    return (React.createElement("div", { className: "w-full" },
        React.createElement(PredicateBuilderStyles, null),
        React.createElement("div", { className: "predicateBuilder max-h-[400px] overflow-x-hidden overflow-y-scroll" },
            React.createElement(Query, __assign({}, config, { value: state.tree, onChange: onChange, renderBuilder: renderBuilder }))),
        React.createElement("div", { className: "bordet-t border-primary-300" },
            React.createElement(components.Button, { variant: "primary", size: "s", onClick: onPreview, "data-cy": "predicate-preview-button" }, translate('dashboard.rule.predicate.preview')))));
};
export default PredicateBuilder;
