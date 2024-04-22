export const injectBaseApi = (BaseBaseApi: any): typeof BaseBaseApi => {
  return class BaseApi extends BaseBaseApi {
    protected async getCommercetoolsProductTypes() {
      const now = Date.now();

      if (this.projectKey in productTypesCache) {
        const cacheEntry = productTypesCache[this.projectKey];

        if (now < cacheEntry.expiryTime) {
          return cacheEntry.productTypes;
        }
      }

      return await this.requestBuilder()
        .productTypes()
        .get()
        .execute()
        .then((response) => {
          const productTypes = response.body.results;

          productTypesCache[this.projectKey] = {
            productTypes,
            expiryTime: projectCacheTtlMilliseconds * 1000 + now,
          };

          return productTypes;
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }
  };
};
