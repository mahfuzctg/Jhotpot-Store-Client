import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/follow",
        method: "POST",
        body: vendorInfo,
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["users"],
    }),
    unfollowUser: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/unfollow",
        method: "DELETE",
        body: vendorInfo,
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["users"],
    }),
    updateCustomer: builder.mutation({
      query: (customerInfo) => ({
        url: "/users/update-customer",
        method: "PATCH",
        body: customerInfo,
      }),
      invalidatesTags: ["users"],
    }),
    updateVendor: builder.mutation({
      query: (vendorInfo) => ({
        url: "/users/update-customer",
        method: "PATCH",
        body: vendorInfo,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUpdateCustomerMutation,
  useUpdateVendorMutation,
} = userApi;