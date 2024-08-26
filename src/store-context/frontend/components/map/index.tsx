import React from 'react';
import MapWithStoreLocator, { MapProps } from './map-with-store-locator';

const Map: React.FC<MapProps> = (props) => {
  return <MapWithStoreLocator {...props} />;
};

export default Map;
