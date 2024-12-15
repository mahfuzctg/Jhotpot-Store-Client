import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => {
        const { role, ...remaining } = userInfo;

        if (role === "User") {
          return {
            url: "/users/create-customer",
            method: "POST",
            body: remaining,
          };
        }

        return {
          url: "/users/create-vendor",
          method: "POST",
          body: remaining,
        };
      },
      invalidatesTags: ["users"],
    }),
    getAllUsers: builder.query({
      query: (queryData) => {
        const params = queryData ? { ...queryData } : {};

        return {
          url: "/auth/users",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          usersData: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["users"],
    }),
    getMyProfile: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          userData: response.data,
        };
      },
      providesTags: ["users"],
    }),
    getSingleVendor: builder.query({
      query: (id: string) => {
        return {
          url: `/users/get-vendor/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["users"],
    }),
    getSingleCustomer: builder.query({
      query: (email: string) => {
        return {
          url: `/users/get-customer/${email}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["users"],
    }),
    changePassword: builder.mutation({
      query: (passwordInfo) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: passwordInfo,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetAllUsersQuery,
  useGetMyProfileQuery,
  useGetSingleVendorQuery,
  useGetSingleCustomerQuery,
  useChangePasswordMutation,
} = authApi;