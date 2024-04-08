/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useConfigurableProductAttribute } from '../../hooks/useConfigurableProductAttribute';
import { useConfigurableComponentsContext } from '../../providers/configurable-components';
import { Product, Variant } from '@commercetools/frontend-domain-types/product';

type Props = {
  product: Product;
  onChangeVariantIdx: (idx: number) => void;
  variant: Variant;
  Select: React.FC<any>;
};

const ConfigurableComponent: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  product,
  variant,
  onChangeVariantIdx,
  className,
  Select
}) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const { productAttributes } = useConfigurableComponentsContext();
  const { findAttributeLabel } = useConfigurableProductAttribute({ productAttributes });
  const getAttributeValueForSku = (sku?: string) => {
    return findAttributeLabel(product?.variants.find((variant) => variant.sku === sku)?.attributes);
  };
  const handleChangeVariant = (sku: string) => {
    const variantInx = product?.variants.findIndex((variant) => variant.sku === sku);
    onChangeVariantIdx(variantInx);
    setSelectedVariant(product?.variants[variantInx]);
  };

  useEffect(() => {
    if (variant) {
      setSelectedVariant(variant);
    }
  }, [variant]);

  return (
    <div>
      <p className="p-4 text-14 font-semibold leading-loose">{product.name}</p>
      <Select
        onChange={(sku: string) => handleChangeVariant(sku)}
        className={className}
        defaultValue={selectedVariant?.sku}
        options={product?.variants.map((variant: Variant) => ({
          value: variant.sku,
          name: getAttributeValueForSku(variant.sku),
        }))}
      />
    </div>
  );
};

export default ConfigurableComponent;
