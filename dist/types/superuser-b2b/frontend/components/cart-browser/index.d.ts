import React from 'react';
import { Associate } from '../../../../shared/businessUnit';
type Props = {
    setCart: (cartId: string, email?: string) => void;
    createSuperuserCart: () => void;
    cartId: string;
    className?: string;
    associates?: Associate[];
    translate: (translationKey: string) => string;
};
declare const CartBrowser: React.FC<Props>;
export default CartBrowser;
//# sourceMappingURL=index.d.ts.map