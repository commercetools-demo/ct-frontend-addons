import React, { Context, PropsWithChildren, createContext, useContext, useState } from 'react';
import { SuperUser, SuperUserReturn } from '../types';

const initialState: SuperUserReturn = {
  superUserData: undefined,
  setSuperUser: () => {},
};

const SuperUserContext: Context<SuperUserReturn> = createContext(initialState);

export const SuperUserProvider: React.FC<PropsWithChildren & { initialSuperUserData?: SuperUser }> = ({
  children,
  initialSuperUserData,
}) => {
  const [superUserData, setSuperUser] = useState<SuperUser | undefined>(initialSuperUserData);

  return (
    <SuperUserContext.Provider
      value={{
        setSuperUser,
        superUserData,
      }}
    >
      {children}
    </SuperUserContext.Provider>
  );
};

export const useSuperUserContext = () => useContext(SuperUserContext);
