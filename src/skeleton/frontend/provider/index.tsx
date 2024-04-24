'use client';
import React, { createContext, useContext } from 'react';
import { SuperuserContextShape } from './types';

const SampleContext = createContext<SuperuserContextShape>({
  // props
});

const SampleProvider = ({ children }: React.PropsWithChildren & {}) => {
  return <SampleContext.Provider value={{}}>{children}</SampleContext.Provider>;
};
export default SampleProvider;
export const useSampleContext = () => useContext(SampleContext);
