import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TError, TResponseWithRedux } from "../../../types/globalTypes";
import { baseApi } from "../../Api/baseApi";

export interface TLoggedUser {
  id: number;
  name: string;
  email: string;
  role_name: RoleName[];
}

export interface RoleName {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          body: data,
        };
      },
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    register: builder.mutation({
      query: (data) => {
        return {
          url: "user/registration",
          method: "POST",
          body: data,
        };
        
      },
      invalidatesTags: ["customers"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: "/logout",
          method: "POST",
        };
      },
    }),
    
    getLoggedInUser: builder.query({
      query: () => {
        return {
          url: "/profile",
          method: "GET",
        };
      },
      transformResponse: (res: TResponseWithRedux<TLoggedUser>) => {
        return { data: res.data };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetLoggedInUserQuery, useLogoutMutation } = authApi;