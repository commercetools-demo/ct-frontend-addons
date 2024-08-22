import React from 'react';
// @ts-ignore
import {  ControlPosition, Map} from '@vis.gl/react-google-maps';
import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';
import { MarkerWithInfowindow } from './marker-with-infowindow';

export type AutocompleteMode = { id: string; label: string };


export interface MapProps {
  defaultLocation?: { lat: number; lng: number };
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  onStoreSelect: (storeId: string) => void;
  selectedPlace: google.maps.places.PlaceResult | null;
  marks?: { lat?: number; lng?: number; label?: string; id: string }[];
  translatedMessages: { enterYourLocation: string };
}

const MapWithStoreLocator: React.FC<MapProps> = ({
  defaultLocation = { lat: 25.631662, lng: -103.564185 },
  onPlaceSelect,
  onStoreSelect,
  selectedPlace,
  marks,
  translatedMessages,
}) => {

  return (
    <>
      <Map
        defaultZoom={5}
        defaultCenter={defaultLocation}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'mapbox.light'}
      >
        {marks?.map((mark) => (
          <MarkerWithInfowindow
            key={mark.id}
            position={{ lat: mark.lat ?? 0, lng: mark.lng ?? 0 }}
            label={mark.label ?? ''}
            onClick={() => onStoreSelect(mark.id)}
          />
        ))}
      </Map>

      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        translatedMessages={translatedMessages}
        onPlaceSelect={onPlaceSelect}
      />

      <MapHandler place={selectedPlace} />
    </>
  );
};

export default MapWithStoreLocator;
