import { useState } from 'react';
import { mutate } from 'swr';

export const useCSRLoginForm = ({
  sdk,
  data,
  setError,
  formatMessage,
  onLogin,
}: {
  sdk: any;
  data: any;
  setError: (message: string) => void;
  formatMessage: (params: { id: string; defaultMessage: string }) => string;
  onLogin?: () => void;
}) => {
  //CSR
  const [isCSRLogin, setIsCSRLogin] = useState(false);

  const csrErrorHandler = (error: Error) => {
    if (error.message.includes('CSR')) {
      setIsCSRLogin(true);
      setError(formatMessage({ id: 'csr.login', defaultMessage: "Please enter the customer's email address" }));
      return;
    }
  };
  //login user
  const loginUser = async () => {
    try {
    const extensions = sdk.composableCommerce;

      const response = await extensions.account.login({email:data.email, password:data.password, remember:data.rememberMe});

    mutate('/action/account/getAccount');
    mutate('/action/cart/getCart');
    mutate('/action/wishlist/getWishlist');

    if (response.isError) {
      throw response.error;
    } 

      if (response.data.accountId) onLogin?.();
      else {
        setError(formatMessage({ id: 'auth.wrong', defaultMessage: 'Wrong email address or password' }));
      }
    } catch (err) {
      csrErrorHandler(err as Error);
      setError(formatMessage({ id: 'wentWrong', defaultMessage: 'Sorry. Something went wrong..' }));
    }
  };


  const loginCSR = async (email: string, password: string, impersonatedCustomerEmail: string): Promise<any> => {

    const payload = {
      email,
      password,
      impersonatedCustomerEmail,
    };
    const res = await sdk.callAction({ actionName: 'account/loginCSR', payload });

    mutate('/action/account/getAccount');
    mutate('/action/cart/getCart');
    mutate('/action/wishlist/getWishlist');

    if (res.isError) {
      throw res.error;
    } else {
      return res.data;
    }
  };

  const login = () => {
    if (isCSRLogin) {
      loginCSR(data.email, data.password, data.impersonatedCustomerEmail);
    } else {
      loginUser();
    }
  };

  return {
    isCSRLogin,
    csrErrorHandler,
    login,
  };
};
