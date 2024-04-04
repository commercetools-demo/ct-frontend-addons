import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Money, Product } from '@commercetools/frontend-domain-types/product';
import { childComponentsAttributeName } from '../../hooks/useChildComponents';
import { useBundledItemsContext } from '../../providers/bundled-items';
import { useConfigurableProductAttribute } from '../../hooks/useConfigurableProductAttribute';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
import { LineItem as DomainLineItem } from '@commercetools/frontend-domain-types/cart/LineItem';

interface LineItem extends DomainLineItem {
  parentId?: string;
  price?: Money;
  discountedPrice?: Money;
  sku: string;
}

type Props = {
  item: Product & { id: string };
};

const BundledItems: React.FC<Props> = ({ item }) => {
  const { cart, productAttributes } = useBundledItemsContext();
  const { findAttributeLabel } = useConfigurableProductAttribute({ productAttributes });
  const { locale } = useParams();

  const lineItem = useMemo(() => cart?.lineItems?.find((li) => li.lineItemId === item.id), [cart, item]);

  if (!lineItem) return null;
  return (
    <div>
      {!!lineItem.variant?.attributes?.[childComponentsAttributeName]?.length &&
        lineItem.variant?.attributes?.[childComponentsAttributeName].map((bundle: LineItem) => (
          <div className="flex items-center" key={bundle.lineItemId}>
            <p className="text-12 font-semibold leading-loose text-gray-600">
              {`${bundle.name}:`}
              <span className="ml-2 text-10 font-normal">{`${findAttributeLabel(bundle.variant?.attributes)}`}</span>
            </p>
            <p className="ml-2 text-10 font-normal leading-loose text-gray-600">
              {!!bundle.price?.centAmount ? ` ${CurrencyHelpers.formatForCurrency(bundle.price, locale)}` : ''}
            </p>
          </div>
        ))}
    </div>
  );
};

export default BundledItems;
