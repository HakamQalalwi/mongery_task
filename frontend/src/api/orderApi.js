import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        fetchOrders: builder.query({
            query: ({ type, currency }) => `orders/profitability?type=${type}&currency=${currency}`,
        }),
    }),
});

export const { useFetchOrdersQuery } = apiSlice;
