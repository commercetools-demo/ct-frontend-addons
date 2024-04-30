import { SortAttributes } from "@commercetools/frontend-domain-types/query";

export interface FlowQuery {
    sortAttributes?: SortAttributes;
    flowIds?: string[];
    flowStates?: string[];
    limit?: number;
    cursor?: string;
    created?: {
      from?: Date;
      to?: Date;
    }
  }

export interface RuleQuery {
    sortAttributes?: SortAttributes;
    limit?: number;
    cursor?: string;
    predicate?: string;
    ruleIds?: string[];
    ruleStates?: string[];
    created?: {
      from?: Date;
      to?: Date;
    }
  }