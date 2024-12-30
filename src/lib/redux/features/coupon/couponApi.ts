
import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: () => {
        return {
          url: "/coupons",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["coupon"],
    }),
    createCoupon: builder.mutation({
      query: (couponInfo) => {
        return {
          url: "/coupons",
          method: "POST",
          body: couponInfo,
        };
      },
      invalidatesTags: ["coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, couponInfo }) => {
        return {
          url: `/coupons/${id}`,
          method: "PATCH",
          body: couponInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
