import React, { useMemo } from 'react';
// @ts-ignore
import { useParams } from 'next/navigation';
import { Money, Product } from '../../../../types/b2c/product';
import { childComponentsAttributeName } from '../../hooks/useChildComponents';
import { useBundledItemsContext } from '../../providers/bundled-items';
import { useConfigurableProductAttribute } from '../../hooks/useConfigurableProductAttribute';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
import { LineItem } from '../../../../types/b2c/cart';

type Props = {
  item: Product & { id: string };
};

const BundledItems: React.FC<Props> = ({ item }) => {
  const { cart, productAttributes } = useBundledItemsContext();
  const { findAttributeLabel } = useConfigurableProductAttribute({ productAttributes });
  const { locale } = useParams();

  const lineItem = useMemo(() => cart?.lineItems?.find((li: LineItem) => li.lineItemId === item.id), [cart, item]);

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
