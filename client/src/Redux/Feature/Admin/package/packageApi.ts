import {
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { TPackage } from "../../../../types/package.types";
import { baseApi } from "../../../Api/baseApi";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createCategory: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/categories",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["categories"],
    //   transformErrorResponse: (res: TError & BaseQueryApi) => {
    //     return res;
    //   },
    // }),

    // updateCategory: builder.mutation({
    //   query: ({ data, id }) => {
    //     return {
    //       url: `/categories/${id}`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["categories"],
    //   transformErrorResponse: (res: TError & BaseQueryApi) => {
    //     return res;
    //   },
    // }),

    // deleteCategory: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/categories/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["categories"],
    //   transformErrorResponse: (res: TError & BaseQueryApi) => {
    //     return res;
    //   },
    // }),

    getPackage: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/packages",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["packages"],
      transformResponse: (res: TResponseWithRedux<TPackage[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const { useGetPackageQuery } = packageApi;
