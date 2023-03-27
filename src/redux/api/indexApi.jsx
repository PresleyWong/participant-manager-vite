import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const indexApi = createApi({
  reducerPath: "indexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_ENDPOINT}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
