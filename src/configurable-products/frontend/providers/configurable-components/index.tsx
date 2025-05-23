'use client';

import React, { createContext, useContext, useState } from 'react';
import { ContextProps, ContextShape } from './types';
import { Variant } from '../../../../types/b2c/product';

const initialState = {
  configurableComponents: [],
  selectedVariants: [],
  productAttributes: [],
  setSelectedVariants: () => {},
} as ContextShape;
export const ConfigurableComponentsContext = createContext(initialState);

const ConfigurableComponentsProvider = ({
  children,
  configurableComponents,
  productAttributes,
}: React.PropsWithChildren<ContextProps>) => {
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>(Array(configurableComponents?.length).fill(null));

  return (
    <ConfigurableComponentsContext.Provider
      value={{
        configurableComponents,
        selectedVariants,
        setSelectedVariants,
        productAttributes,
      }}
    >
      {children}
    </ConfigurableComponentsContext.Provider>
  );
};
export default ConfigurableComponentsProvider;
export const useConfigurableComponentsContext = () => useContext(ConfigurableComponentsContext);
