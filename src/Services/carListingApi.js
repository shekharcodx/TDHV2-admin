import { baseApi } from "./baseApi";

export const carListingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all car listings
    allListings: builder.query({
      query: () => ({
        url: "/allListings  ",
        method: "GET",
      }),
      providesTags: ["CarListings"],
    }),
  }),
});

export const { useAllListingsQuery } = carListingApi;
