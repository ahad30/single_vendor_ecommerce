import { BaseQueryApi } from "@reduxjs/toolkit/query";
import {
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { baseApi } from "../../../Api/baseApi";
import { TCategory } from "../../../../types";

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

    updateCategory: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/categories/${id}`,
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
          params: params,
        };
      },
      transformResponse: (res: TResponseWithRedux<TCategory[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApi;
