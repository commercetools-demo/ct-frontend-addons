// import { CartMapper } from './CartMapper';
import { ApprovalRule } from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
// import { DomainApprovalFlow } from '../types/approval/Flow';

export class ApprovalRuleMapper {
  static mapCommercetoolsRuleToDomainRule(rule: ApprovalRule, locale: Locale): ApprovalRule {
    return {
      ...rule,
    };
  }

  static calculatePreviousCursor(offset: number, count: number) {
    return offset - count >= 0 ? `offset:${offset - count}` : undefined;
  }

  static calculateNextCursor(offset: number, count: number, total: number) {
    return offset + count < total ? `offset:${offset + count}` : undefined;
  }
}
