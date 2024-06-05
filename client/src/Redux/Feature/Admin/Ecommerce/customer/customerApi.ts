import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TCustomer } from "../../../../../types/customer.types";
import { TError, TQueryParams, TResponseWithRedux } from "../../../../../types/globalTypes";
import { baseApi } from "../../../../Api/baseApi";

export const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
   
  
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
      
      deleteCustomer: builder.mutation({
        query: (id) => {
          return {
            url: `/customers/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["customers"],
        transformErrorResponse: (res: TError & BaseQueryApi) => {
          return res;
        },
      }),
  
      getCustomer: builder.query({
        query: (arg) => {
          const params = new URLSearchParams();
          arg?.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
          return {
            url: "/customers",
            method: "GET",
            params: params,
          };
        },
        providesTags: ["customers"],
        transformResponse: (res: TResponseWithRedux<TCustomer[]>) => {
          return { data: res.data, meta: res.meta };
        },
      }),
    }),
  });

  export  const {useGetCustomerQuery , useDeleteCustomerMutation} = customerApi