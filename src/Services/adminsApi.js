import { baseApi } from "./baseApi";

export const adminsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET all admins
    getAdmins: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),

    // ✅ Create new admin
    createAdmin: builder.mutation({
      query: (admin) => ({
        url: "/admin",
        method: "POST",
        body: admin,
      }),
      invalidatesTags: ["Admins"],
    }),

    // ✅ Update active/inactive status
    profileActiveStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: "/profileActiveStatus",
        method: "PUT",
        body: { userId: id, isActive },
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useProfileActiveStatusMutation,
} = adminsApi;
