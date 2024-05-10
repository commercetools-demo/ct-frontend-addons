var __getProtoOf = Object.getPrototypeOf;
var __reflectGet = Reflect.get;
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);

// src/minimum-quantity/extensions/apis/CartApi.ts
var injectCartApi = (BaseCartApi) => {
  return class CartApi extends BaseCartApi {
    constructor() {
      super(...arguments);
      this.addMinimumQuantityToCart = async (cart, changes) => {
        const locale = await this.getCommercetoolsLocal();
        const cartUpdate = {
          version: +cart.cartVersion,
          actions: changes.map((change) => ({
            action: "changeLineItemQuantity",
            lineItemId: change.lineItemId,
            quantity: change.quantity
          }))
        };
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
        return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
      };
    }
  };
};

// src/minimum-quantity/extensions/utils.ts
var extractDependency = (dependency, dependencies) => {
  if (dependencies?.[dependency]) {
    return injectCartApi(dependencies[dependency]);
  }
};

// src/utils/parseRequestParams.ts
var parseQueryParams = (query) => {
  const queryParams = {};
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      queryParams[key] = query[key];
    }
  }
  return queryParams;
};
var parseRequestParams_default = parseQueryParams;

// src/utils/request.ts
var getPath = (request) => {
  return getHeader(request, "frontastic-path") ?? request.query.path;
};
var getLocale = (request) => {
  const locale = getHeader(request, "frontastic-locale") ?? request.query.locale;
  if (locale !== void 0) {
    return getHeader(request, "frontastic-locale") ?? request.query.locale;
  }
  throw new Error(`Locale is missing from request ${request}`);
};
var getCurrency = (request) => {
  const currency = getHeader(request, "frontastic-currency") ?? request.query["currency"];
  if (currency !== void 0) {
    return getHeader(request, "frontastic-currency") ?? request.query["currency"];
  }
  return "USD";
  throw new Error(`Currency is missing from request ${request}`);
};
var getHeader = (request, header) => {
  if (request?.headers && header in request.headers) {
    const foundHeader = request.headers[header];
    if (Array.isArray(foundHeader)) {
      return foundHeader[0];
    }
    return foundHeader;
  }
  return null;
};
var getBusinessUnitKey = (request) => {
  if (request !== void 0) {
    const { businessUnitKey } = parseRequestParams_default(request.query);
    return businessUnitKey ?? request.sessionData?.businessUnitKey;
  }
  return null;
};
var getStoreKey = (request) => {
  if (request !== void 0) {
    const { storeKey } = parseRequestParams_default(request.query);
    return storeKey ?? request.sessionData?.storeKey;
  }
  return null;
};
var getStoreId = (request) => {
  if (request !== void 0) {
    const { storeId } = parseRequestParams_default(request.query);
    return storeId ?? request.sessionData?.storeId;
  }
  return null;
};
var getDistributionChannelId = (request) => {
  if (request !== void 0) {
    const { distributionChannelId } = parseRequestParams_default(request.query);
    return distributionChannelId ?? request.sessionData?.distributionChannelId;
  }
  return null;
};
var getSupplyChannelId = (request) => {
  if (request !== void 0) {
    const { supplyChannelId } = parseRequestParams_default(request.query);
    return supplyChannelId ?? request.sessionData?.supplyChannelId;
  }
  return null;
};
function fetchAccountFromSession(request) {
  if (request.sessionData?.account !== void 0) {
    return request.sessionData.account;
  }
  return void 0;
}
function fetchCartIdFromSession(request) {
  if (request.sessionData?.cartId !== void 0) {
    return request.sessionData.cartId;
  }
  return void 0;
}
var getSuperuserFromSession = (request) => {
  return request.sessionData?.superuser;
};

// src/minimum-quantity/extensions/actionControllers/cartController.ts
var addToCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config?.dependencies);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
      const changes = [];
      cart.lineItems.forEach((lineItem) => {
        const minimoAttribute = lineItem.variant?.attributes?.[config?.props?.attributeName || ""];
        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
          if (lineItem.count < minimoAttribute) {
            changes.push({
              lineItemId: lineItem.lineItemId,
              quantity: minimoAttribute
            });
          }
        }
      });
      const res = await cartApi.addMinimumQuantityToCart(cart, changes);
      const response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(res)
      };
      return response;
    }
    return originalResult;
  };
};
var updateLineItem = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency("CartApi", config?.dependencies);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
      const changes = [];
      cart.lineItems.forEach((lineItem) => {
        const minimoAttribute = lineItem.variant?.attributes?.[config?.props?.attributeName || ""];
        if (minimoAttribute && Number.isInteger(minimoAttribute)) {
          if (lineItem.count < minimoAttribute) {
            changes.push({
              lineItemId: lineItem.lineItemId,
              quantity: minimoAttribute
            });
          }
        }
      });
      const res = await cartApi.addMinimumQuantityToCart(cart, changes);
      const response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(res)
      };
      return response;
    }
    return originalResult;
  };
};

// src/minimum-quantity/extensions/index.ts
var minimumQuantity = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: addToCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: updateLineItem
    }
  ]
};
var extensions_default = minimumQuantity;

// src/utils/Errors.ts
var ExtensionError = class extends Error {
  constructor({ message, errors }) {
    super(message || errors?.[0]?.message);
    this.errors = errors || [{ message }];
  }
};
var ExternalError = class extends ExtensionError {
  constructor(options) {
    super(options);
    this.status = options.status;
    this.body = options.body;
    this.code = "external_error";
  }
};

// src/superuser/extensions/apis/AccountApi.ts
var injectAccountApi = (BaseAccountApi, AccountMapper) => {
  return class AccountApi extends BaseAccountApi {
    constructor() {
      super(...arguments);
      this.getCustomerByEmail = async (customerEmail) => {
        const account = await this.requestBuilder().customers().get({
          queryArgs: {
            where: `email="${customerEmail}"`
          }
        }).execute().then(async (response) => {
          if (response.body.results.length === 1) {
            const customer = response.body.results[0];
            return AccountMapper.commercetoolsCustomerToAccount(customer);
          }
          throw new Error("Too many customers");
        }).catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
        return account;
      };
    }
  };
};

// src/superuser/extensions/apis/CartApi.ts
var injectCartApi2 = (BaseCartApi, CartMapper3) => {
  return class CartApi extends BaseCartApi {
    constructor() {
      super(...arguments);
      this.changeLineItemPrice = async (cart, lineItemId, externalPrice) => {
        const locale = await this.getCommercetoolsLocal();
        const cartUpdate = {
          version: +cart.cartVersion,
          actions: [
            {
              action: "setLineItemPrice",
              lineItemId,
              externalPrice
            }
          ]
        };
        const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate, locale);
        return this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
      };
      this.getOrderByID = async (id) => {
        const commercetoolsOrder = await this.requestBuilder().orders().withId({ ID: id }).get({
          queryArgs: {
            expand: "custom.type"
          }
        }).execute().then((response) => response.body).catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
        return commercetoolsOrder;
      };
      this.getOrders = async (account) => {
        return await this.requestBuilder().orders().get({
          queryArgs: {
            expand: [
              "lineItems[*].discountedPrice.includedDiscounts[*].discount",
              "discountCodes[*].discountCode",
              "paymentInfo.payments[*]"
            ],
            where: `customerId="${account.accountId}"`,
            sort: "createdAt desc"
          }
        }).execute().then((response) => {
          return response.body.results.map((order) => CartMapper3.commercetoolsOrderToOrder(order));
        }).catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
      };
      this.setSuperUserEmailOnOrder = async (order, superUserEmail, customType, customField) => {
        const orderObj = await this.getOrderByID(order.cartId);
        let fields = {};
        if (orderObj.custom?.type?.obj?.key === customType) {
          fields = {
            ...orderObj.custom?.fields
          };
        }
        const orderUpdate = {
          version: +order.orderVersion,
          actions: [
            {
              action: "setCustomType",
              type: {
                typeId: "type",
                key: customType
              },
              fields: {
                ...fields,
                [customField]: superUserEmail
              }
            }
          ]
        };
        order = await this.requestBuilder().orders().withId({ ID: order.cartId }).post({ body: orderUpdate }).execute().then((response) => CartMapper3.commercetoolsOrderToOrder(response.body)).catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
        return order;
      };
      this.getActiveCartById = async (cartId) => {
        const locale = await this.getCommercetoolsLocal();
        return await this.requestBuilder().carts().withId({
          ID: cartId
        }).get({
          queryArgs: {
            limit: 1,
            expand: [
              "lineItems[*].discountedPrice.includedDiscounts[*].discount",
              "discountCodes[*].discountCode",
              "paymentInfo.payments[*]"
            ]
          }
        }).execute().then((response) => {
          if (response.body.cartState !== "Active") {
            throw new Error(`Cart ${cartId} is not active.`);
          }
          return this.buildCartWithAvailableShippingMethods(response.body, locale);
        }).catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
      };
    }
  };
};

// src/superuser/extensions/mappers/AccountMapper.ts
var injectAccountMapper = (BaseAccountMapper) => {
  var _a;
  return _a = class extends BaseAccountMapper {
  }, _a.commercetoolsCustomerToAccount = (commercetoolsCustomer) => {
    return {
      ...__superGet(_a, _a, "commercetoolsCustomerToAccount").call(this, commercetoolsCustomer),
      customerGroupId: commercetoolsCustomer.customerGroup?.id
    };
  }, _a;
};

