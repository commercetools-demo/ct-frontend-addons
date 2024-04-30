import { DataSourceConfiguration, DataSourceContext } from '@frontastic/extension-types';
import { Configuration } from '../../types';
import { DataSources as DataSourcesType, PaginatedResult } from '../../../utils/types';
import { extractDependency } from '../utils';
import { getApprovalApi } from '../utils/getApprovalApi';
import { FlowQuery, RuleQuery } from '../../types/approval/Query';
import queryParamsToIds from '../../../shared/utils/queryParamsToIds';
import queryParamsToStates from '../../../shared/utils/queryParamsToState';
import { ApprovalFlow } from '../../types/approval/Flow';
import { ApprovalRule } from '../../types/approval/Rule';

function approvalFlowQueryFromContext(
  context: DataSourceContext,
  config: DataSourceConfiguration,
  configuration: Configuration,
) {
  const ApprovalFlowApi = extractDependency('ApprovalFlowApi', configuration);
  const approvalFlowApi = getApprovalApi(context.request!, context.frontasticContext!, ApprovalFlowApi);

  const flowQuery: FlowQuery = {
    limit: context.request?.query?.limit ?? undefined,
    cursor: context.request?.query?.cursor ?? undefined,
    flowIds: queryParamsToIds('flowIds', context.request?.query),
    flowStates: queryParamsToStates('flowStates', context.request?.query),
  };

  return { approvalFlowApi, flowQuery };
}

function approvalRuleQueryFromContext(
  context: DataSourceContext,
  config: DataSourceConfiguration,
  configuration: Configuration,
) {
  const ApprovalRuleApi = extractDependency('ApprovalRuleApi', configuration);
  const approvalRulepi = getApprovalApi(context.request!, context.frontasticContext!, ApprovalRuleApi);

  const ruleQuery: RuleQuery = {
    limit: context.request?.query?.limit ?? undefined,
    cursor: context.request?.query?.cursor ?? undefined,
    ruleIds: queryParamsToIds('ruleIds', context.request?.query),
    ruleStates: queryParamsToStates('ruleStates', context.request?.query),
  };

  return { approvalRulepi, ruleQuery };
}

export default {
  'frontastic/approval-flow': {
    create: true,
    hook: (configuration: Configuration) => async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const { approvalFlowApi, flowQuery } = approvalFlowQueryFromContext(context, config, configuration);

      return await approvalFlowApi.query(flowQuery).then((flowResult: PaginatedResult<ApprovalFlow>) => {
        return {
          dataSourcePayload: {
            flow: flowResult.items?.[0],
          },
        };
      });
    },
  },
  'frontastic/approval-rule': {
    create: true,
    hook: (configuration: Configuration) => async (config: DataSourceConfiguration, context: DataSourceContext) => {
      const { approvalRulepi, ruleQuery } = approvalRuleQueryFromContext(context, config, configuration);

      return await approvalRulepi.query(ruleQuery).then((ruleResult: PaginatedResult<ApprovalRule>) => {
        return {
          dataSourcePayload: {
            rule: ruleResult.items?.[0],
          },
        };
      });
    },
  },
} as DataSourcesType<Configuration>;
