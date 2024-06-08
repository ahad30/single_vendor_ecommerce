import { BaseQueryApi } from "@reduxjs/toolkit/query";
import {
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { TProduct } from "../../../../types/product.types";
import { baseApi } from "../../../Api/baseApi";
import { TAttributes } from "../../../../types/attribute.types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["products"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

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

    getSingleProduct: builder.query({
      query: (id) => {
        // const params = new URLSearchParams();
        // arg?.forEach((element: TQueryParams) => {
        //   params.append(element.name, element.value as string);
        // });
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
      transformResponse: (res: TResponseWithRedux<TProduct[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getProductAttributeWithValue: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/products/attributes/values",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["attributes"],
      transformResponse: (res: TResponseWithRedux<TAttributes[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getCategoryForProduct: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/category/list",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["categories"],
      transformResponse: (
        res: TResponseWithRedux<{ id: number; name: string }[]>
      ) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getBrandForProduct: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/brand/list",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["brands"],
      transformResponse: (
        res: TResponseWithRedux<{ id: number; name: string }[]>
      ) => {
        return { data: res.data, meta: res.meta };
      },
    }),
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

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductAttributeWithValueQuery,
  useGetCategoryForProductQuery,
  useGetBrandForProductQuery,
} = productApi;
