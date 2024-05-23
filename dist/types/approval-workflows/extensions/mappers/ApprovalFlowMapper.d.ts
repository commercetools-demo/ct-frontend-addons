import { ApprovalFlow as CommercewtoolsApprovalFlow } from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
import { ApprovalFlow } from '../../types/approval/Flow';
export declare class ApprovalFlowMapper {
    static mapCommercetoolsFlowToDomainFlow(flow: CommercewtoolsApprovalFlow, CartMapper: any, locale: Locale): ApprovalFlow;
    static calculatePreviousCursor(offset: number, count: number): string | undefined;
    static calculateNextCursor(offset: number, count: number, total: number): string | undefined;
}
//# sourceMappingURL=ApprovalFlowMapper.d.ts.map