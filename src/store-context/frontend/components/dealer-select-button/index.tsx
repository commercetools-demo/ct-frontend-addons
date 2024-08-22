import React from 'react';
import { useStoreContext } from '../../providers/store-context';
import { MapPinIcon as OutlineMapPinIcon } from '@heroicons/react/24/outline';
import { MapPinIcon as SolidMapPinIcon } from '@heroicons/react/24/solid';

const DealerSelectButton = () => {
  const { show, storeContext } = useStoreContext();

  if (!storeContext) {
    <button onClick={() => show()} className="flex h-40 flex-col items-start p-0">
      <OutlineMapPinIcon className="h-28 w-28 text-secondary-black" />
    </button>;
  }

  return (
    <button onClick={() => show()} className="flex h-40 flex-col items-start p-0">
      <SolidMapPinIcon className="h-28 w-28 text-secondary-black" />
    </button>
  );
};

export default DealerSelectButton;
