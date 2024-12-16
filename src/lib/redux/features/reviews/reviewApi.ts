import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewInfo) => {
        return {
          url: "/reviews",
          method: "POST",
          body: reviewInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["reviews"],
    }),
    getReviewsById: builder.query({
      query: (params: Record<string, string>) => {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return {
          url: `/reviews?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["reviews"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsByIdQuery } = reviewApi;