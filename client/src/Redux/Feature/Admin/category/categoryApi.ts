import { baseApi } from "../../../Api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/categories",
          method: "POST",
          body: data,
        };
      },
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: "/categories",
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
