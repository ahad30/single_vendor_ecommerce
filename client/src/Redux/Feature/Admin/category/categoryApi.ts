import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TError } from "../../../../types/globalTypes";
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
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: "/categories",
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return { data: res };
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
