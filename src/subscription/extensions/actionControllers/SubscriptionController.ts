import { ActionContext, Request, Response } from '@frontastic/extension-types';
import { getCurrency, getLocale } from '../../../utils/request';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';

export const getAllSubscriptions = (config: Configuration) => {
  return async (request: Request, actionContext: ActionContext): Promise<Response> => {
    const SubscriptionApi = extractDependency('SubscriptionApi', config);

    const account = request.sessionData?.account;
    if (!account) {
      throw new Error('Not logged in.');
    }

    const subscriptionApi = new SubscriptionApi(
      actionContext.frontasticContext,
      getLocale(request),
      getCurrency(request),
    );
    const subscriptions = await subscriptionApi.getSubscriptionsForAccount(account.accountId);

    return {
      statusCode: 200,
      body: JSON.stringify(subscriptions),
      sessionData: request.sessionData,
    };
  };
};
