import { baseApi } from "../../../Api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category",
          method: "POST",
          body: data,
        };
      },
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: "/category",
          method: "GET",
        };
      },
      transformErrorResponse: (res) => {
        return { data: res.data };
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
