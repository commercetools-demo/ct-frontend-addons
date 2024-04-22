import React from 'react';
import RefinementsDrawer from './refinements-drawer';
import Refinements from './refinements';
import CurrentRefinements from './current-refinements';
import FlowsTable from './flows-table';
import { FlowComponents } from './approval-flow-panel';
import { ApprovalFlow } from '../../../types/approval/Flow';

export interface ApprovalFlowsProps {
  translate: (key: string) => string;
  components: FlowComponents;
  flows: ApprovalFlow[];
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
const ApprovalFlows: React.FC<ApprovalFlowsProps> = ({
  translate,
  components,
  flows,
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
    flows,
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
  const tableProps = { flows, totalItems, page, limit, components, onPageChange, onRowsPerPageChange, translate };

  return (
    <div className="w-full">
      <RefinementsDrawer {...refinementProps} />
      <Refinements {...refinementProps} />
      <CurrentRefinements {...currentRefinementsProps} />
      <FlowsTable {...tableProps} />
    </div>
  );
};

export default ApprovalFlows;
