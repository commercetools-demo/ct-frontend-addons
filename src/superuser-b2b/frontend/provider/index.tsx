'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { SuperuserContextShape } from './types';
import { Cart } from '@commercetools/platform-sdk';

const SuperuserContext = createContext<SuperuserContextShape>({
  setSuperuserCarts: () => {},
  superuserStatus: {
    carts: [],
    isSuperuser: false,
  },
});

const SuperuserProvider = ({ children, sdk }: React.PropsWithChildren & { sdk: any }) => {
  const [superuserCarts, setSuperuserCarts] = useState<Cart[] | undefined>();
  const [isSuperuser, setIsSuperuser] = useState(false);

  const getSuperuserData = useCallback(async () => {
    const result = await sdk.callAction({
      actionName: 'account/getSuperuser',
    });
    if (!result.isError) {
      setSuperuserCarts(result.data.carts);
      setIsSuperuser(!!result.data.isSuperuser);
    }
  }, []);

  useEffect(() => {
    getSuperuserData();
  }, []);

  return (
    <SuperuserContext.Provider
      value={{
        setSuperuserCarts,
        superuserStatus: {
          carts: superuserCarts ?? [],
          isSuperuser,
        },
      }}
    >
      {children}
    </SuperuserContext.Provider>
  );
};
export default SuperuserProvider;
export const useSuperuserContext = () => useContext(SuperuserContext);
