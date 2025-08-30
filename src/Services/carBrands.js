import { baseApi } from "./baseApi";

export const carBrandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all car brands
    allCarBrands: builder.query({
      query: () => ({
        url: "/carBrands",
        method: "GET",
      }),
      providesTags: ["carBrand"],
    }),

    // Delete car brand by id
    deleteCarBrand: builder.mutation({
      query: (id) => ({
        url: `/carBrand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carBrand"],
    }),

    // Add new car brand with image
    addCarBrand: builder.mutation({
      query: (formData) => ({
        url: "/carBrand",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["carBrand"],
    }),

    // Fetch car models by brand_id
    fetchModels: builder.query({
      query: (brand_id) => ({
        url: `/carModels/${brand_id}`,
        method: "GET",
      }),
      providesTags: ["carModels"],
    }),

    // Add new car models for a brand
    addCarModels: builder.mutation({
      query: ({ brandId, names }) => ({
        url: "/carModels",
        method: "POST",
        body: { brandId, names }, // names should be array of strings
      }),
      invalidatesTags: ["carModels"],
    }),

    // Delete car model by id
    deleteCarModel: builder.mutation({
      query: (id) => ({
        url: `/carModel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carModels"], // refresh models after delete
    }),
  }),
});

export const {
  useAllCarBrandsQuery,
  useDeleteCarBrandMutation,
  useAddCarBrandMutation,
  useFetchModelsQuery,
  useAddCarModelsMutation,
  useDeleteCarModelMutation, // 👈 new hook
} = carBrandsApi;
