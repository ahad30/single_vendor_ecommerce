import { BaseQueryApi } from "@reduxjs/toolkit/query";
import {
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { baseApi } from "../../../Api/baseApi";
import { TUser } from "../../../../types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["users"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    editUser: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/users/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["users" , "roles"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    getAllUsers: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
      transformResponse: (res: TResponseWithRedux<TUser[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApi;
