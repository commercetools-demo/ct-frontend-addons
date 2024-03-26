import {
  extractDependency
} from "./chunk-HF434PTE.js";
import {
  getCurrency,
  getLocale
} from "./chunk-OUNJUZFQ.js";

// src/subscription/extensions/actionControllers/SubscriptionController.ts
var getAllSubscriptions = (config) => {
  return async (request, actionContext) => {
    const SubscriptionApi = extractDependency("SubscriptionApi", config);
    const account = request.sessionData?.account;
    if (!account) {
      throw new Error("Not logged in.");
    }
    const subscriptionApi = new SubscriptionApi(
      actionContext.frontasticContext,
      getLocale(request),
      getCurrency(request)
    );
    const subscriptions = await subscriptionApi.getSubscriptionsForAccount(account.accountId);
    return {
      statusCode: 200,
      body: JSON.stringify(subscriptions),
      sessionData: request.sessionData
    };
  };
};

export {
  getAllSubscriptions
};
