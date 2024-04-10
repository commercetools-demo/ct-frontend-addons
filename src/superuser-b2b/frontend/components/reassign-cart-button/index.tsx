import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useSuperuserContext } from '../../provider';
import { Associate, BusinessUnit } from '../../../../shared/businessUnit';

type Props = {
  activeBusinessUnit?: BusinessUnit;
  translate: (translationKey: string) => string;
  reassignCart: (accountId?: string, email?: string) => void;
  Dropdown: React.FC<any> & { Button: React.FC<any>; Options: React.FC<any>; Option: React.FC<any> };
  className?: string;
  accountId?: string;
  cartAccountId?: string;
};

const ReassignCartButton: React.FC<Props> = ({
  activeBusinessUnit,
  className,
  accountId,
  cartAccountId,
  Dropdown,
  translate,
  reassignCart,
}) => {
  const { superuserStatus } = useSuperuserContext();

  if (!superuserStatus?.isSuperuser || activeBusinessUnit?.associates?.length === 0) {
    return null;
  }

  return (
    <Dropdown onChange={(associate: Associate) => reassignCart(associate?.accountId, associate?.email)} className={className}>
      <Dropdown.Button>{translate('cart.superuser.reassign.cart')}</Dropdown.Button>

      <Dropdown.Options>
        {activeBusinessUnit?.associates
          ?.filter((associate) => associate.accountId !== accountId)
          .map((associate) => (
            <Dropdown.Option key={associate.accountId} value={associate}>
              {`${associate.firstName || ''} ${associate.lastName || ''} ${
                associate.roles?.length && ` (${associate.roles.map((role) => role.key).join(', ')})`
              }`}
              {cartAccountId === associate.accountId && <CheckIcon className="ml-2 inline h-4 w-4" />}
            </Dropdown.Option>
          ))}
      </Dropdown.Options>
    </Dropdown>
  );
};

export default ReassignCartButton;
