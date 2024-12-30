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
    createCategory: builder.mutation({
      query: (categoryInfo) => {
        return {
          url: "/category",
          method: "POST",
          body: categoryInfo,
        };
      },
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, categoryInfo }) => {
        return {
          url: `/category/${id}`,
          method: "PATCH",
          body: categoryInfo,
        };
      },
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;