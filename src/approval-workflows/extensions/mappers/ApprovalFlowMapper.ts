import { ApprovalFlow as CommercewtoolsApprovalFlow } from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
import { ApprovalFlow } from '../../types/approval/Flow';

export class ApprovalFlowMapper {
  static mapCommercetoolsFlowToDomainFlow(
    flow: CommercewtoolsApprovalFlow,
    CartMapper: any,
    locale: Locale,
  ): ApprovalFlow {
    return {
      ...flow,
      ...(flow.order?.obj && { order: CartMapper.commercetoolsOrderToOrder(flow.order.obj, locale) }),
    };
  }

  static calculatePreviousCursor(offset: number, count: number) {
    return offset - count >= 0 ? `offset:${offset - count}` : undefined;
  }

  static calculateNextCursor(offset: number, count: number, total: number) {
    return offset + count < total ? `offset:${offset + count}` : undefined;
  }
}
