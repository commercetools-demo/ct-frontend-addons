

export const injectAccountApi = (BaseAccountApi: any): typeof BaseAccountApi => {
  return class AccountApi extends BaseAccountApi {
    // override or create any new metods here
  };
};