// src/superuser/extensions/mappers/CartMapper.ts
var injectCartMapper = (BaseCartMapper) => {
  var _a;
  return _a = class extends BaseCartMapper {
  }, _a.commercetoolsOrderToOrder = (commercetoolsOrder, locale, defaultLocale) => {
    return {
      ...__superGet(_a, _a, "commercetoolsOrderToOrder").call(this, commercetoolsOrder, locale, defaultLocale),
      superUserEmail: commercetoolsOrder.custom?.fields?.superUserEmail
    };
  }, _a;
};

// src/superuser/extensions/utils.ts
var extractDependency2 = (dependency, dependencies) => {
  if (dependencies?.[dependency]) {
    switch (dependency) {
      case "CartApi":
        return injectCartApi2(dependencies.CartApi, extractDependency2("CartMapper", dependencies));
      case "AccountApi":
        return injectAccountApi(dependencies.AccountApi, extractDependency2("AccountMapper", dependencies));
      case "AccountMapper":
        return injectAccountMapper(dependencies.AccountMapper);
      case "CartMapper":
        return injectCartMapper(dependencies.CartMapper);
    }
  }
};

// src/superuser/extensions/actionControllers/AccountController.ts
async function loginCSRAccount(request, actionContext, account, impersonatedCustomerEmail, config) {
  const AccountApi = extractDependency2("AccountApi", config?.dependencies);
  if (!AccountApi) {
    const response2 = {
      statusCode: 401,
      body: JSON.stringify("Dependencies not provided: AccountApi")
    };
    return response2;
  }
  if (!impersonatedCustomerEmail) {
    const response2 = {
      statusCode: 401,
      body: JSON.stringify("Impersonated customer email is required"),
      sessionData: {
        ...request.sessionData,
        account: void 0,
        superUser: void 0
      }
    };
    return response2;
  }
  const accountApi = new AccountApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
  let superUserAccount;
  let impersonatedAccount = {};
  try {
    superUserAccount = await accountApi.login(account, void 0);
    impersonatedAccount = await accountApi.getCustomerByEmail(impersonatedCustomerEmail);
  } catch (error) {
    if (error.code === "account_authentication_error") {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify(error.message),
        sessionData: {
          ...request.sessionData,
          account: void 0,
          superUser: void 0
        }
      };
      return response2;
    }
    throw error;
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(account),
    sessionData: {
      ...request.sessionData,
      account: impersonatedAccount,
      superUser: {
        email: superUserAccount.email,
        firstName: superUserAccount.firstName,
        lastName: superUserAccount.lastName
      }
    }
  };
  return response;
}
var loginCSR = (config) => {
  return async (request, actionContext) => {
    if (request.body) {
      const accountLoginBody = JSON.parse(request.body);
      const account = {
        email: accountLoginBody.email,
        password: accountLoginBody.password
      };
      return await loginCSRAccount(request, actionContext, account, accountLoginBody.impersonatedCustomerEmail, config);
    }
  };
};
var getSuperuser = (config) => {
  return async (request, actionContext) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        isSuperuser: false,
        superUser: request.sessionData?.superUser
      }),
      sessionData: {
        ...request.sessionData
      }
    };
    return response;
  };
};
var loginHookWithCSRCheck = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const account = JSON.parse(originalResult.body);
      const AccountApi = extractDependency2("AccountApi", config?.dependencies);
      const accountApi = new AccountApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request),
        request
      );
      const customerAccount = await accountApi.getCustomerByEmail(account.email);
      if (customerAccount.customerGroupId && customerAccount.customerGroupId === config?.props.csrCustomerGroupId) {
        const response = {
          statusCode: 300,
          body: JSON.stringify("CSR"),
          sessionData: {
            ...request.sessionData,
            account: void 0,
            superUser: void 0
          }
        };
        return response;
      }
    }
    return originalResult;
  };
};
var logoutWithCSRCheck = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200) {
      return {
        statusCode: 200,
        body: originalResult.body,
        sessionData: {
          ...originalResult.sessionData,
          superUser: void 0
        }
      };
    }
    return originalResult;
  };
};

// src/shared/utils/CartFetcher.ts
var CartFetcher = class {
  static async fetchCart(cartApi, request, actionContext) {
    return await this.fetchCartFromSession(cartApi, request, actionContext) ?? await cartApi.getAnonymous();
  }
  static async fetchCartFromSession(cartApi, request, actionContext) {
    if (request.sessionData?.account !== void 0) {
      return await cartApi.getForUser(request.sessionData.account);
    }
    if (request.sessionData?.cartId !== void 0) {
      try {
        return await cartApi.getActiveCartById(request.sessionData.cartId);
      } catch (error) {
        console.info(`Error fetching the cart ${request.sessionData.cartId}. ${error}`);
      }
    }
    return void 0;
  }
};

// src/superuser/extensions/actionControllers/CartController.ts
var changePrice = (config) => {
  return async (request, actionContext) => {
    const CartApi = extractDependency2("CartApi", config?.dependencies);
    if (!CartApi) {
      const response = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi | CartFetcher")
      };
      return response;
    }
    if (request.body) {
      const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
      const body = JSON.parse(request.body);
      let cart = await CartFetcher.fetchCart(cartApi, request, actionContext);
      cart = await cartApi.changeLineItemPrice(cart, body.lineItemId, body.price);
      const response = {
        statusCode: 200,
        body: JSON.stringify(cart),
        sessionData: {
          ...request.sessionData,
          cartId: cart.cartId
        }
      };
      return response;
    }
  };
};
var checkoutWithCSR = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let order = JSON.parse(originalResult.body);
      const superUserEmail = request.sessionData?.superUser?.email;
      if (order && superUserEmail) {
        const CartApi = extractDependency2("CartApi", config?.dependencies);
        if (!CartApi) {
          const response2 = {
            statusCode: 401,
            body: JSON.stringify("Dependencies not provided: CartApi")
          };
          return response2;
        }
        const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
        order = await cartApi.setSuperUserEmailOnOrder(
          order,
          superUserEmail,
          config?.props.csrCustomTypeKey,
          config?.props.csrCustomFieldKey
        );
        const response = {
          statusCode: 200,
          body: JSON.stringify(order),
          sessionData: originalResult.sessionData
        };
        return response;
      }
    }
    return originalResult;
  };
};
var getOrders = (originalCb, config) => {
  return async (request, actionContext) => {
    const CartApi = extractDependency2("CartApi", config?.dependencies);
    if (!CartApi) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response2;
    }
    const cartApi = new CartApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);
    const account = request.sessionData?.account !== void 0 ? request.sessionData.account : void 0;
    if (account === void 0) {
      const response2 = {
        statusCode: 500
      };
      return response2;
    }
    const orders = await cartApi.getOrders(account);
    const response = {
      statusCode: 200,
      body: JSON.stringify(orders)
    };
    return response;
  };
};

// src/superuser/extensions/index.ts
var superuser = {
  actions: [
    {
      action: "login",
      actionNamespace: "account",
      hook: loginHookWithCSRCheck
    },
    {
      action: "logout",
      actionNamespace: "account",
      hook: logoutWithCSRCheck
    },
    {
      action: "loginCSR",
      actionNamespace: "account",
      hook: loginCSR,
      create: true
    },
    {
      action: "checkout",
      actionNamespace: "cart",
      hook: checkoutWithCSR
    },
    {
      action: "getOrders",
      actionNamespace: "cart",
      hook: getOrders
    },
    {
      action: "changePrice",
      actionNamespace: "cart",
      hook: changePrice,
      create: true
    },
    {
      action: "getSuperuser",
      actionNamespace: "account",
      hook: getSuperuser,
      create: true
    }
  ]
};
var extensions_default2 = superuser;

