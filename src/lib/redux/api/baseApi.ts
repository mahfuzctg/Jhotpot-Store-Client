import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://jhotpot-store-server.vercel.app/api`, // Ensure this is the correct base URL for your API
    credentials: "include", // Ensures cookies are included with the request
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the store
      const token = (getState() as RootState).auth.token;

      // If the token exists, add the Authorization header with Bearer
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "users",
    "category",
    "products",
    "recent-products",
    "coupon",
    "orders",
    "reviews",
  ],
  endpoints: (builder) => ({
    // Example endpoint: Get a list of users
    getUsers: builder.query({
      query: () => "/users", // Assuming `/users` is your endpoint for getting users
      providesTags: ["users"], // Useful for cache invalidation
    }),
    // Example endpoint: Get categories
    getCategories: builder.query({
      query: () => "/categories", // Assuming `/categories` is your endpoint
      providesTags: ["category"], // Useful for cache invalidation
    }),
    // Define other endpoints here as needed
  }),
});

export const { useGetUsersQuery, useGetCategoriesQuery } = baseApi; // Export hooks for the endpoints
