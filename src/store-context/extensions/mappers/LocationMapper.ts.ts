export class LocationMapper {
  static mapLocationToGeometry(location: { geometry: { location: { lat: number; lng: number } } }): {
    lat: number;
    lng: number;
  } {
    return {
      lat: location?.geometry?.location?.lat,
      lng: location?.geometry?.location?.lng,
    };
  }
}
