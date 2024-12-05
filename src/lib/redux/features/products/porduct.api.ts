import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (queryObj) => {
        const { flashSale, page, limit } = queryObj || {};

        let url = "/products";
        let params = new URLSearchParams();

        if (flashSale !== undefined) {
          params.append("flashSale", flashSale);
        }

        if (page && limit) {
          params.append("page", page);
          params.append("limit", limit);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        console.log(url);

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
