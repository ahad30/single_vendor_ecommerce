import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import DashboardStatics from "../Pages/Dashboard/Admin/DashboardStatics/DashboardStatics";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuUserCog2 } from "react-icons/lu";
import Roles from "../Pages/Dashboard/Admin/UserManagement/Roles/Roles";
import Users from "../Pages/Dashboard/Admin/UserManagement/Users/Users";
import Permissions from "../Pages/Dashboard/Admin/UserManagement/Permissions/Permissions";
import Category from "../Pages/Dashboard/Admin/Category/Category";
import Brand from "../Pages/Dashboard/Admin/Brand/Brand";
import Attributes from "../Pages/Dashboard/Admin/Attributes/Attributes";
import Sliders from "../Pages/Dashboard/Admin/configuration/Sliders/Sliders";
import { IoConstructOutline } from "react-icons/io5";

export const adminRoutes = [
  {
    path: "/admin",
    label: "Dashboard",
    element: <DashboardStatics></DashboardStatics>,
    icon: <MdOutlineDashboardCustomize size={20}></MdOutlineDashboardCustomize>,
    permissionName: "view dashboard",
  },

  {
    label: "Products Management",
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
      {
        path: "attributes",
        label: "Attribute",
        element: <Attributes></Attributes>,
        permissionName: "view attribute",
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
  {
    label: "Configuration",
    icon: <IoConstructOutline size={20}></IoConstructOutline>,
    children: [
      {
        path: "sliders",
        label: "Sliders",
        element: <Sliders></Sliders>,
        permissionName: "view slider",
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
