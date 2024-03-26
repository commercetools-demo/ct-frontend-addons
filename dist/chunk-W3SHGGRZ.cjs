"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/superuser/frontend/hooks/csr-login-form.ts
var _react = require('react');
var _swr = require('swr');
var useCSRLoginForm = ({
  sdk,
  data,
  setError,
  formatMessage,
  onLogin
}) => {
  const [isCSRLogin, setIsCSRLogin] = _react.useState.call(void 0, false);
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
      _swr.mutate.call(void 0, "/action/account/getAccount");
      _swr.mutate.call(void 0, "/action/cart/getCart");
      _swr.mutate.call(void 0, "/action/wishlist/getWishlist");
      if (response.isError) {
        throw response.error;
      }
      if (response.data.accountId)
        _optionalChain([onLogin, 'optionalCall', _ => _()]);
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
    _swr.mutate.call(void 0, "/action/account/getAccount");
    _swr.mutate.call(void 0, "/action/cart/getCart");
    _swr.mutate.call(void 0, "/action/wishlist/getWishlist");
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



exports.useCSRLoginForm = useCSRLoginForm;
