import { TRoles } from "../../../../types";
import {
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { TPermissions } from "../../../../types/permission.types";
import { baseApi } from "../../../Api/baseApi";

export const rolesApi = baseApi.injectEndpoints({
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

    getAllRoles: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/roles",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["roles"],
      transformResponse: (res: TResponseWithRedux<TRoles[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    getAllPermissions: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/permissions",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["permissions"],
      transformResponse: (res: TResponseWithRedux<TPermissions[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const { useGetAllPermissionsQuery , useGetAllRolesQuery } = rolesApi;
