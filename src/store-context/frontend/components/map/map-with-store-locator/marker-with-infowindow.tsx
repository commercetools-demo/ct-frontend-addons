import React, { useState } from 'react';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import Typography from 'components/commercetools-ui/atoms/typography';

export const MarkerWithInfowindow = ({
  position,
  label,
  onClick,
}: {
  onClick: () => void;
  position: google.maps.LatLngLiteral;
  label: string;
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => {
          setInfowindowOpen(true);
          onClick();
        }}
        position={position}
        title={label}
      />
      {infowindowOpen && (
        <InfoWindow anchor={marker} maxWidth={200} onCloseClick={() => setInfowindowOpen(false)}>
          <Typography>{`Store: ${label}`}</Typography>
        </InfoWindow>
      )}
    </>
  );
};
