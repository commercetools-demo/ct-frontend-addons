import { Configuration } from '../../types';
import { ExternalError } from '../../../utils/Errors';
import { Store } from '../../types/Store';
import { StoreMapper } from '../mappers/StoreMapper';

export const injectStoreApi = (BaseApi: any, config?: Configuration): typeof BaseApi => {
  return class StoreApi extends BaseApi {
    private distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d;
    };

    private deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }
    protected async get(key: string): Promise<Store> {
      const locale = await this.getCommercetoolsLocal();

      return this.requestBuilder()
        .stores()
        .withKey({ key })
        .get()
        .execute()
        .then((response) => {
          return StoreMapper.mapCommercetoolsStoreToStore(response.body, locale.language);
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    protected async query(where: string, expand?: string | string[]): Promise<Store[]> {
      const locale = await this.getCommercetoolsLocal();

      return this.requestBuilder()
        .stores()
        .get({
          queryArgs: {
            where,
            expand,
          },
        })
        .execute()
        .then((response) => {
          return response.body.results.map((store) => StoreMapper.mapCommercetoolsStoreToStore(store, locale.language));
        })
        .catch((error) => {
          throw new ExternalError({ status: error.code, message: error.message, body: error.body });
        });
    }

    protected async queryByLocation(location: { lat: number; lng: number }, distance?: number): Promise<Store[]> {
      const locale = await this.getCommercetoolsLocal();

      try {
        const where = `geoLocation within circle(${location.lng}, ${location.lat}, ${distance})`;

        const channels = await this.requestBuilder()
          .channels()
          .get({
            queryArgs: {
              where,
            },
          })
          .execute()
          .then((response) => {
            return response.body.results;
          })
          .catch((error) => {
            throw new ExternalError({ status: error.code, message: error.message, body: error.body });
          });

        if (!channels.length) {
          return [];
        }

        const storesWhere = `distributionChannels(id in (${channels.map((channel) => `"${channel.id}"`).join(',')}))`;

        const stores = await this.requestBuilder()
          .stores()
          .get({
            queryArgs: {
              where: storesWhere,
            },
          })
          .execute()
          .then((response) => {
            return response.body.results.map((store) =>
              StoreMapper.mapCommercetoolsStoreToStore(store, locale.language),
            );
          })
          .catch((error) => {
            throw new ExternalError({ status: error.code, message: error.message, body: error.body });
          });
        const storesWithGeoLocation = stores.map((store) => {
          const channel = channels.find((channel) => channel.id === store.distributionChannels?.[0]?.channelId);
          if (channel) {
            store.geoLocation = {
              lng: channel.geoLocation?.coordinates?.[0],
              lat: channel.geoLocation?.coordinates?.[1],
            };
          }
          return store;
        });

        return storesWithGeoLocation.sort((a, b) => {
          const distanceA = this.distance(location.lat, location.lng, a.geoLocation?.lat || 0, a.geoLocation?.lng || 0);
          const distanceB = this.distance(location.lat, location.lng, b.geoLocation?.lat || 0, b.geoLocation?.lng || 0);
          return distanceA - distanceB;
        });
      } catch (error) {
        console.error('error', error);

        return [];
      }
    }
  };
};
