// src/superuser/extensions/dataSources/index.ts
var dataSources_default = {
  "frontastic/csr": async (config, context) => {
    return {
      dataSourcePayload: {
        superUser: context?.request?.sessionData?.superUser
      }
    };
  }
};

export {
  dataSources_default
};