// src/superuser-b2b/extensions/apis/CartApi.ts
var injectCartApi3 = (BaseCartApi) => {
  return class CartApi extends BaseCartApi {
    constructor() {
      super(...arguments);
      this.createSuperuserCart = async (storeKey, superuser2) => {
        const locale = await this.getCommercetoolsLocal();
        const cartDraft = {
          currency: locale.currency,
          country: locale.country,
          locale: locale.language,
          store: {
            key: storeKey,
            typeId: "store"
          },
          inventoryMode: "ReserveOnOrder"
        };
        if (!superuser2) {
          cartDraft.customerId = this.accountId;
        } else {
          cartDraft.origin = "Merchant";
        }
        return await this.associateEndpoints(this.accountId, this.businessUnitKey).carts().post({
          queryArgs: {
            expand: [
              "lineItems[*].discountedPrice.includedDiscounts[*].discount",
              "discountCodes[*].discountCode",
              "paymentInfo.payments[*]"
            ]
          },
          body: cartDraft
        }).execute().then(
          async (response) => await this.buildCartWithAvailableShippingMethods(response.body, locale)
        ).catch((error) => {
          throw new Error(error.message);
        });
      };
      this.setOriginalCustomerData = async (comercetoolsCart, email, customType, originalEmailFieldKey) => {
        const cartUpdate = {
          version: +comercetoolsCart.version,
          actions: [
            {
              action: "setCustomType",
              type: {
                typeId: "type",
                key: customType
              },
              fields: {
                [originalEmailFieldKey]: email
              }
            }
          ]
        };
        return this.requestBuilder().carts().withId({ ID: comercetoolsCart.id }).post({ body: cartUpdate }).execute().then((response) => response.body).catch((error) => {
          throw new Error(error.message);
        });
      };
      this.setSuperUserEmailOnOrder = async (orderId, orderVersion, originalOwnerEmail, superUserEmail, customType, customField) => {
        const orderUpdate = {
          version: +orderVersion,
          actions: [
            {
              action: "setCustomType",
              type: {
                typeId: "type",
                key: customType
              },
              fields: {
                [customField]: superUserEmail
              }
            }
          ]
        };
        if (originalOwnerEmail) {
          orderUpdate.actions.push({
            action: "setCustomerEmail",
            email: originalOwnerEmail
          });
        }
        return this.requestBuilder().orders().withId({ ID: orderId }).post({ body: orderUpdate }).execute().then((response) => response.body).catch((error) => {
          throw new Error(error.message);
        });
      };
      this.setOriginalCustomerDataOnCart = async (cartId, cartversion, originalOwnerEmail) => {
        const cartUpdate = {
          version: +cartversion,
          actions: [
            {
              action: "setCustomerEmail",
              email: originalOwnerEmail
            }
          ]
        };
        return this.requestBuilder().carts().withId({ ID: cartId }).post({ body: cartUpdate }).execute().then((response) => response.body).catch((error) => {
          throw new Error(error.message);
        });
      };
    }
    async getByPureId(cartId) {
      const locale = await this.getCommercetoolsLocal();
      return await this.requestBuilder().carts().withId({
        ID: cartId
      }).get({
        queryArgs: {
          limit: 1,
          expand: [
            "lineItems[*].discountedPrice.includedDiscounts[*].discount",
            "discountCodes[*].discountCode",
            "paymentInfo.payments[*]"
          ]
        }
      }).execute().then((response) => {
        return this.buildCartWithAvailableShippingMethods(response.body, locale);
      }).catch((error) => {
        throw new Error(error.message);
      });
    }
    async getCommercetoolsCartById(cartId) {
      return await this.requestBuilder().carts().withId({
        ID: cartId
      }).get({
        queryArgs: {
          limit: 1,
          expand: [
            "lineItems[*].discountedPrice.includedDiscounts[*].discount",
            "discountCodes[*].discountCode",
            "paymentInfo.payments[*]"
          ]
        }
      }).execute().then((response) => {
        return response.body;
      });
    }
    async getCommercetoolsOrderById(orderId) {
      return await this.requestBuilder().orders().withId({
        ID: orderId
      }).get({
        queryArgs: {
          limit: 1,
          expand: [
            "lineItems[*].discountedPrice.includedDiscounts[*].discount",
            "discountCodes[*].discountCode",
            "paymentInfo.payments[*]"
          ]
        }
      }).execute().then((response) => {
        return response.body;
      });
    }
    async getAllSuperuserCartsInStore(storeKey) {
      const where = [`cartState="Active"`, `store(key="${storeKey}")`, `businessUnit(key="${this.businessUnitKey}")`];
      return await this.requestBuilder().carts().get({
        queryArgs: {
          limit: 15,
          expand: [
            "lineItems[*].discountedPrice.includedDiscounts[*].discount",
            "discountCodes[*].discountCode",
            "paymentInfo.payments[*]",
            "createdBy.associate"
          ],
          where,
          sort: "createdAt desc"
        }
      }).execute().then((response) => {
        if (response.body.count >= 1) {
          return response.body.results;
        }
        return [];
      }).catch((error) => {
        throw new Error(error.message);
      });
    }
  };
};

// src/superuser-b2b/extensions/utils.ts
var extractDependency3 = (dependency, config) => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case "BusinessUnitApi":
        return config?.dependencies.BusinessUnitApi;
      case "CartApi":
        return injectCartApi3(config.dependencies.CartApi);
      case "CartMapper":
        return config?.dependencies.CartMapper;
      case "EmailApiFactory":
        return config?.dependencies.EmailApiFactory;
    }
  }
};

// src/shared/utils/getCartApi.ts
var getCartApi = (request, actionContext, CartApi) => {
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  const distributionChannelId = getDistributionChannelId(request);
  const supplyChannelId = getSupplyChannelId(request);
  return new CartApi(
    actionContext,
    getLocale(request),
    getCurrency(request),
    account?.accountId,
    businessUnitKey,
    distributionChannelId,
    supplyChannelId
  );
};

// src/superuser-b2b/extensions/actionControllers/AccountController.ts
var login = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const BusinessUnitApi = extractDependency3("BusinessUnitApi", config);
      if (!BusinessUnitApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: BusinessUnitApi")
        };
        return response;
      }
      const businessUnitApi = new BusinessUnitApi(
        actionContext.frontasticContext,
        getLocale(request),
        getCurrency(request)
      );
      const businessUnit = await businessUnitApi.getByKeyForAccount(
        originalResult.sessionData.businessUnitKey,
        originalResult.sessionData.account.accountId
      );
      if (businessUnit?.associates && !getSuperuserFromSession(request)) {
        const isSuperuser = businessUnit.associates.some(
          (associate) => associate.roles?.some((role) => role.key === config?.props?.superuserRoleKey) && associate.accountId === originalResult.sessionData.account.accountId
        );
        const response = {
          ...originalResult,
          sessionData: {
            ...originalResult.sessionData,
            superuser: isSuperuser
          }
        };
        return response;
      }
      return originalResult;
    }
    return originalResult;
  };
};
var getSuperuser2 = (config) => {
  return async (request, actionContext) => {
    if (!getSuperuserFromSession(request)) {
      const response2 = {
        statusCode: 200,
        body: JSON.stringify({
          isSuperuser: false
        }),
        sessionData: {
          ...request.sessionData
        }
      };
      return response2;
    }
    const CartApi = extractDependency3("CartApi", config);
    const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
    const storeKey = getStoreKey(request);
    const carts = await cartApi.getAllSuperuserCartsInStore(storeKey);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        isSuperuser: true,
        carts
      }),
      sessionData: {
        ...request.sessionData
      }
    };
    return response;
  };
};
var logout = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    return {
      ...originalResult,
      sessionData: {
        ...originalResult.sessionData,
        superuser: void 0
      }
    };
  };
};

// src/utils/parseRequestBody.ts
var parseRequestBody = (body) => {
  try {
    if (!body) {
      return null;
    }
    return JSON.parse(body);
  } catch (error) {
    console.error("Error parsing request body", error);
    return null;
  }
};
var parseRequestBody_default = parseRequestBody;

// src/superuser-b2b/extensions/actionControllers/CartController.ts
var getAllSuperuserCartsInStore = (config) => {
  return async (request, actionContext) => {
    let carts = [];
    if (getSuperuserFromSession(request)) {
      const CartApi = extractDependency3("CartApi", config);
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const storeKey = getStoreKey(request);
      carts = await cartApi.getAllSuperuserCartsInStore(storeKey);
      const response2 = {
        statusCode: 200,
        body: JSON.stringify(carts),
        sessionData: {
          ...request.sessionData
        }
      };
      return response2;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify([]),
      sessionData: {
        ...request.sessionData
      }
    };
    return response;
  };
};
var setCart = (config) => {
  return async (request, actionContext) => {
    if (getSuperuserFromSession(request)) {
      const CartApi = extractDependency3("CartApi", config);
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const id = request.query?.id;
      const body = parseRequestBody_default(request.body);
      const cart = await cartApi.getByPureId(id);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      const cartId = cart.cartId;
      if (!!body?.email) {
        await cartApi.setOriginalCustomerData(
          commercetoolsCart,
          body?.email || "",
          config?.props.cart.customTypeKey,
          config?.props.cart.originalEmailFieldKey
        );
      }
      const response2 = {
        statusCode: 200,
        body: JSON.stringify(cart),
        sessionData: {
          ...request.sessionData,
          cartId
        }
      };
      return response2;
    }
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: "Not a superuser"
      }),
      sessionData: {
        ...request.sessionData
      }
    };
    return response;
  };
};
var createSuperuserCart = (config) => {
  return async (request, actionContext) => {
    if (getSuperuserFromSession(request)) {
      const CartApi = extractDependency3("CartApi", config);
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const storeKey = getStoreKey(request);
      const cart = await cartApi.createSuperuserCart(storeKey, true);
      const cartId = cart.cartId;
      const response2 = {
        statusCode: 200,
        body: JSON.stringify(cart),
        sessionData: {
          ...request.sessionData,
          cartId
        }
      };
      return response2;
    }
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: "Not a superuser"
      }),
      sessionData: {
        ...request.sessionData
      }
    };
    return response;
  };
};
var checkout = (originalCb, config) => {
  return async (request, actionContext) => {
    const locale = getLocale(request);
    const CartApi = extractDependency3("CartApi", config);
    const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
    const cartId = request.sessionData?.cartId;
    if (!cartId || !config?.props.cart.originalEmailFieldKey) {
      return originalCb(request, actionContext);
    }
    const originalCart = await cartApi.getCommercetoolsCartById(cartId);
    const originalOwnerEmail = originalCart?.custom?.fields?.[config.props.cart.originalEmailFieldKey];
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const order = JSON.parse(originalResult?.body);
      const isSuperuser = getSuperuserFromSession(request);
      if (isSuperuser && order) {
        const orderId = order?.orderId;
        if (orderId) {
          await cartApi.setSuperUserEmailOnOrder(
            orderId,
            order.orderVersion,
            originalOwnerEmail,
            request.sessionData?.account?.email,
            config?.props.cart.customTypeKey,
            config?.props.cart.superuserEmailFieldKey
          );
          const EmailApiFactory = extractDependency3("EmailApiFactory", config);
          const emailApi = EmailApiFactory.getDefaultApi(actionContext.frontasticContext, locale);
          emailApi.sendOrderConfirmationEmail({ ...order, email: originalOwnerEmail });
        }
      }
    }
    return originalResult;
  };
};
var reassignCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      const originalRequstBody = parseRequestBody_default(request.body);
      const cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency3("CartApi", config);
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      if (!!originalRequstBody?.email) {
        await cartApi.setOriginalCustomerData(
          commercetoolsCart,
          originalRequstBody?.email,
          config?.props.cart.customTypeKey,
          config?.props.cart.originalEmailFieldKey
        );
      }
      return originalResult;
    }
    return originalResult;
  };
};

