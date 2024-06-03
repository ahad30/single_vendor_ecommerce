import { ReactNode } from "react";
import { TAllPermission } from "./permission.types";

export type TRoutesData = {
  label: string;
  icon: ReactNode;
  path?: string;
  element?: ReactNode;
  permissionName?: TAllPermission;
  children: {
    path: string;
    element: ReactNode;
    label: string;
    permissionName?: TAllPermission;
  }[];
};
export type TSidebar = {
  key: string;
  icon: ReactNode;
  label: string;
  permissionName?: TAllPermission;
  children?: {
    label: string;
    key: string;
    permissionName?: TAllPermission;
    permission?: boolean;
  }[];
  permission?: boolean;
};

export type TRoutes = {
  path: string;
  element: ReactNode;
};