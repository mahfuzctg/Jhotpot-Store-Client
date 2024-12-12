import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderInfo) => {
        return {
          url: "/orders",
          method: "POST",
          body: orderInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;