// src/superuser-b2b/extensions/actionControllers/QuoteController.ts
var createQuoteRequest = (originalCb, config) => {
  return async (request, actionContext) => {
    const CartApi = extractDependency3("CartApi", config);
    const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
    const cartId = request.sessionData?.cartId;
    if (!cartId || !config?.props.cart.originalEmailFieldKey) {
      return originalCb(request, actionContext);
    }
    const originalCart = await cartApi.getCommercetoolsCartById(cartId);
    const originalOwnerEmail = originalCart?.custom?.fields?.[config.props.cart.originalEmailFieldKey];
    await cartApi.setOriginalCustomerDataOnCart(cartId, originalCart.version, originalOwnerEmail);
    const originalResult = await originalCb(request, actionContext);
    return originalResult;
  };
};

// src/superuser-b2b/extensions/mappers/CartMapper.ts
var CartMapper = class {
  static mergeCommercetoolsOrderToOrder(commercetoolsOrder, order, config) {
    return {
      ...order,
      ...commercetoolsOrder?.custom?.fields?.[config.props.cart.superuserEmailFieldKey] && {
        superuserEmail: commercetoolsOrder?.custom?.fields?.[config.props.cart.superuserEmailFieldKey]
      }
    };
  }
};

// src/superuser-b2b/extensions/dynamic-page-handlers/index.ts
var injectThankYouPageHandler = async (request, context, originalResult, config) => {
  const order = originalResult.dataSourcePayload.order;
  if (!order) {
    const CartApi = extractDependency3("CartApi", config);
    const cartApi = getCartApi(request, context.frontasticContext, CartApi);
    const orderQuery = {
      orderIds: [request.query?.orderId]
    };
    const result = await cartApi.queryOrders(orderQuery);
    if (result?.items.length > 0) {
      return {
        ...originalResult,
        dataSourcePayload: {
          ...originalResult.dataSourcePayload,
          order: result.items[0]
        }
      };
    }
  }
  return originalResult;
};
var injectOrderPageHandler = async (request, context, originalResult, config) => {
  if (originalResult.dataSourcePayload?.order) {
    const order = originalResult.dataSourcePayload?.order;
    const CartApi = extractDependency3("CartApi", config);
    const cartApi = getCartApi(request, context.frontasticContext, CartApi);
    const commercetoolsOrder = await cartApi.getCommercetoolsOrderById(order.orderId);
    const mergedOrder = CartMapper.mergeCommercetoolsOrderToOrder(
      commercetoolsOrder,
      originalResult.dataSourcePayload?.order,
      config
    );
    return {
      ...originalResult,
      dataSourcePayload: {
        ...originalResult.dataSourcePayload,
        order: mergedOrder
      }
    };
  }
  return originalResult;
};

// src/superuser-b2b/extensions/index.ts
var superUserB2B = {
  dynamicPageHandlers: {
    "frontastic/thank-you-page": {
      hook: injectThankYouPageHandler,
      create: false
    },
    "frontastic/order-page": {
      hook: injectOrderPageHandler,
      create: false
    }
  },
  actions: [
    {
      action: "login",
      actionNamespace: "account",
      hook: login
    },
    {
      action: "getAllSuperuserCartsInStore",
      actionNamespace: "cart",
      hook: getAllSuperuserCartsInStore,
      create: true
    },
    {
      action: "getSuperuser",
      actionNamespace: "account",
      hook: getSuperuser2,
      create: true
    },
    {
      action: "logout",
      actionNamespace: "account",
      hook: logout
    },
    {
      action: "setCart",
      actionNamespace: "cart",
      hook: setCart,
      create: true
    },
    {
      action: "createSuperuserCart",
      actionNamespace: "cart",
      hook: createSuperuserCart,
      create: true
    },
    {
      action: "checkout",
      actionNamespace: "cart",
      hook: checkout
    },
    {
      action: "reassignCart",
      actionNamespace: "cart",
      hook: reassignCart
    },
    {
      action: "createQuoteRequest",
      actionNamespace: "quote",
      hook: createQuoteRequest
    }
  ]
};
var extensions_default3 = superUserB2B;

// src/configurable-products/extensions/apis/CartApi.ts
var injectCartApi4 = (BaseCartApi, config) => {
  return class CartApi extends BaseCartApi {
    async getCommercetoolsCartById(cartId) {
      return await this.associateEndpoints(this.accountId, this.businessUnitKey).carts().withId({
        ID: cartId
      }).get({
        queryArgs: {
          limit: 1,
          expand: [
            "lineItems[*].discountedPrice.includedDiscounts[*].discount",
            "discountCodes[*].discountCode",
            "paymentInfo.payments[*]"
          ]
        }
      }).execute().then((response) => {
        return response.body;
      });
    }
    async addLinkedLineitemsToCart(cartId, cartVersion, lineItemId, configurableComponents) {
      const locale = await this.getCommercetoolsLocal();
      const cartUpdate = {
        version: cartVersion,
        actions: []
      };
      configurableComponents?.forEach((field) => {
        const addLineItemActions = {
          action: "addLineItem",
          sku: field.variant.sku,
          quantity: +field.count || 1,
          ...this.distributionChannelId && {
            distributionChannel: { typeId: "channel", id: this.distributionChannelId }
          },
          ...this.supplyChannelId && {
            supplyChannel: { typeId: "channel", id: this.supplyChannelId }
          },
          custom: {
            type: {
              key: config?.props.lineItem.customTypeKey,
              typeId: "type"
            },
            fields: {
              [config.props.lineItem.parentIdCustomFieldKey]: lineItemId
            }
          }
        };
        cartUpdate.actions.push(addLineItemActions);
      });
      const commercetoolsCart = await this.updateCart(cartId, cartUpdate);
      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
    async removeLinkedLineitemsFromCart(cart, lineItemId) {
      const locale = await this.getCommercetoolsLocal();
      const linkedLineItems = cart.lineItems.filter((lineitem) => {
        return lineitem.parentId === lineItemId;
      });
      const cartUpdate = {
        version: +cart.cartVersion,
        actions: []
      };
      linkedLineItems?.forEach((field) => {
        const addLineItemActions = {
          action: "removeLineItem",
          lineItemId: field.lineItemId
        };
        cartUpdate.actions.push(addLineItemActions);
      });
      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate);
      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
    async updateLinkedLineitemsInCart(cart, lineItem) {
      const locale = await this.getCommercetoolsLocal();
      const linkedLineItems = cart.lineItems.filter((lineitem) => {
        return lineitem.parentId === lineItem.id;
      });
      const cartUpdate = {
        version: +cart.cartVersion,
        actions: []
      };
      linkedLineItems?.forEach((field) => {
        const addLineItemActions = {
          action: "changeLineItemQuantity",
          lineItemId: field.lineItemId,
          quantity: lineItem.count
        };
        cartUpdate.actions.push(addLineItemActions);
      });
      const commercetoolsCart = await this.updateCart(cart.cartId, cartUpdate);
      return await this.buildCartWithAvailableShippingMethods(commercetoolsCart, locale);
    }
  };
};

// src/configurable-products/extensions/utils.ts
var extractDependency4 = (dependency, config) => {
  if (config?.dependencies?.[dependency]) {
    switch (dependency) {
      case "CartApi":
        return injectCartApi4(config?.dependencies.CartApi, config);
      case "ProductApi":
        return config?.dependencies.ProductApi;
    }
  }
};

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
var CartMapper2 = _CartMapper;

// src/configurable-products/extensions/actionControllers/CartController.ts
var getCart = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency4("CartApi", config);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = CartMapper2.mergeParentIdToCart(cart, commercetoolsCart, config);
      const response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(cart)
      };
      return response;
    }
    return originalResult;
  };
};
var addToCart2 = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    const body = parseRequestBody_default(request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency4("CartApi", config);
      if (!CartApi) {
        const response2 = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response2;
      }
      if (!config?.props.lineItem.customTypeKey || !config?.props.lineItem.parentIdCustomFieldKey) {
        return originalResult;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = CartMapper2.mergeParentIdToCart(cart, commercetoolsCart, config);
      const response = {
        ...originalResult,
        statusCode: 200,
        body: JSON.stringify(cart)
      };
      return response;
    }
    return originalResult;
  };
};
var addComponentsToCart = (config) => {
  return async (request, actionContext) => {
    const body = parseRequestBody_default(request.body);
    const CartApi = extractDependency4("CartApi", config);
    if (!CartApi) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Dependencies not provided: CartApi")
      };
      return response2;
    }
    if (!config?.props.lineItem.customTypeKey || !config?.props.lineItem.parentIdCustomFieldKey) {
      const response2 = {
        statusCode: 401,
        body: JSON.stringify("Config not provided: lineItem.customTypeKey or lineItem.parentIdCustomFieldKey")
      };
      return response2;
    }
    const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
    const cartId = fetchCartIdFromSession(request);
    let commercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);
    if (commercetoolsCart) {
      const lineItemId = findNewLineItem(commercetoolsCart, body);
      if (lineItemId && body?.configurableComponents?.length) {
        let cart = await cartApi.addLinkedLineitemsToCart(
          commercetoolsCart.id,
          commercetoolsCart.version,
          lineItemId,
          body.configurableComponents
        );
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cartId);
        cart = CartMapper2.mergeParentIdToCart(cart, commercetoolsCart, config);
        const response2 = {
          statusCode: 200,
          body: JSON.stringify(cart),
          sessionData: request.sessionData
        };
        return response2;
      }
    }
    const response = {
      statusCode: 503,
      body: JSON.stringify({
        statusCode: 503,
        message: "Error in addComponentsToCart"
      }),
      sessionData: request.sessionData
    };
    return response;
  };
};
var removeLineItem = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    const body = parseRequestBody_default(request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency4("CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      const commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = CartMapper2.mergeParentIdToCart(cart, commercetoolsCart, config);
      const lineItemId = body.lineItem?.id;
      if (lineItemId) {
        cart = await cartApi.removeLinkedLineitemsFromCart(cart, lineItemId);
        cart = CartMapper2.mergeParentIdToCart(cart, commercetoolsCart, config);
        const response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart)
        };
        return response;
      }
    }
    return originalResult;
  };
};
var updateLineItem2 = (originalCb, config) => {
  return async (request, actionContext) => {
    const originalResult = await originalCb(request, actionContext);
    const body = parseRequestBody_default(request.body);
    if (!body) {
      return originalResult;
    }
    if (originalResult.statusCode === 200 && originalResult?.body) {
      let cart = JSON.parse(originalResult?.body);
      const CartApi = extractDependency4("CartApi", config);
      if (!CartApi) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Dependencies not provided: CartApi")
        };
        return response;
      }
      const cartApi = getCartApi(request, actionContext.frontasticContext, CartApi);
      let commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
      cart = CartMapper2.mergeParentIdToCart(cart, commercetoolsCart, config);
      if (body.lineItem) {
        cart = await cartApi.updateLinkedLineitemsInCart(cart, body.lineItem);
        commercetoolsCart = await cartApi.getCommercetoolsCartById(cart.cartId);
        cart = CartMapper2.mergeParentIdToCart(cart, commercetoolsCart, config);
        const response = {
          ...originalResult,
          statusCode: 200,
          body: JSON.stringify(cart)
        };
        return response;
      }
    }
    return originalResult;
  };
};
var findNewLineItem = (cart, body) => {
  return cart.lineItems.find(
    (item) => body?.lineItems.find((bodyItem) => item.variant.sku === bodyItem.variant?.sku)
  )?.id;
};

