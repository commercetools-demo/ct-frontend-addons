import { ActionContext, ActionHandler, Request, Response } from '@frontastic/extension-types';
import { extractDependency } from '../utils';
import { Configuration } from '../../types';
import { getCurrency, getLocale } from '../../../utils/request';
import { LocationMapper } from '../mappers/LocationMapper.ts';

const DEFAULT_DISTANCE = 10000;

export const getlocation = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const address = encodeURIComponent(request.query.address);
    const APIKEY = actionContext.frontasticContext.projectConfiguration['EXTENSION_GOOGLE_MAPS_API_KEY'];

    try {
      const location = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${APIKEY}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data?.data?.results.map((result) => LocationMapper.mapLocationToGeometry(result));
        });

      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(location),
      };

      return response;
    } catch (error) {
      const response: Response = {
        statusCode: 400,
        body: JSON.stringify([]),
      };

      return response;
    }
  };
};
export const getStores = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const body: { lat: number; lng: number } = JSON.parse(request.body);

    const StoreApi = extractDependency('StoreApi', config);

    const storeApi = new StoreApi(actionContext.frontasticContext, getLocale(request), getCurrency(request), request);

    const stores = await storeApi.queryByLocation({ lat: body.lat, lng: body.lng }, DEFAULT_DISTANCE);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(stores),
    };

    return response;
  };
};
export const getApiKey = (config?: Configuration): ActionHandler => {
  return async (request: Request, actionContext: ActionContext) => {
    const APIKEY = actionContext.frontasticContext.projectConfiguration['EXTENSION_GOOGLE_MAPS_API_KEY'];
    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(APIKEY),
    };
    return response;
  };
};
