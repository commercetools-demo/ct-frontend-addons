import React from 'react';
import { ApprovalFlow } from '../../../types/approval/Flow';
import { Cart } from '@commercetools/frontend-domain-types/cart';
import { Transaction } from '../../../../shared/types';
declare const FlowDetailsModal: ({ sdk, activeBusinessUnit, storeKey, flow, translate, calculateTransaction, components, accountId, permissions, }: {
    sdk: any;
    activeBusinessUnit?: any;
    storeKey?: string | undefined;
    translate: (translationKey: string) => string;
    calculateTransaction: (cart: Partial<Cart>) => Transaction;
    flow: ApprovalFlow;
    components: {
        Button: any;
        InfoBanner: any;
        PreviousPageLink: any;
        Input: any;
        Tag: any;
    };
    accountId?: string | undefined;
    permissions?: Record<string, boolean> | undefined;
}) => React.JSX.Element | null;
export default FlowDetailsModal;
//# sourceMappingURL=index.d.ts.map