import { baseApi } from "./baseApi";

export const carBrandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all car brands
    allCarBrands: builder.query({
      query: () => ({
        url: "/carBrands",
        method: "GET",
      }),
      providesTags: ["carBrands"],
    }),

    // Delete car brand by id
    deleteCarBrand: builder.mutation({
      query: (id) => ({
        url: `/carBrands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carBrands"],
    }),

    // Add new car brand with image
    addCarBrand: builder.mutation({
      query: (formData) => ({
        url: "/carBrands",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["carBrands"],
    }),
  }),
});

export const {
  useAllCarBrandsQuery,
  useDeleteCarBrandMutation,
  useAddCarBrandMutation,
} = carBrandsApi;
