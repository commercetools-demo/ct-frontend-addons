import React, { HTMLAttributes } from 'react';
import { Product, Variant } from '@commercetools/frontend-domain-types/product';
type Props = {
    product: Product;
    onChangeVariantIdx: (idx: number) => void;
    variant: Variant;
    Select: React.FC<any>;
};
declare const ConfigurableComponent: React.FC<Props & HTMLAttributes<HTMLDivElement>>;
export default ConfigurableComponent;
//# sourceMappingURL=configurable-component.d.ts.map