// src/configurable-products/extensions/utils/product-router.ts
var _ProductRouter = class _ProductRouter {
};
_ProductRouter.getBundles = async (request, frontasticContext, product, config) => {
  const urlMatches = getPath(request)?.match(config.props.product.productDetailsPageRegex);
  const ProductApi = extractDependency4("ProductApi", config);
  if (!ProductApi) {
    throw new Error("ProductApi not found");
  }
  const productIds = [];
  if (urlMatches) {
    const variants = product.variants;
    if (variants.length) {
      variants.forEach((variant) => {
        const attribute = config.props.product.attributeName;
        productIds.push(..._ProductRouter.getProductIdsFromReferencedAttribute(attribute, variant));
      });
      const uniqueIds = productIds.filter((item, index, self) => self.indexOf(item) === index);
      if (uniqueIds.length) {
        const productApi = new ProductApi(frontasticContext, getLocale(request), getCurrency(request), request);
        const products = await productApi.query({
          productIds: uniqueIds,
          storeKey: getStoreKey(request),
          storeId: getStoreId(request),
          distributionChannelId: getDistributionChannelId(request),
          supplyChannelId: getSupplyChannelId(request)
        }).then((result) => result.items);
        return products;
      }
    }
  }
  return [];
};
_ProductRouter.getProductIdsFromReferencedAttribute = (attributeName, variant) => {
  const attributeValue = variant.attributes?.[attributeName];
  if (attributeValue && Array.isArray(attributeValue)) {
    return attributeValue?.map((item) => item.id);
  } else if (attributeValue) {
    return [attributeValue.id];
  }
  return [];
};
var ProductRouter = _ProductRouter;

// src/configurable-products/extensions/dynamic-page-handlers/index.ts
var injectProductDetailPageHandler = (request, context, originalResult, config) => {
  const product = originalResult.dataSourcePayload.product;
  return ProductRouter.getBundles(request, context.frontasticContext, product, config).then(
    (configurableComponents) => {
      return {
        dynamicPageType: originalResult.dynamicPageType,
        dataSourcePayload: {
          ...originalResult.dataSourcePayload,
          configurableComponents
        },
        pageMatchingPayload: originalResult.pageMatchingPayload
      };
    }
  );
};

// src/configurable-products/extensions/index.ts
var configurableProducts = {
  actions: [
    {
      action: "addToCart",
      actionNamespace: "cart",
      hook: addToCart2
    },
    {
      action: "addComponentsToCart",
      actionNamespace: "cart",
      hook: addComponentsToCart,
      create: true
    },
    {
      action: "getCart",
      actionNamespace: "cart",
      hook: getCart
    },
    {
      action: "updateLineItem",
      actionNamespace: "cart",
      hook: updateLineItem2
    },
    {
      action: "removeLineItem",
      actionNamespace: "cart",
      hook: removeLineItem
    }
  ],
  dynamicPageHandlers: {
    "frontastic/product-page": {
      hook: injectProductDetailPageHandler,
      create: false
    }
  }
};
var extensions_default4 = configurableProducts;

// src/approval-workflows/extensions/mappers/ApprovalFlowMapper.ts
var ApprovalFlowMapper = class {
  static mapCommercetoolsFlowToDomainFlow(flow, CartMapper3, locale) {
    return {
      ...flow,
      ...flow.order?.obj && { order: CartMapper3.commercetoolsOrderToOrder(flow.order.obj, locale) }
    };
  }
  static calculatePreviousCursor(offset, count) {
    return offset - count >= 0 ? `offset:${offset - count}` : void 0;
  }
  static calculateNextCursor(offset, count, total) {
    return offset + count < total ? `offset:${offset + count}` : void 0;
  }
};

// src/shared/utils/Pagination.ts
var getOffsetFromCursor = (cursor) => {
  if (cursor === void 0) {
    return void 0;
  }
  const offsetMach = cursor.match(/(?<=offset:).+/);
  return offsetMach !== null ? +Object.values(offsetMach)[0] : void 0;
};

// src/approval-workflows/extensions/apis/ApprovalFlowApi.ts
var injectApprovalFlowApi = (BaseApi, config) => {
  const CartMapper3 = extractDependency5("CartMapper", config);
  return class ApprovalFlowApi extends BaseApi {
    constructor(context, locale, currency, accountId, businessUnitKey) {
      super(context, locale, currency);
      this.query = async (flowQuery) => {
        const locale = await this.getCommercetoolsLocal();
        const limit = +flowQuery.limit || void 0;
        const sortAttributes = [];
        if (flowQuery.sortAttributes) {
          Object.keys(flowQuery.sortAttributes).map((field, directionIndex) => {
            sortAttributes.push(`${field} ${Object.values(flowQuery.sortAttributes)[directionIndex]}`);
          });
        } else {
          sortAttributes.push(`createdAt desc`);
        }
        const whereClause = [];
        if (flowQuery.flowIds !== void 0 && flowQuery.flowIds.length !== 0) {
          whereClause.push(`id in ("${flowQuery.flowIds.join('","')}")`);
        }
        if (flowQuery.flowStates !== void 0 && flowQuery.flowStates.length > 0) {
          whereClause.push(`status in ("${flowQuery.flowStates.join('","')}")`);
        }
        if (flowQuery.created?.from !== void 0) {
          whereClause.push(`createdAt > "${flowQuery.created.from.toISOString()}"`);
        }
        if (flowQuery.created?.to !== void 0) {
          whereClause.push(`createdAt < "${flowQuery.created.to.toISOString()}"`);
        }
        return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalFlows().get({
          queryArgs: {
            where: whereClause,
            expand: "order",
            limit,
            offset: getOffsetFromCursor(flowQuery.cursor),
            sort: sortAttributes
          }
        }).execute().then((response) => {
          const count = response.body.results.length;
          return {
            items: response.body.results.map(
              (flow) => ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(flow, CartMapper3, locale)
            ),
            count,
            total: response.body.total,
            previousCursor: ApprovalFlowMapper.calculatePreviousCursor(response.body.offset, count),
            nextCursor: ApprovalFlowMapper.calculateNextCursor(response.body.offset, count, response.body.total ?? 0)
          };
        });
      };
      this.get = async (id) => {
        const locale = await this.getCommercetoolsLocal();
        return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalFlows().withId({ ID: id }).get({
          queryArgs: {
            expand: "order"
          }
        }).execute().then((response) => {
          return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body, CartMapper3, locale);
        });
      };
      this.getFlowByOrderId = async (orderId) => {
        const locale = await this.getCommercetoolsLocal();
        const where = `order(id="${orderId}")`;
        return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalFlows().get({
          queryArgs: {
            where
          }
        }).execute().then((response) => {
          if (response.body.total !== 1) {
            throw "Order not found";
          }
          return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body.results[0], CartMapper3, locale);
        });
      };
      this.update = async (id, updateActions) => {
        const locale = await this.getCommercetoolsLocal();
        return this.get(id).then(async (approvalFlow) => {
          return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalFlows().withId({ ID: id }).post({
            body: {
              version: approvalFlow.version,
              actions: updateActions
            }
          }).execute().then((response) => {
            return ApprovalFlowMapper.mapCommercetoolsFlowToDomainFlow(response.body, CartMapper3, locale);
          });
        });
      };
      this.accountId = accountId;
      this.businessUnitKey = businessUnitKey;
    }
  };
};

// src/approval-workflows/extensions/mappers/ApprovalRuleMapper.ts
var ApprovalRuleMapper = class {
  static mapCommercetoolsRuleToDomainRule(rule, locale) {
    return {
      ...rule
    };
  }
  static calculatePreviousCursor(offset, count) {
    return offset - count >= 0 ? `offset:${offset - count}` : void 0;
  }
  static calculateNextCursor(offset, count, total) {
    return offset + count < total ? `offset:${offset + count}` : void 0;
  }
};

