// src/configurable-products/extensions/mappers/CartMapper.ts
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
    ...config?.props.lineItem.parentIdCustomFieldKey && {
      parentId: commercetoolsLineItem.find((commItem) => commItem.id === item.lineItemId)?.custom?.fields?.[config.props.lineItem.parentIdCustomFieldKey]
    }
  }));
};
var CartMapper = _CartMapper;

export {
  CartMapper
};
