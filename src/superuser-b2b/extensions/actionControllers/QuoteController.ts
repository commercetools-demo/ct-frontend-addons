import { ActionContext, ActionHandler, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';
import { getCartApi } from '../../../shared/utils/getCartApi';

export const createQuoteRequest = (originalCb: ActionHandler, config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const CartApi = extractDependency('CartApi', config);
    const cartApi = getCartApi(request, actionContext.frontasticContext!, CartApi);
    const cartId = request.sessionData?.cartId;

    // If the cartId or the originalEmailFieldKey is not found, return the original callback.
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
