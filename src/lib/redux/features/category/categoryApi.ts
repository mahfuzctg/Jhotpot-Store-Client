import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;