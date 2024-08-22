import { DynamicPageContext, DynamicPageSuccessResult, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { extractDependency } from '../utils';
import { getCartApi } from '../../../shared/utils/getCartApi';
import CartMapper from '../mappers/CartMapper';

export const injectThankYouPageHandler = async (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration,
) => {
  const order = originalResult.dataSourcePayload.order;
  if (!order) {
    const CartApi = extractDependency('CartApi', config);
    const cartApi = getCartApi(request, context.frontasticContext!, CartApi);

    const orderQuery = {
      orderIds: [request.query?.orderId],
    };
    const result = await cartApi.queryOrders(orderQuery);

    if (result?.items.length > 0) {
      return {
        ...originalResult,
        dataSourcePayload: {
          ...originalResult.dataSourcePayload,
          order: result.items[0],
        },
      };
    }
  }
  return originalResult;
};

export const injectOrderPageHandler = async (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration,
) => {
  if (originalResult.dataSourcePayload?.order) {
    const order: { orderId: string } = originalResult.dataSourcePayload?.order;
    const CartApi = extractDependency('CartApi', config);

    const cartApi = getCartApi(request, context.frontasticContext!, CartApi);
    const commercetoolsOrder = await cartApi.getCommercetoolsOrderById(order.orderId);
    const mergedOrder = CartMapper.mergeCommercetoolsOrderToOrder(
      commercetoolsOrder,
      originalResult.dataSourcePayload?.order,
      config,
    );
    return {
      ...originalResult,
      dataSourcePayload: {
        ...originalResult.dataSourcePayload,
        order: mergedOrder,
      },
    };
  }
  return originalResult;
};