// src/approval-workflows/extensions/apis/ApprovalRuleApi.ts
var injectApprovalRuleApi = (BaseApi, config) => {
  return class ApprovalRuleApi extends BaseApi {
    constructor(context, locale, currency, accountId, businessUnitKey) {
      super(context, locale, currency);
      this.query = async (ruleQuery) => {
        const locale = await this.getCommercetoolsLocal();
        const limit = +ruleQuery.limit || void 0;
        const sortAttributes = [];
        if (ruleQuery.sortAttributes) {
          Object.keys(ruleQuery.sortAttributes).map((field, directionIndex) => {
            sortAttributes.push(`${field} ${Object.values(ruleQuery.sortAttributes)[directionIndex]}`);
          });
        } else {
          sortAttributes.push(`createdAt desc`);
        }
        const whereClause = [];
        if (ruleQuery.predicate !== void 0) {
          whereClause.push(`predicate="${ruleQuery.predicate}"`);
        }
        if (ruleQuery.ruleIds !== void 0 && ruleQuery.ruleIds.length > 0) {
          whereClause.push(`id in ("${ruleQuery.ruleIds.join('","')}")`);
        }
        if (ruleQuery.ruleStates !== void 0 && ruleQuery.ruleStates.length > 0) {
          whereClause.push(`status in ("${ruleQuery.ruleStates.join('","')}")`);
        }
        if (ruleQuery.created?.from !== void 0) {
          whereClause.push(`createdAt > "${ruleQuery.created.from.toISOString()}"`);
        }
        if (ruleQuery.created?.to !== void 0) {
          whereClause.push(`createdAt < "${ruleQuery.created.to.toISOString()}"`);
        }
        return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalRules().get({
          queryArgs: {
            where: whereClause,
            expand: "order",
            limit,
            offset: getOffsetFromCursor(ruleQuery.cursor),
            sort: sortAttributes
          }
        }).execute().then((response) => {
          const count = response.body.results.length;
          return {
            items: response.body.results.map(
              (flow) => ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(flow, locale)
            ),
            count,
            total: response.body.total,
            previousCursor: ApprovalRuleMapper.calculatePreviousCursor(response.body.offset, count),
            nextCursor: ApprovalRuleMapper.calculateNextCursor(response.body.offset, count, response.body.total ?? 0)
          };
        });
      };
      this.get = async (id) => {
        const locale = await this.getCommercetoolsLocal();
        return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalRules().withId({ ID: id }).get({
          queryArgs: {
            expand: "order"
          }
        }).execute().then((response) => {
          return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
        });
      };
      this.create = async (data) => {
        const locale = await this.getCommercetoolsLocal();
        return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalRules().post({
          body: {
            ...data
          }
        }).execute().then((response) => {
          return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
        });
      };
      this.update = async (id, updateActions) => {
        const locale = await this.getCommercetoolsLocal();
        return this.get(id).then((approvalRule) => {
          return this.associateEndpoints(this.accountId, this.businessUnitKey).approvalRules().withId({ ID: id }).post({
            body: {
              version: approvalRule.version,
              actions: updateActions
            }
          }).execute().then((response) => {
            return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
          });
        });
      };
      this.duplicate = async (businessUnitKey, data) => {
        const locale = await this.getCommercetoolsLocal();
        return this.associateEndpoints(this.accountId, businessUnitKey).approvalRules().post({
          body: {
            ...data
          }
        }).execute().then((response) => {
          return ApprovalRuleMapper.mapCommercetoolsRuleToDomainRule(response.body, locale);
        });
      };
      this.accountId = accountId;
      this.businessUnitKey = businessUnitKey;
    }
    //   duplicate: (businessUnitKey: string, data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
    //     businessUnitKey: string,
    //     data: ApprovalRuleDraft,
    //   ): Promise<ApprovalRule> => {
    //     const accessToken = await this.getAccessToken();
    //     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
    //     const response = await axios
    //       .post(
    //         `${clientSettings.hostUrl}/${clientSettings.projectKey}/as-associate/${this.account.accountId}/in-business-unit/key=${businessUnitKey}/approval-rules`,
    //         data,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         },
    //       )
    //       .catch(this.throwError);
    //     return response.data;
    //   };
    //   update: (id: string, updateActions: any[]) => Promise<ApprovalRule> = async (
    //     id: string,
    //     updateActions: any[],
    //   ): Promise<ApprovalRule> => {
    //     const accessToken = await this.getAccessToken();
    //     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
    //     const response = await this.get(id).then(async (approvalRule) => {
    //       const res = await axios
    //         .post(
    //           `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules/${id}`,
    //           {
    //             version: approvalRule.version,
    //             actions: updateActions,
    //           },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${accessToken}`,
    //             },
    //           },
    //         )
    //         .catch(this.throwError);
    //       return res.data;
    //     });
    //     return response.data;
    //   };
    //   create: (data: ApprovalRuleDraft) => Promise<ApprovalRule> = async (
    //     data: ApprovalRuleDraft,
    //   ): Promise<ApprovalRule> => {
    //     const accessToken = await this.getAccessToken();
    //     const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
    //     const response = await axios
    //       .post(`${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-rules`, data, {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       })
    //       .catch(this.throwError);
    //     return response.data;
    //   };
    // getFlowByOrderId: (orderId: string) => Promise<ApprovalFlow> = async (orderId: string): Promise<ApprovalFlow> => {
    //   const accessToken = await this.getAccessToken();
    //   const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
    //   const query = encodeURIComponent(`order(id="${orderId}")`);
    //   const response = await axios
    //     .get(
    //       `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-flows?where=${query}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       },
    //     )
    //     .catch(this.throwError);
    //   if (response.data.total !== 1) {
    //     throw 'Order not found';
    //   }
    //   return response.data.results[0];
    // };
    // update: (id: string, updateActions: any[]) => Promise<ApprovalFlow> = async (
    //   id: string,
    //   updateActions: any[],
    // ): Promise<ApprovalFlow> => {
    //   const accessToken = await this.getAccessToken();
    //   const clientSettings = getConfig(this.frontasticContext.projectConfiguration);
    //   const response = await this.get(id).then(async (approvalFlow) => {
    //     const res = await axios
    //       .post(
    //         `${clientSettings.hostUrl}/${clientSettings.projectKey}${this.associateEndpoints}/approval-flows/${id}`,
    //         {
    //           version: approvalFlow.version,
    //           actions: updateActions,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         },
    //       )
    //       .catch(this.throwError);
    //     return res.data;
    //   });
    //   return response.data;
    // };
  };
};

// src/approval-workflows/extensions/utils.ts
var extractDependency5 = (dependency, config) => {
  if (config) {
    switch (dependency) {
      case "ApprovalFlowApi":
        return injectApprovalFlowApi(config?.dependencies.BaseApi, config);
      case "ApprovalRuleApi":
        return injectApprovalRuleApi(config?.dependencies.BaseApi, config);
      case "CartMapper":
        return config?.dependencies.CartMapper;
    }
  }
};

// src/shared/utils/queryParamsToState.ts
var queryParamsToStates = (param, queryParams) => {
  const states = [];
  const requestParamStates = queryParams?.[param];
  if (requestParamStates) {
    if (Array.isArray(requestParamStates)) {
      states.push(...requestParamStates);
    } else {
      const params = requestParamStates.split(",");
      if (params.length > 1) {
        states.push(...params);
      } else {
        states.push(requestParamStates);
      }
    }
  }
  return states;
};
var queryParamsToState_default = queryParamsToStates;

// src/shared/utils/queryParamsToIds.ts
function queryParamsToIds(param, queryParams) {
  const paramIds = [];
  const requestParamIds = queryParams?.[param];
  if (requestParamIds) {
    if (Array.isArray(requestParamIds)) {
      paramIds.push(...requestParamIds);
    } else {
      const params = requestParamIds.split(",");
      if (params.length > 1) {
        paramIds.push(...params);
      } else {
        paramIds.push(requestParamIds);
      }
    }
  }
  return paramIds;
}
var queryParamsToIds_default = queryParamsToIds;

// src/approval-workflows/extensions/utils/ApprovalRulesQueryFactory.ts
var _ApprovalRulesQueryFactory = class _ApprovalRulesQueryFactory {
  static queryParamsToSortAttributes(queryParams) {
    const sortAttributes = {};
    if (queryParams.sortAttributes) {
      let sortAttribute;
      for (sortAttribute of Object.values(queryParams.sortAttributes)) {
        const key = Object.keys(sortAttribute)[0];
        sortAttributes[key] = sortAttribute[key] ? sortAttribute[key] : "ascending";
      }
    }
    return sortAttributes;
  }
};
_ApprovalRulesQueryFactory.queryFromParams = (request) => {
  const ruleQuery = {
    limit: request.query?.limit ?? void 0,
    cursor: request.query?.cursor ?? void 0,
    sortAttributes: _ApprovalRulesQueryFactory.queryParamsToSortAttributes(request.query),
    predicate: request.query?.predicate,
    ruleIds: queryParamsToIds_default("ruleIds", request.query),
    ruleStates: queryParamsToState_default("ruleStates", request.query),
    created: {
      from: request.query?.createdFrom ? new Date(request.query?.createdFrom) : void 0,
      to: request.query?.createdTo ? new Date(request.query?.createdTo) : void 0
    }
  };
  return ruleQuery;
};
var ApprovalRulesQueryFactory = _ApprovalRulesQueryFactory;

