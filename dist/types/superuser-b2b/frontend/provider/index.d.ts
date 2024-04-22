import React from 'react';
import { SuperuserContextShape } from './types';
declare const SuperuserProvider: ({ children, sdk }: {
    children?: React.ReactNode;
} & {
    sdk: any;
}) => React.JSX.Element;
export default SuperuserProvider;
export declare const useSuperuserContext: () => SuperuserContextShape;
//# sourceMappingURL=index.d.ts.map