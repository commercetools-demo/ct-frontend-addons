import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useSuperuserContext } from '../../provider';
import { CurrencyHelpers } from '../../../../shared/utils/currency-helpers';
import { Associate } from '../../../../shared/businessUnit';

type Props = {
  setCart: (cartId: string, email?: string) => void;
  createSuperuserCart: () => void;
  cartId: string;
  className?: string;
  associates?: Associate[];
  translate: (translationKey: string) => string;
};

const CartBrowser: React.FC<Props> = ({ setCart, createSuperuserCart, cartId, className, associates, translate }) => {
  const { superuserStatus } = useSuperuserContext();

  const handleCartSelection = async (e: React.MouseEvent<HTMLButtonElement>, cartId: string) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const cart = superuserStatus?.carts?.find((c) => c.id === cartId);
    const associate = associates?.find((a) => a.accountId === cart?.customerId);
    await setCart(cartId, associate?.email);
  };

  const handleCreateNewCart = async () => {
    await createSuperuserCart();
  };

  if (!superuserStatus?.isSuperuser) {
    return null;
  }

  return (
    <Popover className={`relative ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                      ${open ? '' : 'text-opacity-90'}
                      text-accent-400 flex flex-row text-sm font-medium focus:outline-none`}
          >
            {!open && <ChevronDownIcon className="mt-1 h-4 w-4" />}
            {open && <ChevronUpIcon className="mt-1 h-4 w-4" />}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`dark:bg-primary-400 dark:shadow-3xl absolute right-0 top-6 z-50 mr-8 mt-2 max-h-[300px] w-72 origin-top-right overflow-scroll rounded-sm bg-white p-2 shadow-sm ring-1 ring-black/5 focus:outline-none`}
            >
              {superuserStatus?.carts?.map((cart) => (
                <button
                  type="button"
                  className={`inline w-full p-2 text-left text-xs hover:bg-neutral-300 ${
                    cart.id === cartId ? 'bg-neutral-300' : ''
                  }`}
                  disabled={cart.id === cartId}
                  key={cart.id}
                  onClick={(e) => handleCartSelection(e, cart.id)}
                >
                  {`${translate('common.cart')} ${
                    cart.origin === 'Quote' ? ` - ${translate('cart.createdFromAQuote')} ` : ''
                  } ${cart.origin === 'Merchant' ? ` - ${translate('cart.createdByAMerchant')} ` : ''}`}
                  {`${translate('cart.with')} ${CurrencyHelpers.formatForCurrency(cart.totalPrice) || 0} ${translate(
                    'cart.total.price',
                  )}`}
                  {cart.createdBy?.associate?.obj?.firstName && cart.createdBy?.associate?.obj?.lastName && (
                    <>
                      <span className="font-semibold">{` ${translate('cart.name')}: `}</span>
                      {`${cart.createdBy?.associate?.obj?.firstName} ${cart.createdBy?.associate?.obj?.lastName}`}
                    </>
                  )}
                  {cart.createdBy?.associate?.obj?.email && (
                    <>
                      <span className="font-semibold">{` ${translate('cart.email')}: `}</span>
                      {cart.createdBy?.associate?.obj?.email}
                    </>
                  )}
                  {cart.id === cartId && <CheckIcon className="ml-2 inline h-4 w-4" />}
                </button>
              ))}
              <button
                type="button"
                className={`inline w-full p-2 text-left text-xs hover:bg-neutral-300`}
                onClick={handleCreateNewCart}
              >
                {translate('cart.createNewCart')}
              </button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default CartBrowser;
