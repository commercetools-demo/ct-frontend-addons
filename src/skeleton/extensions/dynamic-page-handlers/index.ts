import { DynamicPageContext, DynamicPageSuccessResult, Request } from '@frontastic/extension-types';
import { Configuration } from '../../types';

export const injectSampleHandlerHere = async (
  request: Request,
  context: DynamicPageContext,
  originalResult: DynamicPageSuccessResult,
  config: Configuration,
) => {
  // replace order with any object exposed by the dataSource payload result
  const order = originalResult.dataSourcePayload.order;
  if (!order) {
    // add your code here
   

      return {
        ...originalResult,
        dataSourcePayload: {
          ...originalResult.dataSourcePayload,
          newStuff: 'foo-bar',
        },
      }
  }
  return originalResult;
};