import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login", // 👈 endpoint ka path
        method: "POST",
        body: credentials,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/forgetPassword", // 👈 endpoint ka path
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/resetPassword", // 👈 endpoint ka path
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
