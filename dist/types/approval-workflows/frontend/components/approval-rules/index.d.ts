import React from 'react';
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
declare const ApprovalRules: React.FC<ApprovalRuleProps>;
export default ApprovalRules;
//# sourceMappingURL=index.d.ts.map