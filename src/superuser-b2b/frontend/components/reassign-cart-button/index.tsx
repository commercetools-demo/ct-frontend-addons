import React from 'react';
import { BusinessUnit } from '../../../../types/b2b/business-unit';
import { useSuperuserContext } from '../../provider';

type Props = {
  activeBusinessUnit?: any;
  translate: (translationKey: string) => string;
  reassignCart: (accountId?: string, email?: string) => void;
  Select: React.FC<any>;
  className?: string;
  accountId?: string;
  cartAccountId?: string;
};

const ReassignCartButton: React.FC<Props> = ({
  activeBusinessUnit,
  className,
  accountId,
  cartAccountId,
  Select,
  translate,
  reassignCart,
}) => {
  const { superuserStatus } = useSuperuserContext();

  if (!superuserStatus?.isSuperuser || activeBusinessUnit?.associates?.length === 0) {
    return null;
  }

  const handleChange = (value: string) => {
    const associate = activeBusinessUnit?.associates?.find((associate: any) => associate.id === value);
    reassignCart(associate?.accountId, associate?.email);
  };

  return (
    <Select
      className={className}
      value={cartAccountId}
      placeholder={translate('cart.superuser-reassign-cart')}
      options={activeBusinessUnit?.associates
        ?.filter((associate: any) => associate.id !== accountId)
        .map((associate: any) => ({
          name: `${associate.firstName || ''} ${associate.lastName || ''} ${
            associate.roles?.length && ` (${associate.roles.join(', ')})`
          }`,
          value: associate.id,
        }))}
      onChange={(value: string) => handleChange(value)}
    />
  );
};

export default ReassignCartButton;
