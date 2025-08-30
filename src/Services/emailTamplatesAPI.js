import { baseApi } from "./baseApi";

export const emailTamplatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all  email templates
    allEmailTemplates: builder.query({
      query: () => ({
        url: "/emailTempates  ",
        method: "GET",
      }),
      providesTags: ["CarListings"],
    }),
  }),
});

export const { useAllEmailTemplatesQuery } = emailTamplatesApi;
