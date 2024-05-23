import React from 'react';
import { ContextProps, ContextShape } from './types';
export declare const BundledItemsContext: React.Context<ContextShape>;
declare const BundledItemsProvider: ({ cart, productAttributes, children }: React.PropsWithChildren<ContextProps>) => React.JSX.Element;
export default BundledItemsProvider;
export declare const useBundledItemsContext: () => ContextShape;
//# sourceMappingURL=index.d.ts.map