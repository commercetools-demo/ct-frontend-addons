import React from 'react';
type Props = {
    product: any;
    className?: string;
    children: ({ isDisabled }: {
        isDisabled: boolean;
    }) => React.ReactNode;
    Button: React.FC<any>;
    Select: React.FC<any>;
    translatedTexts?: {
        summary?: string;
        next?: string;
        total?: string;
        back?: string;
    };
};
declare const ConfigurableComponents: React.FC<Props>;
export default ConfigurableComponents;
//# sourceMappingURL=index.d.ts.map