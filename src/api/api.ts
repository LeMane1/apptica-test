import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {API_URL} from "src/api/constants.ts";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers: Headers): Headers => {
      headers.set('accept', 'application/json')
      return headers
    },
  }),
  endpoints: () => ({}),
})