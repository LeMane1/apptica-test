import { api } from 'src/api/api';
import type {
  ICategoriesResponse,
  IChartDataResponse,
  ICountriesResponse
} from "src/components/top-history/lib/types.ts";
import {API_KEY} from "src/api/constants.ts";

export const topHistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCountriesList: builder.query<ICountriesResponse, void>({
      query: () => ({
        url: `/v1/geo`,
        params: {
          B4NKGg: API_KEY,
        },
        method: 'GET',
      })
    }),
    getCategoriesList: builder.query<ICategoriesResponse, void>({
      query: () => ({
        url: `/v1/applicationCategory`,
        params: {
          platform: 1,
          B4NKGg: API_KEY,
        },
        method: 'GET',
      })
    }),
    getChartData: builder.query<IChartDataResponse, { countryId: number, dateFrom: string, dateTo: string  }>({
      query: ({countryId, dateFrom, dateTo}) => ({
        url: `/package/top_history/9379/${countryId}`,
        params: {
          date_from: dateFrom,
          date_to: dateTo,
          platforms: 1,
          B4NKGg: API_KEY,
        },
        method: 'GET',
      }),
    })
  }),
});

export const {
  useGetCountriesListQuery,
  useGetCategoriesListQuery,
  useLazyGetChartDataQuery
} = topHistoryApi;