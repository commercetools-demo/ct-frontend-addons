import React, { Context, PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { SuperUser, SuperUserReturn } from '../types';

const initialState: SuperUserReturn = {
  superUserData: undefined,
};

const SuperUserContext: Context<SuperUserReturn> = createContext(initialState);

export const SuperUserProvider: React.FC<PropsWithChildren & { sdk: any }> = ({ children, sdk }) => {
  const [superUserData, setSuperUser] = useState<SuperUser | undefined>();

  const getSuperuserData = useCallback(async () => {
    const result = await sdk.callAction({
      actionName: 'account/getSuperuser',
    });
    if (!result.isError) {
      setSuperUser(result.data.superUser);
    }
  }, []);

  useEffect(() => {
    getSuperuserData();
  }, []);

  return (
    <SuperUserContext.Provider
      value={{
        superUserData,
      }}
    >
      {children}
    </SuperUserContext.Provider>
  );
};

export const useSuperUserContext = () => useContext(SuperUserContext);
