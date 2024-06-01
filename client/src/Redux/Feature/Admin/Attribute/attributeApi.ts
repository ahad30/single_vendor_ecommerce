import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TAttributes } from "../../../../types/attribute.types";
import {
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { baseApi } from "../../../Api/baseApi";

const attributeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createBrand: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/brands",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["brands"],
    //   transformErrorResponse: (res: TError & BaseQueryApi) => {
    //     return res;
    //   },
    // }),

    // updateBrand: builder.mutation({
    //   query: ({ data, id }) => {
    //     return {
    //       url: `/brands/${id}`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["brands"],
    //   transformErrorResponse: (res: TError & BaseQueryApi) => {
    //     return res;
    //   },
    // }),
    deleteAttribute: builder.mutation({
      query: (id) => {
        return {
          url: `/attributes/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["attributes"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    getAttributes: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/attributes",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["attributes"],
      transformResponse: (res: TResponseWithRedux<TAttributes[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const { useGetAttributesQuery  , useDeleteAttributeMutation} = attributeApi;
