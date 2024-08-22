import { Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon as CloseIcon } from '@heroicons/react/24/solid';
// @ts-ignore
import { APIProvider } from '@vis.gl/react-google-maps';
// @ts-ignore
import { useRouter } from 'next/navigation';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Store } from '../../../types/Store';
import Map from '../../components/map';
import { useStore } from '../../hooks/use-store-context';
import useLocation from '../../hooks/use-location';
import { StoreContext } from '../../../types/StoreContext';

interface StoreContextContextShape {
  show: () => void;
  hide: () => void;
  storeContext?: StoreContext | undefined;
}

const StoreContextContext = React.createContext<StoreContextContextShape>({
  show() {},
  hide() {},
});

interface ProviderProps {
  sdk: any;
  defaultLocation?: { lat: number; lng: number };
  components: {
    Button: React.FC<any>;
    Overlay: React.FC<any>;
    Typography: React.FC<any>;
  };
  translatedMessages: {
    currentlySelectedDealer: string;
    selectDealer: string;
    enterYourLocation: string;
  };
}

const StoreContextProvider = ({
  children,
  sdk,
  translatedMessages,
  defaultLocation,
  components: { Button, Overlay, Typography },
}: React.PropsWithChildren<ProviderProps>) => {
  const [selectedLocation, setSelectedLocation] = useState<google.maps.places.PlaceResult | null>(null);
  const [selectedStores, setSelectedStores] = useState<Store[]>([]);
  const [highlightedStore, setHighlightedStore] = useState<Store>();
  const { storeContext, assignToStore } = useStore(sdk);
  const { getStores, locationApiKey } = useLocation(sdk);

  const { refresh } = useRouter();

  const [overlayShown, setOverlayShown] = useState(false);

  const show = useCallback(() => {
    setOverlayShown(true);
  }, []);

  const hide = useCallback(() => {
    setOverlayShown(false);
  }, []);

  const handleHighlistStore = (storeId?: string) => {
    setHighlightedStore(selectedStores.find((store) => store.storeId === storeId));
  };

  const handleSelectStore = async (storeId?: string) => {
    if (storeId) {
      await assignToStore(storeId);
      refresh();
    }
  };

  const marks = useMemo(() => {
    return selectedStores.map((store) => {
      return {
        lat: store.geoLocation?.lat,
        lng: store.geoLocation?.lng,
        label: store.name,
        id: store.storeId!,
      };
    });
  }, [selectedStores]);

  useEffect(() => {
    getStores(selectedLocation?.geometry?.location?.lat() ?? 0, selectedLocation?.geometry?.location?.lng() ?? 0).then(
      (stores) => {
        setSelectedStores(stores);
      },
    );
  }, [selectedLocation]);

  if (!locationApiKey) return null;

  return (
    <APIProvider apiKey={locationApiKey}>
      {overlayShown && <Overlay onClick={hide} />}
      <Transition
        show={!!overlayShown}
        className="fixed bottom-0 z-[310] w-full overflow-hidden rounded-[20px_20px_0_0] bg-white shadow md:bottom-[unset] md:left-1/2 md:top-1/2 md:w-[90%] md:max-w-[1200px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg"
        enter="transition md:transition-opacity duration-75"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition md:transition-opacity duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <div onMouseUp={(e) => e.stopPropagation()}>
          <div className="bg-white p-16 md:px-48 md:py-24">
            <h4 className="text-18 leading-[27px] lg:text-22 lg:leading-[33px]"></h4>

            <CloseIcon
              className="absolute right-[18px] top-[16px] h-28 w-28 cursor-pointer fill-secondary-black stroke-0 md:top-[16px]"
              onClick={hide}
            />

            <div className="mt-22 grid grid-cols-2 gap-x-18 md:mt-35 lg:mt-30 h-[447px]">
              <div className="col-span-1">
                {!selectedLocation && storeContext?.storeId && (
                  <li className={`flex justify-between px-4 py-8 hover:bg-neutral-300 `}>
                    <Typography className="my-auto">{storeContext.storeName}</Typography>
                    <Button variant="primary" size="s" icon={<CheckIcon className="w-16" />} disabled>
                      {translatedMessages.currentlySelectedDealer}
                    </Button>
                  </li>
                )}
                <ul>
                  {selectedLocation &&
                    selectedStores.map((store) => (
                      <li
                        key={store.storeId}
                        className={`flex justify-between px-4 py-8 hover:bg-neutral-300 ${
                          store.storeId === highlightedStore?.storeId && 'animate-pulse bg-neutral-300'
                        }`}
                      >
                        <Typography className="my-auto">{store.name}</Typography>
                        <Button
                          variant="primary"
                          size="s"
                          onClick={() => handleSelectStore(store.storeId)}
                          disabled={storeContext?.storeId === store.storeId}
                          icon={storeContext?.storeId === store.storeId ? <CheckIcon className="w-16" /> : undefined}
                        >
                          {storeContext?.storeId === store.storeId
                            ? translatedMessages.currentlySelectedDealer
                            : translatedMessages.selectDealer}
                        </Button>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="col-span-1 h-344">
                <Map
                  translatedMessages={translatedMessages}
                  onPlaceSelect={setSelectedLocation}
                  selectedPlace={selectedLocation}
                  marks={marks}
                  onStoreSelect={handleHighlistStore}
                  defaultLocation={defaultLocation}
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <StoreContextContext.Provider value={{ show, hide, storeContext }}>{children}</StoreContextContext.Provider>
    </APIProvider>
  );
};

export default StoreContextProvider;

export const useStoreContext = () => useContext(StoreContextContext);
