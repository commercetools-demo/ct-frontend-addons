"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }require('../../../chunk-D7CLCBWV.cjs');

// src/configurable-products/frontend/hooks/useSelectConfigurableComponents.ts
var _react = require('react');
var useSelectConfigurableComponents = (configurableComponents) => {
  const [selectedVariants, setSelectedVariants] = _react.useState.call(void 0, Array(_optionalChain([configurableComponents, 'optionalAccess', _ => _.length])).fill(null));
  const selectComponentVariant = (componentIndex, variantSku) => {
    const selectedVariant = !variantSku ? null : _optionalChain([configurableComponents, 'optionalAccess', _2 => _2[componentIndex], 'access', _3 => _3.variants, 'access', _4 => _4.find, 'call', _5 => _5((v) => v.sku === variantSku)]);
    setSelectedVariants(
      selectedVariants.map((variant, i) => {
        if (i === componentIndex) {
          return selectedVariant;
        }
        return variant;
      })
    );
  };
  return {
    selectedVariants,
    setSelectedVariants,
    selectComponentVariant
  };
};


exports.useSelectConfigurableComponents = useSelectConfigurableComponents;
