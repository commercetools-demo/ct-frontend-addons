// src/superuser/frontend/hooks/csr-login-form.ts
import { useState } from "react";
import { mutate } from "swr";
var useCSRLoginForm = ({
  sdk,
  data,
  setError,
  formatMessage,
  onLogin
}) => {
  const [isCSRLogin, setIsCSRLogin] = useState(false);
  const csrErrorHandler = (error) => {
    if (error.message.includes("CSR")) {
      setIsCSRLogin(true);
      setError(formatMessage({ id: "csr.login", defaultMessage: "Please enter the customer's email address" }));
      return;
    }
  };
  const loginUser = async () => {
    try {
      const extensions = sdk.composableCommerce;
      const response = await extensions.account.login({ email: data.email, password: data.password, remember: data.rememberMe });
      mutate("/action/account/getAccount");
      mutate("/action/cart/getCart");
      mutate("/action/wishlist/getWishlist");
      if (response.isError) {
        throw response.error;
      }
      if (response.data.accountId)
        onLogin?.();
      else {
        setError(formatMessage({ id: "auth.wrong", defaultMessage: "Wrong email address or password" }));
      }
    } catch (err) {
      csrErrorHandler(err);
      setError(formatMessage({ id: "wentWrong", defaultMessage: "Sorry. Something went wrong.." }));
    }
  };
  const loginCSR = async (email, password, impersonatedCustomerEmail) => {
    const payload = {
      email,
      password,
      impersonatedCustomerEmail
    };
    const res = await sdk.callAction({ actionName: "account/loginCSR", payload });
    mutate("/action/account/getAccount");
    mutate("/action/cart/getCart");
    mutate("/action/wishlist/getWishlist");
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
    login
  };
};

export {
  useCSRLoginForm
};
