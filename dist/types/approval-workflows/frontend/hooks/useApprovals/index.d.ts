import { UseApprovals } from '../types';
export interface Options {
    cursor?: string;
    limit?: number;
    ids?: string[];
    states?: string[];
    createdFrom?: string;
    createdTo?: string;
    predicate?: string;
}
export declare const useApprovals: (sdk: any, businessUnitKey?: string, storeKey?: string) => UseApprovals;
//# sourceMappingURL=index.d.ts.map