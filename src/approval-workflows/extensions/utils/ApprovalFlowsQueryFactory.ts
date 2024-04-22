import { Request } from '@frontastic/extension-types';
import { FlowQuery } from '../../types/approval/Query';
import { SortAttributes } from '@commercetools/frontend-domain-types/query';
import queryParamsToIds from '../../../shared/utils/queryParamsToIds';
import queryParamsToStates from '../../../shared/utils/queryParamsToState';


export class ApprovalFlowsQueryFactory {
  static queryFromParams: (request: Request) => FlowQuery = (
    request: Request,
  ) => {

    const flowQuery: FlowQuery = {
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
      sortAttributes: ApprovalFlowsQueryFactory.queryParamsToSortAttributes(request.query),
      flowIds: queryParamsToIds('flowIds', request.query),
      flowStates: queryParamsToStates('flowStates', request.query),
      created: {
        from: request.query?.createdFrom ? new Date(request.query?.createdFrom) : undefined,
        to: request.query?.createdTo ? new Date(request.query?.createdTo) : undefined,
      },
    };

    return flowQuery;
  };

  private static queryParamsToSortAttributes(queryParams: any) {
    const sortAttributes: SortAttributes = {};

    if (queryParams.sortAttributes) {
      let sortAttribute: Record<string, string>;

      // @ts-ignore
      for (sortAttribute of Object.values(queryParams.sortAttributes)) {
        const key = Object.keys(sortAttribute)[0];
        sortAttributes[key] = sortAttribute[key] ? sortAttribute[key] : 'ascending';
      }
    }

    return sortAttributes;
  }
}
