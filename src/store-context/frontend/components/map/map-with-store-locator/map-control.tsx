import React from 'react';
// @ts-ignore
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import { MapControlClassic } from './map-control-classic';

type CustomAutocompleteControlProps = {
  translatedMessages: { enterYourLocation: string };
  controlPosition: ControlPosition;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({
  controlPosition,
  onPlaceSelect,
  translatedMessages,
}: CustomAutocompleteControlProps) => {

  return (
    <MapControl position={controlPosition}>
      <div className="control">
        <MapControlClassic onPlaceSelect={onPlaceSelect} translatedMessages={translatedMessages}/>
      </div>
    </MapControl>
  );
};
