import { BaseQueryApi } from "@reduxjs/toolkit/query";
import {
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "../../../../types/globalTypes";
import { baseApi } from "../../../Api/baseApi";
import { TSlider } from "../../../../types/slider.types";

export const slidersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlide: builder.mutation({
      query: (data) => {
        return {
          url: "/sliders",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["sliders"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    updateSlide: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/sliders/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["sliders"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    deleteSlider: builder.mutation({
      query: (id) => {
        return {
          url: `/sliders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["sliders"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    getSliders: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          params.append(element.name, element.value as string);
        });
        return {
          url: "/sliders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["sliders"],
      transformResponse: (res: TResponseWithRedux<TSlider[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const {
  useCreateSlideMutation,
  useDeleteSliderMutation,
  useGetSlidersQuery,
  useUpdateSlideMutation,
} = slidersApi;
