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
        } = queryObj || {};

        let url = "/products";
        let params = new URLSearchParams();

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        if (category) {
          params.append("category", category);
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
