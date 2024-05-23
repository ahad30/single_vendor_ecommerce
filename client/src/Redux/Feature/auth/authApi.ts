import { baseApi } from "../../Api/baseApi";

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
    }),
    getLoggedInUser: builder.query({
      query: () => {
        return {
          url: "/me",
          method: "GET",
        };
      },
    }),
  }),
});
export const { useLoginMutation , useGetLoggedInUserQuery } = authApi;
