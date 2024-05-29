import { BaseQueryApi } from "@reduxjs/toolkit/query";
import {
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { baseApi } from "../../../Api/baseApi";
import { TBrand } from "../../../../types";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (data) => {
        return {
          url: "/brands",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["brands"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    updateBrand: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/brands/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["brands"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    deleteBrand: builder.mutation({
      query: (id) => {
        return {
          url: `/brands/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["brands"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    getBrands: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/brands",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["brands"],
      transformResponse: (res: TResponseWithRedux<TCategory[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
