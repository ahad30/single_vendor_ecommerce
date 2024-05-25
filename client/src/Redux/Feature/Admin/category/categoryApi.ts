import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TError, TQueryParams } from "../../../../types/globalTypes";
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
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/categories",
          method: "GET",
          params: params
        };
      },
      transformResponse: (res) => {
        return { data: res };
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
