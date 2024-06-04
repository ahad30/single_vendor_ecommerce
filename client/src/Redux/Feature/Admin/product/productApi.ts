import {
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { TProduct } from "../../../../types/product.types";
import { baseApi } from "../../../Api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //   createCategory: builder.mutation({
    //     query: (data) => {
    //       return {
    //         url: "/categories",
    //         method: "POST",
    //         body: data,
    //       };
    //     },
    //     invalidatesTags: ["categories"],
    //     transformErrorResponse: (res: TError & BaseQueryApi) => {
    //       return res;
    //     },
    //   }),

    //   updateCategory: builder.mutation({
    //     query: ({ data, id }) => {
    //       return {
    //         url: `/categories/${id}`,
    //         method: "POST",
    //         body: data,
    //       };
    //     },
    //     invalidatesTags: ["categories"],
    //     transformErrorResponse: (res: TError & BaseQueryApi) => {
    //       return res;
    //     },
    //   }),

    //   deleteCategory: builder.mutation({
    //     query: (id) => {
    //       return {
    //         url: `/categories/${id}`,
    //         method: "DELETE",
    //       };
    //     },
    //     invalidatesTags: ["categories"],
    //     transformErrorResponse: (res: TError & BaseQueryApi) => {
    //       return res;
    //     },
    //   }),

    getProducts: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"],
      transformResponse: (res: TResponseWithRedux<TProduct[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
