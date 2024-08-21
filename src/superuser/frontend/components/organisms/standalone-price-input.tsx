import React, { useCallback, useMemo, useState } from 'react';
// @ts-ignore
import { useParams } from 'next/navigation';
import debounce from 'lodash.debounce';
import { LineItem, Money } from '../../types';
import { useStandalonePrice } from '../../hooks/standalone-price';
import { formatMoneyCurrency, formatNumberForCurrency } from '../../utils/currency-helpers';

const StandalonePriceInput = ({
  item,
  price,
  sdk,
  buttonText,
  wrapperClassName,
  priceClassName,
  buttonClassName,
  buttonWrapperClassName,
}: {
  item: LineItem;
  price?: Money;
  sdk: any;
  buttonText?: string;
  wrapperClassName?: string;
  priceClassName?: string;
  buttonClassName?: string;
  buttonWrapperClassName?: string;
}) => {
  const { changePrice } = useStandalonePrice({ sdk });
  const { locale } = useParams();
  const [priceValue, setPriceValue] = useState((price?.centAmount || 0) / 100);
  const [formattedPrice, setFormattedPrice] = useState(formatMoneyCurrency(price, locale));
  const [isLoading, setIsLoading] = useState(false);

  const currencyCode = useMemo(() => {
    return price?.currencyCode;
  }, [price]);
  const fractionDigits = useMemo(() => {
    return price?.fractionDigits;
  }, [price]);

  const isChanged = useMemo(() => {
    return priceValue !== (price?.centAmount || 0) / 100;
  }, [priceValue, price]);

  const handleChangePrice = useCallback(async () => {
    setIsLoading(true);
    if (item.lineItemId) {
      await changePrice(item.lineItemId, {
        centAmount: priceValue * 100,
        currencyCode: price?.currencyCode,
      });
    }
    setIsLoading(false);
  }, [priceValue, item]);

  const debounceFormatAndSet = useCallback(
    debounce((value: string) => {
      const numericValue = parseFloat(value.replace(/[^0-9\.]/g, ''));
      if (isNaN(numericValue)) return;

      setPriceValue(numericValue);
      const formatted = formatNumberForCurrency(numericValue * 100, locale, currencyCode, fractionDigits);
      setFormattedPrice(formatted);
    }, 1000),
    [currencyCode, fractionDigits, locale],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormattedPrice(value);

      debounceFormatAndSet(value);
    },
    [debounceFormatAndSet],
  );
  return (
    <div className={wrapperClassName}>
      <input
        value={formattedPrice}
        className={priceClassName}
        type="text"
        onChange={onChange}
        disabled={isLoading}
        onBlur={() =>
          setFormattedPrice(formatNumberForCurrency(priceValue * 100, locale, currencyCode, fractionDigits))
        }
      />
      <div className={buttonWrapperClassName}>
        <button
          disabled={!isChanged || isLoading}
          onClick={handleChangePrice}
          type="button"
          className={buttonClassName}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default StandalonePriceInput;
