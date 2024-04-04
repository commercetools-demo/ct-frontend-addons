"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/configurable-products/extensions/mappers/CartMapper.ts
var _CartMapper = class _CartMapper {
};
_CartMapper.mergeParentIdToCart = (cart, comCart, config) => {
  return {
    ...cart,
    lineItems: _CartMapper.mergeParentIdToLineItem(cart.lineItems, comCart.lineItems, config)
  };
};
_CartMapper.mergeParentIdToLineItem = (cartLineItems, commercetoolsLineItem, config) => {
  return cartLineItems.map((item) => ({
    ...item,
    ..._optionalChain([config, 'optionalAccess', _ => _.props, 'access', _2 => _2.lineItem, 'access', _3 => _3.parentIdCustomFieldKey]) && {
      parentId: _optionalChain([commercetoolsLineItem, 'access', _4 => _4.find, 'call', _5 => _5((commItem) => commItem.id === item.lineItemId), 'optionalAccess', _6 => _6.custom, 'optionalAccess', _7 => _7.fields, 'optionalAccess', _8 => _8[config.props.lineItem.parentIdCustomFieldKey]])
    }
  }));
};
var CartMapper = _CartMapper;



exports.CartMapper = CartMapper;
