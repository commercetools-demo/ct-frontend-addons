'use client';

import React, { createContext, useContext } from 'react';
import { ContextProps, ContextShape } from './types';

const initialState = {
  cart: undefined,
  productAttributes: [],
} as ContextShape;
export const BundledItemsContext = createContext(initialState);

const BundledItemsProvider = ({ cart, productAttributes, children }: React.PropsWithChildren<ContextProps>) => {
  return (
    <BundledItemsContext.Provider
      value={{
        productAttributes,
        cart,
      }}
    >
      {children}
    </BundledItemsContext.Provider>
  );
};
export default BundledItemsProvider;
export const useBundledItemsContext = () => useContext(BundledItemsContext);
