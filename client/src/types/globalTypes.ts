/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

export type TError = {
  data: {
    errors: {
      [key: string]: string[];
    };
    status: false;
    message: string;
  };
  status: number;
};

export type TMeta = {
  active_page: boolean;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string;
  prev_page_url: any;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  status?: boolean;
  message?: string;
};

export type TResponseWithRedux<T> = BaseQueryApi & TResponse<T>;
