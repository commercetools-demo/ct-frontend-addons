import React, { useMemo } from 'react';
import Refinements from './refinements';
import CurrentRefinements from './current-refinements';
import RulesTable from './rules-table';
import { RuleComponents } from './approval-rules-panel';
import { ApprovalRule } from '../../../types/approval/Rule';
export interface ApprovalRuleProps {
  translate: (key: string) => string;
  components: RuleComponents;
  permissions?: Record<string, boolean>;
  rules: ApprovalRule[];
  totalItems: number;
  filters: {
    sort?: string;
    search?: string;
    status?: string[];
    createdFrom?: string;
    createdTo?: string;
  };
  sortOptions: {
    name: string;
    value: string;
  }[];
  statusOptions: Array<
    {
      name: string;
      value: string;
    } & { count?: number }
  >;
  onClearRefinements?: () => void;
  onStatusRefine?: (status: string) => void;
  onCreationDateRefine?: (args: { from?: Date; to?: Date }) => void;
  onSearch?: (search: string) => void;
  onSortBy?: (sort: string) => void;
  page: number;
  onPageChange?: (page: number) => void;
  limit: number;
  onRowsPerPageChange?: (value: string) => void;
}
const ApprovalRules: React.FC<ApprovalRuleProps> = ({
  translate,
  permissions,
  components,
  rules,
  onClearRefinements,
  onStatusRefine,
  onCreationDateRefine,
  onSearch,
  sortOptions,
  onSortBy,
  filters,
  statusOptions,
  totalItems,
  page,
  onPageChange,
  onRowsPerPageChange,
  limit,
}) => {
  const refinementProps = {
    rules,
    onClearRefinements,
    onSearch,
    onStatusRefine,
    onCreationDateRefine,
    sortOptions,
    onSortBy,
    filters,
    statusOptions,
    translate,
    components,
  };
  const currentRefinementsProps = {
    translate,
    onClearRefinements,
    filters,
    onSearch,
    onStatusRefine,
    onCreationDateRefine,
  };
  const tableProps = { rules, totalItems, page, limit, components, onPageChange, onRowsPerPageChange, translate };
  const viewOnly = useMemo(() => !permissions?.UpdateApprovalRules, [permissions]);
  const buttonLink = '/create-approval-rule';

  return (
    <div className="w-full">
      <Refinements {...refinementProps}>
        <components.Link href={!viewOnly ? buttonLink : ''} className="block w-full md:w-fit" underlineOnHover={false}>
          <components.Button size="m" className="w-full px-6" disabled={viewOnly}>
            {translate('dashboard.new.rule')}
          </components.Button>
        </components.Link>
      </Refinements>
      <CurrentRefinements {...currentRefinementsProps} />
      <RulesTable {...tableProps} />
    </div>
  );
};

export default ApprovalRules;
