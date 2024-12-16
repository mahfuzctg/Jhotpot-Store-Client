
import { TResponseRedux } from "@/src/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (queryObj) => {
        const {
          flashSale,
          page,
          limit,
          searchTerm,
          minPrice,
          maxPrice,
          category,
          sort,
          vendorId,
        } = queryObj || {};

        let url = "/products";
        let params = new URLSearchParams();

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        if (category) {
          params.append("category", category);
        }

        if (vendorId) {
          params.append("vendorId", vendorId);
        }

        if (flashSale !== undefined) {
          params.append("flashSale", flashSale);
        }

        if (minPrice > 500 || maxPrice < 7000) {
          params.append("minPrice", minPrice);
          params.append("maxPrice", maxPrice);
        }

        if (sort) {
          if (sort === "desc") {
            params.append("sortBy", "price");
            params.append("sortOrder", "desc");
          } else {
            params.append("sortBy", "price");
            params.append("sortOrder", "asc");
          }
        }

        if (page && limit) {
          params.append("page", page);
          params.append("limit", limit);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        let url = `/products/${id}`;

        return {
          url,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["products"],
    }),
    getRecentViewProducts: builder.query({
      query: () => {
        return {
          url: "/recent-products",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["recent-products"],
    }),
    addNewProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/products",
          method: "POST",
          body: productInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ productInfo, productId }) => {
        return {
          url: `/products/${productId}`,
          method: "PATCH",
          body: productInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["products"],
    }),
    addRecentProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/recent-products",
          method: "POST",
          body: productInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["recent-products"],
    }),
    deleteRecentProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: "/recent-products",
          method: "DELETE",
          body: productInfo,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      invalidatesTags: ["recent-products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetRecentViewProductsQuery,
  useAddRecentProductMutation,
  useDeleteRecentProductMutation,
  useAddNewProductMutation,
  useUpdateProductMutation,
} = productApi;
