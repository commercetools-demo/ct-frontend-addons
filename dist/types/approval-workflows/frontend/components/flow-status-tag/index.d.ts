import React from 'react';
import { FlowComponents } from '../approval-flows/approval-flow-panel';
interface Props {
    status: string;
    translate?: (key: string) => string;
    components: Partial<FlowComponents>;
}
declare const FlowStatusTag: ({ status, translate, components }: Props) => React.JSX.Element;
export default FlowStatusTag;
//# sourceMappingURL=index.d.ts.map