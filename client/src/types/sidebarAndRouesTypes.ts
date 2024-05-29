import { ReactNode } from "react";

export type TRoutesData = {
  label: string;
  icon: ReactNode;
  path?: string;
  element?: ReactNode;
  children: { path: string; element: ReactNode; label: string }[];
};
export type TSidebar = {
  key: string;
  icon: ReactNode;
  label: string;
  children?: { label: string; key: string }[];
};

export type TRoutes = {
  path: string;
  element: ReactNode;
};
