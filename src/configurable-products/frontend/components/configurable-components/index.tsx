import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useParams } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useConfigurableComponentsContext } from '../../providers/configurable-components';
import ConfigurableComponent from './configurable-component';
import { useConfigurableProductAttribute } from '../../hooks/useConfigurableProductAttribute';
import { Money, Product, Variant } from '../../../../types/b2c/product';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';

interface ConfigurableComponentState extends Product {
  selectedVariant?: Variant;
  tempVariant?: Variant;
}
type Props = {
  product: any;
  className?: string;
  children: ({ isDisabled }: { isDisabled: boolean }) => React.ReactNode;
  Button: React.FC<any>;
  Select: React.FC<any>;
  translatedTexts?: {
    summary?: string;
    next?: string;
    total?: string;
    back?: string;
  };
};

const ConfigurableComponents: React.FC<Props> = ({ product, className, children, Button, Select, translatedTexts }) => {
  const [selectedComponentIdx, setSelectedComponentIdx] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [components, setComponents] = useState<ConfigurableComponentState[]>([]);
  const [updateCentAmount, setUpdateCentAmount] = useState<Money>();
  const [currentCentAmount, setCurrentCentAmount] = useState<Money>();

  const { configurableComponents, setSelectedVariants, productAttributes } = useConfigurableComponentsContext();
  const { findAttributeLabel } = useConfigurableProductAttribute({ productAttributes });

  const { locale } = useParams();

  const handleChangeVariantIdx = (variantIdx: number, componentIdx: number) => {
    setComponents((prevComponents) =>
      prevComponents.map((component, i) => {
        if (i !== componentIdx) {
          return component;
        }
        return {
          ...component,
          tempVariant: component.variants?.[variantIdx],
        };
      }),
    );
  };

  const handleAdvanceNextStep = (i: number) => {
    setSelectedComponentIdx(i + 1);
    setComponents(
      components.map((component, idx) => {
        if (i !== idx) {
          return component;
        }
        return {
          ...component,
          selectedVariant: { ...component.tempVariant! },
        };
      }),
    );
  };

  const jumpToStep = (i: number) => {
    setComponents(
      components.map((component, idx) => {
        if (selectedComponentIdx !== idx) {
          return component;
        }
        return {
          ...component,
          tempVariant: undefined,
        };
      }),
    );
    setSelectedComponentIdx(i);
  };

  useEffect(() => {
    if (components.length) {
      const updated = components.reduce(
        (prev: Money, item) => {
          return CurrencyHelpers.addCurrency(prev, item.tempVariant?.price);
        },
        { centAmount: 0, currencyCode: product.currency },
      );
      const current = components.reduce(
        (prev: Money, item) => CurrencyHelpers.addCurrency(prev, item.selectedVariant?.price),
        { centAmount: 0, currencyCode: product.currency },
      );

      setIsDisabled(components.some((component) => !component.selectedVariant));

      setUpdateCentAmount(
        CurrencyHelpers.subtractCurrency(
          updated,
          currentCentAmount || { centAmount: 0, currencyCode: product.currency },
        ),
      );
      setCurrentCentAmount(current);
      setSelectedVariants(components.map((component) => component.selectedVariant!));
    }
  }, [components]);

  useEffect(() => {
    if (configurableComponents?.length) {
      setComponents(configurableComponents);
    }
  }, [configurableComponents]);

  if (!configurableComponents?.length) {
    return children({ isDisabled: false });
  }
  return (
    <>
      <style>
        {`
        .tab-panels--selected {
          margin-top: -1px;
        }
        .tab-button--selected {
          margin-bottom: -1px;
        }
      `}
      </style>
      <div className={className}>
        {components.map((component, i) => (
          <>
            <input
              type="radio"
              name="tabset"
              className="hidden"
              id={`tab${i}`}
              checked={i === selectedComponentIdx}
              onChange={() => selectedComponentIdx > i && jumpToStep(i)}
            />
            <label
              className={`relative inline-block cursor-pointer whitespace-nowrap border-neutral-300 bg-white px-4 py-4 text-12 ${
                selectedComponentIdx === i && 'z-10 border-t border-x font-bold'
              } ${components.length !== selectedComponentIdx && 'tab-button--selected'}`}
              htmlFor={`tab${i}`}
            >
              <span className="flex items-center gap-2">
                {component.name} {selectedComponentIdx > i && <CheckIcon className="h-4 w-4 text-primary" />}
              </span>
            </label>
          </>
        ))}

        <div className={`tab-panels relative ${components.length !== selectedComponentIdx && 'tab-panels--selected'}`}>
          {components.map((component, i) => (
            <article
              className={`border border-neutral-300 ${i === selectedComponentIdx ? 'block' : 'hidden'}`}
              key={component.productId}
            >
              <ConfigurableComponent
                className="p-4"
                product={component}
                onChangeVariantIdx={(idx) => handleChangeVariantIdx(idx, i)}
                variant={component.tempVariant!}
                Select={Select}
              />
              <div className="flex justify-center p-4">
                <Button variant="primary" size="full" onClick={() => handleAdvanceNextStep(i)} type="button">
                  {`${translatedTexts?.next} ${
                    updateCentAmount?.centAmount && updateCentAmount?.centAmount >= 0 ? '+' : ''
                  }${CurrencyHelpers.formatForCurrency(updateCentAmount || 0, locale)}`}
                </Button>
              </div>
            </article>
          ))}
          {components.length === selectedComponentIdx && (
            <article className="border-accent-400 max-h-[350px] border p-4">
              <span className="text-14 font-semibold">{translatedTexts?.summary}</span>
              <ul>
                {components.map((component) => (
                  <li key={component.productId}>
                    <span className="text-14 font-bold">{component.name}: </span>
                    <span className="text-12">{findAttributeLabel(component?.selectedVariant?.attributes)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <span className="text-14">{translatedTexts?.total}</span>
                <p className="text-16">
                  {`${CurrencyHelpers.formatForCurrency(
                    product?.price * 100,
                    locale,
                    product?.currency,
                  )} + ${CurrencyHelpers.formatForCurrency(currentCentAmount || 0)}`}
                </p>
              </div>
              <button className="text-accent-400 mt-8 underline" onClick={() => jumpToStep(0)} type="button">
                {translatedTexts?.back}
              </button>
            </article>
          )}

          {components.length !== selectedComponentIdx && (
            <div className="mt-4">
              <span className="text-14">{translatedTexts?.total}</span>
              <p className="text-16">
                {`${CurrencyHelpers.formatForCurrency(
                  product?.price * 100,
                  locale,
                  product?.currency,
                )} + ${CurrencyHelpers.formatForCurrency(currentCentAmount || 0, locale)}`}
              </p>
            </div>
          )}
        </div>
      </div>
      {children({ isDisabled })}
    </>
  );
};

export default ConfigurableComponents;
