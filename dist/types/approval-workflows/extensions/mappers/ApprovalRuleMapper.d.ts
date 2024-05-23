import { ApprovalRule } from '@commercetools/platform-sdk';
import { Locale } from '../../../utils/locale';
export declare class ApprovalRuleMapper {
    static mapCommercetoolsRuleToDomainRule(rule: ApprovalRule, locale: Locale): ApprovalRule;
    static calculatePreviousCursor(offset: number, count: number): string | undefined;
    static calculateNextCursor(offset: number, count: number, total: number): string | undefined;
}
//# sourceMappingURL=ApprovalRuleMapper.d.ts.map