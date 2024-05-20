import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
    credentials: "include",
    prepareHeaders: (headers , {getState}) => {
     const token = (getState() as RootState).auth.token;
     if(token){
        headers.set("authorization" , token)
     }
     return headers
    }
  })

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
