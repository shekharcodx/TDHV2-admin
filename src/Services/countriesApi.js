import { baseApi } from "./baseApi";

export const countriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all countries
    allCountries: builder.query({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
      providesTags: ["countries"],
    }),

    // Add new country (name only)
    addCountry: builder.mutation({
      query: (countryName) => ({
        url: "/countries",
        method: "POST",
        body: { name: countryName },
      }),
      invalidatesTags: ["countries"],
    }),

    // Delete country by id
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `/countries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["countries"],
    }),
  }),
});

export const {
  useAllCountriesQuery,
  useAddCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;
