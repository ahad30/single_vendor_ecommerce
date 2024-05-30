import {
  MdOutlineCategory,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Category from "../Pages/Dashboard/Admin/Category/Category";
import DbBackup from "../Pages/Dashboard/Admin/Settings/DbBackup";
import AdminProfile from "../Pages/Dashboard/Admin/Settings/AdminProfile";
import DashboardStatics from "../Pages/Dashboard/Admin/DashboardStatics/DashboardStatics";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuUserCog2 } from "react-icons/lu";

import Roles from "../Pages/Dashboard/Admin/UserManagement/Roles/Roles";
import Users from "../Pages/Dashboard/Admin/UserManagement/Users/Users";
import Permissions from "../Pages/Dashboard/Admin/UserManagement/Permissions/Permissions";
import Brand from "../Pages/Dashboard/Admin/Brand/Brand";

export const adminRoutes = [
  {
    path: "/admin",
    label: "Dashboard",
    element: <DashboardStatics></DashboardStatics>,
    icon: <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>,
    permissionName: "view dashboard",
  },

  // {
  //   path: "categories",
  //   label: "Category",
  //   element: <Category></Category>,
  //   icon: <MdOutlineCategory size={20}></MdOutlineCategory>,
  // },

  {
    label: "E-commerce",
    icon: (
      <MdOutlineShoppingCartCheckout size={20}></MdOutlineShoppingCartCheckout>
    ),
    children: [
      {
        path: "categories",
        label: "Category",
        element: <Category></Category>,
        permissionName: "view category",
      },
      {
        path: "brands",
        label: "Brands",
        element: <Brand></Brand>,
        permissionName: "view brand",
      },
    ],
  },

  {
    label: "User Management",
    icon: <LuUserCog2 size={20}></LuUserCog2>,
    children: [
      {
        path: "permissions",
        label: "Permissions",
        element: <Permissions></Permissions>,
        permissionName: "view permissions",
      },
      {
        path: "roles",
        label: "Roles",
        element: <Roles></Roles>,
        permissionName: "view role",
      },
      {
        path: "users",
        label: "Users",
        element: <Users></Users>,
        permissionName: "view user",
      },
    ],
  },

  // {
  //   label: "Configuration",
  //   icon: <CiSettings size={20}></CiSettings>,
  //   children: [
  //     { path: "db-backup", label: "DB Backup", element: <DbBackup></DbBackup> },
  //     {
  //       path: "admin-profile",
  //       label: "Admin Profile",
  //       element: <AdminProfile></AdminProfile>,
  //     },
  //   ],
  // },
];
