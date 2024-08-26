import { Request } from '@frontastic/extension-types';
import { RuleQuery } from '../../types/approval/Query';
import { SortAttributes } from '@commercetools/frontend-domain-types/query';
import queryParamsToStates from '../../../shared/utils/queryParamsToState';
import queryParamsToIds from '../../../shared/utils/queryParamsToIds';

export class ApprovalRulesQueryFactory {
  static queryFromParams: (request: Request) => RuleQuery = (request: Request) => {
    const ruleQuery: RuleQuery = {
      limit: request.query?.limit ?? undefined,
      cursor: request.query?.cursor ?? undefined,
      sortAttributes: ApprovalRulesQueryFactory.queryParamsToSortAttributes(request.query),
      predicate: request.query?.predicate,
      ruleIds: queryParamsToIds('ruleIds', request.query),
      ruleStates: queryParamsToStates('ruleStates', request.query),
      created: {
        from: request.query?.createdFrom ? new Date(request.query?.createdFrom) : undefined,
        to: request.query?.createdTo ? new Date(request.query?.createdTo) : undefined,
      },
    };

    return ruleQuery;
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