// src/approval-workflows/extensions/controllers/ApprovalRuleController.ts
var getApprovalApi = (request, actionContext, ApprovalFlowApi) => {
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  if (!account?.accountId) {
    throw new Error("Not logged in");
  }
  return new ApprovalFlowApi(
    actionContext,
    getLocale(request),
    getCurrency(request),
    account.accountId,
    businessUnitKey
  );
};
var getApprovalRules = (config) => {
  return async (request, actionContext) => {
    const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext, ApprovalRuleApi);
    try {
      const approvalRulesQuery = ApprovalRulesQueryFactory.queryFromParams(request);
      const res = await approvalRuleApi.query(approvalRulesQuery);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        // @ts-ignore
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var getApprovalRule = (config) => {
  return async (request, actionContext) => {
    const approvalRuleId = request.query?.["approvalRuleId"];
    const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext, ApprovalRuleApi);
    try {
      const res = await approvalRuleApi.get(approvalRuleId);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var createApprovalRule = (config) => {
  return async (request, actionContext) => {
    const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext, ApprovalRuleApi);
    const body = parseRequestBody_default(request.body);
    try {
      const res = await approvalRuleApi.create(body);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var duplicateApprovalRule = (config) => {
  return async (request, actionContext) => {
    const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext, ApprovalRuleApi);
    const approvalRuleId = request.query?.["approvalRuleId"];
    const body = parseRequestBody_default(request.body);
    const approvalRule = await approvalRuleApi.get(approvalRuleId);
    const approvalRuleDraft = {
      approvers: approvalRule.approvers,
      name: approvalRule.name,
      predicate: approvalRule.predicate,
      requesters: approvalRule.requesters,
      status: approvalRule.status,
      description: approvalRule.description
    };
    const promises = body?.businessUnitKeys.map((businessUnitKey) => approvalRuleApi.duplicate(businessUnitKey, approvalRuleDraft)) || [];
    try {
      const res = await Promise.allSettled(promises).then((values) => values);
      const rejections = res.filter((item) => item.status === "rejected").map((item) => item.reason);
      if (rejections.length) {
        throw rejections.join(". ");
      }
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var activateApprovalRule = (config) => {
  return async (request, actionContext) => {
    const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext, ApprovalRuleApi);
    const approvalRuleId = request.query?.["approvalRuleId"];
    try {
      const updateAction = {
        action: "setStatus",
        status: "Active"
      };
      const res = await approvalRuleApi.update(approvalRuleId, [updateAction]);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var deactivateApprovalRule = (config) => {
  return async (request, actionContext) => {
    const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext, ApprovalRuleApi);
    const approvalRuleId = request.query?.["approvalRuleId"];
    try {
      const updateAction = {
        action: "setStatus",
        status: "Inactive"
      };
      const res = await approvalRuleApi.update(approvalRuleId, [updateAction]);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var updateApprovalRule = (config) => {
  return async (request, actionContext) => {
    const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", config);
    const approvalRuleApi = getApprovalApi(request, actionContext.frontasticContext, ApprovalRuleApi);
    const approvalRuleId = request.query?.["approvalRuleId"];
    try {
      const body = parseRequestBody_default(request.body);
      const updateActions = [];
      const approvalRule = await approvalRuleApi.get(approvalRuleId);
      if (!body) {
        const response = {
          statusCode: 401,
          body: JSON.stringify("Body is empty")
        };
        return response;
      }
      if (body?.name && body.name !== approvalRule.name) {
        updateActions.push({
          action: "setName",
          name: body.name
        });
      }
      if (body.description && body.description !== approvalRule.description) {
        updateActions.push({
          action: "setDescription",
          description: body.description
        });
      }
      if (body.requesterKeys) {
        updateActions.push({
          action: "setRequesters",
          requesters: body.requesterKeys.map((key) => ({
            associateRole: {
              typeId: "associate-role",
              key
            }
          }))
        });
      }
      if (body.predicate && body.predicate !== approvalRule.predicate) {
        updateActions.push({
          action: "setPredicate",
          predicate: body.predicate
        });
      }
      const res = await approvalRuleApi.update(approvalRuleId, updateActions);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        // @ts-ignore
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};

// src/approval-workflows/extensions/utils/ApprovalFlowsQueryFactory.ts
var _ApprovalFlowsQueryFactory = class _ApprovalFlowsQueryFactory {
  static queryParamsToSortAttributes(queryParams) {
    const sortAttributes = {};
    if (queryParams.sortAttributes) {
      let sortAttribute;
      for (sortAttribute of Object.values(queryParams.sortAttributes)) {
        const key = Object.keys(sortAttribute)[0];
        sortAttributes[key] = sortAttribute[key] ? sortAttribute[key] : "ascending";
      }
    }
    return sortAttributes;
  }
};
_ApprovalFlowsQueryFactory.queryFromParams = (request) => {
  const flowQuery = {
    limit: request.query?.limit ?? void 0,
    cursor: request.query?.cursor ?? void 0,
    sortAttributes: _ApprovalFlowsQueryFactory.queryParamsToSortAttributes(request.query),
    flowIds: queryParamsToIds_default("flowIds", request.query),
    flowStates: queryParamsToState_default("flowStates", request.query),
    created: {
      from: request.query?.createdFrom ? new Date(request.query?.createdFrom) : void 0,
      to: request.query?.createdTo ? new Date(request.query?.createdTo) : void 0
    }
  };
  return flowQuery;
};
var ApprovalFlowsQueryFactory = _ApprovalFlowsQueryFactory;

// src/approval-workflows/extensions/utils/getApprovalApi.ts
var getApprovalApi2 = (request, actionContext, ApprovalApi) => {
  const account = fetchAccountFromSession(request);
  const businessUnitKey = getBusinessUnitKey(request);
  if (!account?.accountId) {
    throw new Error("Not logged in");
  }
  return new ApprovalApi(
    actionContext,
    getLocale(request),
    getCurrency(request),
    account.accountId,
    businessUnitKey
  );
};

// src/approval-workflows/extensions/controllers/ApprovalFlowController.ts
var getApprovalFlows = (config) => {
  return async (request, actionContext) => {
    const ApprovalFlowApi = extractDependency5("ApprovalFlowApi", config);
    const approvalFlowApi = getApprovalApi2(request, actionContext.frontasticContext, ApprovalFlowApi);
    try {
      const approvalFlowQuery = ApprovalFlowsQueryFactory.queryFromParams(request);
      const res = await approvalFlowApi.query(approvalFlowQuery);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        // @ts-ignore
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var getApprovalFlow = (config) => {
  return async (request, actionContext) => {
    const approvalFlowId = request.query?.["approvalFlowId"];
    const ApprovalFlowApi = extractDependency5("ApprovalFlowApi", config);
    const approvalFlowApi = getApprovalApi2(request, actionContext.frontasticContext, ApprovalFlowApi);
    try {
      const res = await approvalFlowApi.get(approvalFlowId);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var getApprovalFlowByOrderId = (config) => {
  return async (request, actionContext) => {
    const orderId = request.query?.["orderId"];
    const ApprovalFlowApi = extractDependency5("ApprovalFlowApi", config);
    const approvalFlowApi = getApprovalApi2(request, actionContext.frontasticContext, ApprovalFlowApi);
    try {
      const res = await approvalFlowApi.getFlowByOrderId(orderId);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var approveFlow = (config) => {
  return async (request, actionContext) => {
    const approvalFlowId = request.query?.["approvalFlowId"];
    const ApprovalFlowApi = extractDependency5("ApprovalFlowApi", config);
    const approvalFlowApi = getApprovalApi2(request, actionContext.frontasticContext, ApprovalFlowApi);
    try {
      const updateAction = {
        action: "approve"
      };
      const res = await approvalFlowApi.update(approvalFlowId, [updateAction]);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};
var rejectFlow = (config) => {
  return async (request, actionContext) => {
    const approvalFlowId = request.query?.["approvalFlowId"];
    const ApprovalFlowApi = extractDependency5("ApprovalFlowApi", config);
    const approvalFlowApi = getApprovalApi2(request, actionContext.frontasticContext, ApprovalFlowApi);
    const body = parseRequestBody_default(request.body);
    try {
      const updateAction = {
        action: "reject",
        reason: body?.reason
      };
      const res = await approvalFlowApi.update(approvalFlowId, [updateAction]);
      return {
        statusCode: 200,
        body: JSON.stringify(res),
        sessionData: request.sessionData
      };
    } catch (error) {
      const response = {
        statusCode: 401,
        body: JSON.stringify(error.message || error.body?.message || error)
      };
      return response;
    }
  };
};

// src/approval-workflows/extensions/dataSources/index.ts
function approvalFlowQueryFromContext(context, config, configuration) {
  const ApprovalFlowApi = extractDependency5("ApprovalFlowApi", configuration);
  const approvalFlowApi = getApprovalApi2(context.request, context.frontasticContext, ApprovalFlowApi);
  const flowQuery = {
    limit: context.request?.query?.limit ?? void 0,
    cursor: context.request?.query?.cursor ?? void 0,
    flowIds: queryParamsToIds_default("flowIds", context.request?.query),
    flowStates: queryParamsToState_default("flowStates", context.request?.query)
  };
  return { approvalFlowApi, flowQuery };
}
function approvalRuleQueryFromContext(context, config, configuration) {
  const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", configuration);
  const approvalRulepi = getApprovalApi2(context.request, context.frontasticContext, ApprovalRuleApi);
  const ruleQuery = {
    limit: context.request?.query?.limit ?? void 0,
    cursor: context.request?.query?.cursor ?? void 0,
    ruleIds: queryParamsToIds_default("ruleIds", context.request?.query),
    ruleStates: queryParamsToState_default("ruleStates", context.request?.query)
  };
  return { approvalRulepi, ruleQuery };
}
var dataSources_default = {
  "frontastic/approval-flow": {
    create: true,
    hook: (configuration) => async (config, context) => {
      const { approvalFlowApi, flowQuery } = approvalFlowQueryFromContext(context, config, configuration);
      return await approvalFlowApi.query(flowQuery).then((flowResult) => {
        return {
          dataSourcePayload: {
            flow: flowResult.items?.[0]
          }
        };
      });
    }
  },
  "frontastic/approval-rule": {
    create: true,
    hook: (configuration) => async (config, context) => {
      const { approvalRulepi, ruleQuery } = approvalRuleQueryFromContext(context, config, configuration);
      return await approvalRulepi.query(ruleQuery).then((ruleResult) => {
        return {
          dataSourcePayload: {
            rule: ruleResult.items?.[0]
          }
        };
      });
    }
  }
};

// src/approval-workflows/extensions/ApprovalRouter.ts
var flowRegex = /\/approval-flow\/([^\/]+)/;
var ruleRegex = /\/approval-rule\/([^\/]+)/;
var ApprovalRouter = class {
  static identifyRuleFrom(request) {
    if (getPath(request)?.match(ruleRegex)) {
      return true;
    }
    return false;
  }
  static identifyFlowFrom(request) {
    if (getPath(request)?.match(flowRegex)) {
      return true;
    }
    return false;
  }
};
ApprovalRouter.loadFlowFor = async (request, frontasticContext, configuration) => {
  const ApprovalFlowApi = extractDependency5("ApprovalFlowApi", configuration);
  const approvalFlowApi = getApprovalApi2(request, frontasticContext, ApprovalFlowApi);
  const urlMatches = getPath(request)?.match(flowRegex);
  if (urlMatches) {
    return await approvalFlowApi.get(urlMatches[1]);
  }
  return null;
};
ApprovalRouter.loadRuleFor = async (request, frontasticContext, configuration) => {
  const ApprovalRuleApi = extractDependency5("ApprovalRuleApi", configuration);
  const approvalRuleApi = getApprovalApi2(request, frontasticContext, ApprovalRuleApi);
  const urlMatches = getPath(request)?.match(ruleRegex);
  if (urlMatches) {
    return await approvalRuleApi.get(urlMatches[1]);
  }
  return null;
};

// src/approval-workflows/extensions/dynamicPageHandlers/index.ts
var injectFlowPageHandler = (request, context, config) => {
  if (ApprovalRouter.identifyFlowFrom(request)) {
    return ApprovalRouter.loadFlowFor(request, context.frontasticContext, config).then((flow) => {
      if (flow) {
        return {
          dynamicPageType: "frontastic/approval-flow-page",
          dataSourcePayload: {
            flow
          },
          pageMatchingPayload: {
            flow
          }
        };
      }
      return null;
    });
  }
};
var injectRulePageHandler = (request, context, config) => {
  if (ApprovalRouter.identifyRuleFrom(request)) {
    return ApprovalRouter.loadRuleFor(request, context.frontasticContext, config).then((rule) => {
      if (rule) {
        return {
          dynamicPageType: "frontastic/approval-rule-page",
          dataSourcePayload: {
            rule
          },
          pageMatchingPayload: {
            rule
          }
        };
      }
      return null;
    });
  }
};

// src/approval-workflows/extensions/index.ts
var approvalWorkflowsExt = {
  dataSources: dataSources_default,
  dynamicPageHandlers: {
    "frontastic/approval-flow-page": {
      hook: injectFlowPageHandler,
      create: true
    },
    "frontastic/approval-rule-page": {
      hook: injectRulePageHandler,
      create: true
    }
  },
  actions: [
    {
      action: "getApprovalFlows",
      actionNamespace: "approval",
      hook: getApprovalFlows,
      create: true
    },
    {
      action: "approveFlow",
      actionNamespace: "approval",
      hook: approveFlow,
      create: true
    },
    {
      action: "rejectFlow",
      actionNamespace: "approval",
      hook: rejectFlow,
      create: true
    },
    {
      action: "getApprovalFlow",
      actionNamespace: "approval",
      hook: getApprovalFlow,
      create: true
    },
    {
      action: "getApprovalFlowByOrderId",
      actionNamespace: "approval",
      hook: getApprovalFlowByOrderId,
      create: true
    },
    {
      action: "getApprovalRules",
      actionNamespace: "approval",
      hook: getApprovalRules,
      create: true
    },
    { action: "getApprovalRule", actionNamespace: "approval", hook: getApprovalRule, create: true },
    { action: "activateApprovalRule", actionNamespace: "approval", hook: activateApprovalRule, create: true },
    { action: "createApprovalRule", actionNamespace: "approval", hook: createApprovalRule, create: true },
    { action: "deactivateApprovalRule", actionNamespace: "approval", hook: deactivateApprovalRule, create: true },
    { action: "duplicateApprovalRule", actionNamespace: "approval", hook: duplicateApprovalRule, create: true },
    { action: "updateApprovalRule", actionNamespace: "approval", hook: updateApprovalRule, create: true }
  ]
};
var extensions_default5 = approvalWorkflowsExt;

// src/utils/index.ts
var mergeExtensions = (extensionRegirstry, addOnRegistry, config) => {
  const actionNamespaces = mergeActions(extensionRegirstry, addOnRegistry, config);
  const dataSources = mergeDataSources(extensionRegirstry, addOnRegistry, config);
  const dynamicPageHandlers = mergeDynamicPageHandlers(extensionRegirstry, addOnRegistry, config);
  return {
    ...extensionRegirstry,
    actions: actionNamespaces,
    "data-sources": dataSources,
    "dynamic-page-handler": dynamicPageHandlers
  };
};
function mergeActions(extensionRegirstry, addOnRegistry, config) {
  const actionNamespaces = extensionRegirstry.actions || {};
  addOnRegistry.actions.forEach((hook) => {
    if (!actionNamespaces[hook.actionNamespace]) {
      actionNamespaces[hook.actionNamespace] = {};
    }
    if (hook.create) {
      const newAction = hook.hook(config);
      actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], {
        [hook.action]: newAction
      });
    } else if (actionNamespaces[hook.actionNamespace]?.[hook.action]) {
      const newAction = hook.hook(
        actionNamespaces[hook.actionNamespace][hook.action],
        config
      );
      actionNamespaces[hook.actionNamespace] = Object.assign({}, actionNamespaces[hook.actionNamespace], {
        [hook.action]: newAction
      });
    }
  });
  return actionNamespaces;
}
function mergeDataSources(extensionRegirstry, addOnRegistry, config) {
  let dataSources = extensionRegirstry["data-sources"] || {};
  if (addOnRegistry.dataSources) {
    for (const ds in addOnRegistry.dataSources) {
      if (addOnRegistry.dataSources[ds].create) {
        const newDataSource = addOnRegistry.dataSources[ds].hook(config);
        dataSources = Object.assign({}, dataSources, {
          [ds]: newDataSource
        });
      } else if (dataSources[ds]) {
        const newDataSource = addOnRegistry.dataSources[ds].hook(dataSources[ds], config);
        dataSources = Object.assign({}, dataSources, {
          [ds]: newDataSource
        });
      }
    }
  }
  return dataSources;
}
function mergeDynamicPageHandlers(extensionRegirstry, addOnRegistry, config) {
  const originalDynamicPageHandler = extensionRegirstry["dynamic-page-handler"];
  return async (request, context) => {
    const originalResult = await originalDynamicPageHandler(request, context);
    if (addOnRegistry.dynamicPageHandlers && originalResult && "dynamicPageType" in originalResult && addOnRegistry.dynamicPageHandlers?.[originalResult.dynamicPageType]) {
      return addOnRegistry.dynamicPageHandlers[originalResult.dynamicPageType].hook(
        request,
        context,
        originalResult,
        config
      );
    }
    if (!originalResult) {
      let result = null;
      for (let index = 0; index < Object.keys(addOnRegistry.dynamicPageHandlers || {}).length; index++) {
        const key = Object.keys(addOnRegistry.dynamicPageHandlers || {})[index];
        if (addOnRegistry.dynamicPageHandlers?.[key]?.create) {
          result = await addOnRegistry.dynamicPageHandlers[key].hook(
            request,
            context,
            config
          );
          if (result) {
            break;
          }
        }
      }
      return result;
    }
    return originalResult;
  };
}

// src/extensions.ts
var injectExtensionsRegistry = (extensionRegirstry, configuration) => {
  if (!configuration) {
    return extensionRegirstry;
  }
  Object.keys(configuration.modules || {}).forEach((mod) => {
    switch (mod) {
      case "minimum-quantity" /* MinimumQuantity */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default,
          configuration.modules["minimum-quantity" /* MinimumQuantity */]
        );
        break;
      case "superuser" /* Superuser */:
        extensionRegirstry = mergeExtensions(extensionRegirstry, extensions_default2, configuration.modules["superuser" /* Superuser */]);
        break;
      case "configurable-products" /* ConfigurableProducts */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default4,
          configuration.modules["configurable-products" /* ConfigurableProducts */]
        );
        break;
      case "superuser-b2b" /* SuperuserB2B */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default3,
          configuration.modules["superuser-b2b" /* SuperuserB2B */]
        );
        break;
      case "approval-workflows" /* ApprovalWorkflows */:
        extensionRegirstry = mergeExtensions(
          extensionRegirstry,
          extensions_default5,
          configuration.modules["approval-workflows" /* ApprovalWorkflows */]
        );
        break;
      default:
        break;
    }
  });
  return extensionRegirstry;
};
export {
  injectExtensionsRegistry
};
