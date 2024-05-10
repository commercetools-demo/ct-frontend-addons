import React from 'react';
import { ApproverConjunction } from '../../../types/approval/Rule';
import { AssociateRoleAssignment } from '@commercetools/platform-sdk';
import { RuleComponents } from '.';
type Props = {
    tiers: ApproverConjunction[];
    associateRoles?: {
        value: string;
        name: string;
    }[];
    onUpdate: (tiers: Tier[]) => void;
    onPreview: () => void;
    translate: (key: string) => string;
    components: RuleComponents;
};
interface OR extends AssociateRoleAssignment {
    id: number;
}
interface Tier extends ApproverConjunction {
    id: number;
    and: {
        id: number;
        or: OR[];
    }[];
}
declare const Approvers: React.FC<Props>;
export default Approvers;
//# sourceMappingURL=approvers.d.ts.map