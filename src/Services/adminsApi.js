import { baseApi } from "./baseApi";

export const adminsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),
  }),
});

export const { useGetAdminsQuery } = adminsApi;
