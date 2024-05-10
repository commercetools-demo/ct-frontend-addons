import React from 'react';
import { ContextProps, ContextShape } from './types';
export declare const ConfigurableComponentsContext: React.Context<ContextShape>;
declare const ConfigurableComponentsProvider: ({ children, configurableComponents, productAttributes, }: React.PropsWithChildren<ContextProps>) => React.JSX.Element;
export default ConfigurableComponentsProvider;
export declare const useConfigurableComponentsContext: () => ContextShape;
//# sourceMappingURL=index.d.ts.map