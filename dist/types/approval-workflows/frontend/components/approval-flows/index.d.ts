import React from 'react';
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
    statusOptions: Array<{
        name: string;
        value: string;
    } & {
        count?: number;
    }>;
    onClearRefinements?: () => void;
    onStatusRefine?: (status: string) => void;
    onCreationDateRefine?: (args: {
        from?: Date;
        to?: Date;
    }) => void;
    onSearch?: (search: string) => void;
    onSortBy?: (sort: string) => void;
    page: number;
    onPageChange?: (page: number) => void;
    limit: number;
    onRowsPerPageChange?: (value: string) => void;
}
declare const ApprovalFlows: React.FC<ApprovalFlowsProps>;
export default ApprovalFlows;
//# sourceMappingURL=index.d.ts.map