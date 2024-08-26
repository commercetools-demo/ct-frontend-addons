import { useCallback, useMemo } from 'react';
import { Store } from '../../types/Store';
import useSWR from 'swr';
import { revalidateOptions } from '../../../shared/helpers/sdk';

const useLocation = (sdk: any) => {
  const result = useSWR(
    '/action/location/getApiKey',
    () =>
      sdk.callAction({
        actionName: `location/getApiKey`,
      }),
    {
      ...revalidateOptions,
      revalidateOnMount: true,
    },
  );

  const data: string = useMemo(() => {
    if (result.data?.isError) return '';
    return result.data?.data;
  }, [result]);

  const getStores = useCallback(async (lat: number, lng: number): Promise<Store[]> => {
    const res = await sdk.callAction({
      actionName: `location/getStores`,
      payload: { lat, lng },
    });
    // const res = await fetchApiHub(`/action/product/query?${params.toString()}`, SDK.locale);

    return res.isError ? [] : res.data;
  }, []);

  return { getStores, locationApiKey: data };
};

export default useLocation;
