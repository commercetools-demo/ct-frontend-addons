"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/configurable-products/frontend/hooks/useConfigurableProductAttribute.ts
var useConfigurableProductAttribute = ({ productAttributes }) => {
  const findAttributeLabel = (attributes) => {
    let attributeValue = "";
    Object.keys(attributes || {}).forEach((key) => {
      if (productAttributes.includes(key)) {
        attributeValue = _optionalChain([attributes, 'optionalAccess', _ => _[key]]);
      }
    });
    return attributeValue;
  };
  return {
    findAttributeLabel
  };
};



exports.useConfigurableProductAttribute = useConfigurableProductAttribute;
