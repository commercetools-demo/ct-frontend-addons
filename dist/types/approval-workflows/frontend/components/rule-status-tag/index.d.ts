import React from 'react';
import { RuleComponents } from '../approval-rules/approval-rules-panel';
interface Props {
    status: string;
    translate?: (key: string) => string;
    components: Partial<RuleComponents>;
}
declare const RuleStatusTag: ({ status, translate, components }: Props) => React.JSX.Element;
export default RuleStatusTag;
//# sourceMappingURL=index.d.ts.map