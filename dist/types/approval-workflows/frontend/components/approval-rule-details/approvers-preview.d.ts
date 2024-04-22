import React from 'react';
import { ApproverConjunction } from '../../../types/approval/Rule';
import { RuleComponents } from '.';
type Props = {
    previewApprovedRoles?: string[];
    previewRejecteddRoles?: string[];
    tiers: ApproverConjunction[];
    isPreview?: boolean;
    onEdit?: () => void;
    translate: (translationKey: string) => string;
    components: RuleComponents;
};
declare const ApproversPreview: React.FC<Props>;
export default ApproversPreview;
//# sourceMappingURL=approvers-preview.d.ts.map