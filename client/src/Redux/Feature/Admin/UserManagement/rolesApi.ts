import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TRoles } from "../../../../types";
import {
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { TPermissions } from "../../../../types/permission.types";
import { baseApi } from "../../../Api/baseApi";

export const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoles: builder.mutation({
      query: (data) => {
        return {
          url: "/roles",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["roles"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    editRole: builder.mutation({
      query: (data) => {
        return {
          url: "/roles",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["roles"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

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

export const {
  useGetAllPermissionsQuery,
  useGetAllRolesQuery,
  useCreateRolesMutation,
  useEditRoleMutation,
} = rolesApi;
