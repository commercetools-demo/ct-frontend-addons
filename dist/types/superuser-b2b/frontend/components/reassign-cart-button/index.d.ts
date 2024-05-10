import React from 'react';
import { BusinessUnit } from '../../../../shared/businessUnit';
type Props = {
    activeBusinessUnit?: BusinessUnit;
    translate: (translationKey: string) => string;
    reassignCart: (accountId?: string, email?: string) => void;
    Dropdown: React.FC<any> & {
        Button: React.FC<any>;
        Options: React.FC<any>;
        Option: React.FC<any>;
    };
    className?: string;
    accountId?: string;
    cartAccountId?: string;
};
declare const ReassignCartButton: React.FC<Props>;
export default ReassignCartButton;
//# sourceMappingURL=index.d.ts.map